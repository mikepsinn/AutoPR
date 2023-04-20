import sys
import traceback
from typing import Optional

import requests

from autopr.models.artifacts import Issue
from autopr.models.rail_objects import PullRequestDescription, CommitPlan

import structlog

from autopr.services.commit_service import CommitService

log = structlog.get_logger()


class PublishService:
    def __init__(
        self,
        issue: Issue,
    ):
        self.issue = issue

        self.pr_desc: PullRequestDescription = self._create_placeholder(issue)
        self.progress_updates = []

        self.header = "This pull request was autonomously generated by " \
                      "[AutoPR](https://github.com/irgolic/AutoPR)."
        self.issue_template = """
# Traceback

{error}
"""
        self.issue_link_template = "https://github.com/irgolic/AutoPR/issues/new?" \
                                   "body={body}&" \
                                   "title={title}&" \
                                   "labels=bug"

    def _create_placeholder(self, issue: Issue) -> PullRequestDescription:
        placeholder_pr_desc = PullRequestDescription(
            title=f"Fix #{issue.number}: {issue.title}",
            body="",
            commits=[],
        )
        return placeholder_pr_desc

    def publish_call(
        self,
        summary: str,
        default_open=('response',),
        **kwargs
    ):
        subsections = []
        for k, v in kwargs.items():
            # Cast keys to title case
            title = k.title()
            title = title.replace("_", " ")

            # Prefix content with quotation marks and A ZERO-WIDTH SPACE (!!!) to prevent escaping backticks
            content = '\n'.join([
                f"    {line}" for line in v.splitlines()
            ])

            # Construct subsection
            subsection = f"""<details{" open" if k in default_open else ""}>
<summary>{title}</summary>

{content}
</details>"""
            subsections.append(subsection)

        # Concatenate subsections
        subsections_content = '\n\n'.join(subsections)

        # Prefix them with a quotation mark
        subsections_content = '\n'.join([f"> {line}" for line in subsections_content.splitlines()])

        # Construct progress string
        progress_str = f"""<details>
<summary>{summary}</summary>

{subsections_content}

</details>
"""
        self.publish_update(progress_str)

    def set_pr_description(self, pr: PullRequestDescription):
        self.pr_desc = pr
        self.update()

    def publish_update(self, text: str):
        self.progress_updates.append(text)
        self.update()

    def _build_progress_updates(self, finalize: bool = False):
        if not self.progress_updates:
            return ""
        progress = "\n".join(self.progress_updates)
        if finalize:
            progress = f"""<details>
<summary>Click to see progress updates</summary>

{progress}
</details>
"""
        body = f"# Progress Updates\n\n{progress}"
        return body

    def _build_issue_template_link(self, **kwargs):
        error = traceback.format_exc()
        kwargs['error'] = error

        body = self.issue_template.format(**kwargs)
        title = traceback.format_exception_only(sys.exc_info()[0], sys.exc_info()[1])[0].strip()

        def fmt(s):
            # Given https://github.com/Automattic/wp-calypso/issues/new?labels[]=People%20Management&labels[]=[Type]%20Bug&title=People:&milestone=People%20Management:%20m6&assignee=ebinnion&body=This%20is%20a%20prefilled%20issue
            # cast body and title to the appropriate format
            return s\
                .replace(" ", "%20")\
                .replace("\n", "%0A")\

        return self.issue_link_template.format(
            body=fmt(body),
            title=fmt(title),
        )

    def _build_body(self, success: Optional[bool] = None):
        # Add header and Fixes magic word
        body = f"{self.header}\n\n" \
               f"Fixes #{self.issue.number}"

        # Build status
        body += f"\n\n# Status\n\n"
        if success is None:
            body += "This pull request is being autonomously generated by [AutoPR](https://github.com/irgolic/AutoPR)."
        elif not success:
            body += f"This pull request was being autonomously generated by " \
                    f"[AutoPR](https://github.com/irgolic/AutoPR), but it encountered an error."
            if sys.exc_info()[0] is not None:
                body += f"\n\nError: {traceback.format_exc()}"
            body += f"\n\nPlease [open an issue]({self._build_issue_template_link()}) if you believe this is a bug."
        elif success:
            body += f"This pull request was autonomously generated by [AutoPR](https://github.com/irgolic/AutoPR)."

        # Build PR body
        if self.pr_desc.body:
            body += f"\n\n# Description\n\n" \
                    f"{self.pr_desc.body}"

        progress = self._build_progress_updates(finalize=success is not None)
        if progress:
            body += f"\n\n{progress}"
        return body

    def update(self):
        body = self._build_body()
        title = self.pr_desc.title
        self._publish(title, body)

    def finalize(self, success: bool):
        body = self._build_body(success=success)
        title = self.pr_desc.title
        self._publish(title, body)

    def _publish(
        self,
        title: str,
        body: str
    ):
        raise NotImplementedError


class GithubPublishService(PublishService):
    def __init__(
        self,
        issue: Issue,
        token: str,
        owner: str,
        repo_name: str,
        head_branch: str,
        base_branch: str,
        run_id: str,
    ):
        super().__init__(issue)
        self.token = token
        self.owner = owner
        self.repo = repo_name
        self.head_branch = head_branch
        self.base_branch = base_branch
        self.run_id = run_id

        self.issue_template = """
{shield}

AutoPR encountered an error while trying to fix {issue_link}.
""" + self.issue_template

    def _get_headers(self):
        return {
            'Authorization': f'Bearer {self.token}',
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        }

    def _get_shield(self, success: Optional[bool] = None):
        action_url = f'https://github.com/{self.owner}/{self.repo}/actions/runs/{self.run_id}'
        if success is None:
            shield = f"[![AutoPR Running](https://img.shields.io/badge/AutoPR-running-yellow)]({action_url})"
        elif success:
            shield = f"[![AutoPR Success](https://img.shields.io/badge/AutoPR-success-brightgreen)]({action_url})"
        else:
            shield = f"[![AutoPR Failure](https://img.shields.io/badge/AutoPR-failure-red)]({action_url})"
        return shield

    def _build_issue_template_link(self, **kwargs):
        shield = self._get_shield(success=False)
        kwargs['shield'] = shield
        issue_link = f"https://github.com/{self.owner}/{self.repo}/issues/{self.issue.number}"
        kwargs['issue_link'] = issue_link
        return super()._build_issue_template_link(**kwargs)

    def _build_body(self, success: Optional[bool] = None):
        # Make shield
        shield = self._get_shield(success=success)

        body = super()._build_body(success=success)
        return shield + '\n\n' + body

    def _publish(self, title: str, body: str):
        existing_pr = self._find_existing_pr()
        if existing_pr:
            self._update_pr(title, body)
        else:
            self._create_pr(title, body)

    def _create_pr(self, title: str, body: str):
        url = f'https://api.github.com/repos/{self.owner}/{self.repo}/pulls'
        headers = self._get_headers()
        data = {
            'head': self.head_branch,
            'base': self.base_branch,
            'title': title,
            'body': body,
        }
        response = requests.post(url, json=data, headers=headers)

        if response.status_code == 201:
            log.debug('Pull request created successfully', response=response.json())
        else:
            log.debug('Failed to create pull request', response_text=response.text)

    def _update_pr(self, title: str, body: str):
        existing_pr = self._find_existing_pr()
        if not existing_pr:
            log.debug("No existing pull request found to update")
            return

        url = f'https://api.github.com/repos/{self.owner}/{self.repo}/pulls/{existing_pr["number"]}'
        headers = self._get_headers()
        data = {
            'title': title,
            'body': body,
        }
        response = requests.patch(url, json=data, headers=headers)

        if response.status_code == 200:
            log.debug('Pull request updated successfully')
        else:
            log.debug('Failed to update pull request', response_text=response.text)

    def _find_existing_pr(self):
        url = f'https://api.github.com/repos/{self.owner}/{self.repo}/pulls'
        headers = self._get_headers()
        params = {'state': 'open', 'head': f'{self.owner}:{self.head_branch}', 'base': self.base_branch}
        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            prs = response.json()
            if prs:
                return prs[0]  # Return the first pull request found
        else:
            log.debug('Failed to get pull requests', response_text=response.text)

        return None

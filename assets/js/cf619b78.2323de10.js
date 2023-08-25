"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[108],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,h=p["".concat(s,".").concat(m)]||p[m]||d[m]||o;return n?i.createElement(h,a(a({ref:t},u),{},{components:n})):i.createElement(h,a({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:r,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3428:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var i=n(7462),r=(n(7294),n(3905));const o={sidebar_position:3},a="\ud83d\udcc4 Writing YAML with Validation",l={unversionedId:"tutorials/setting-up-yaml-schema",id:"tutorials/setting-up-yaml-schema",title:"\ud83d\udcc4 Writing YAML with Validation",description:"When working with YAML files, validating them is like a superpower that saves you a lot of time and effort.",source:"@site/docs/tutorials/setting-up-yaml-schema.mdx",sourceDirName:"tutorials",slug:"/tutorials/setting-up-yaml-schema",permalink:"/tutorials/setting-up-yaml-schema",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorials/setting-up-yaml-schema.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"\ud83c\udf0a Writing a Workflow",permalink:"/tutorials/writing-a-workflow"},next:{title:"\ud83d\udca7 Action Catalogue",permalink:"/action-catalogue"}},s={},c=[{value:"Writing with strict typing",id:"writing-with-strict-typing",level:2},{value:"Editor config",id:"editor-config",level:2},{value:"VS Code",id:"vs-code",level:3},{value:"PyCharm",id:"pycharm",level:3}],u={toc:c},p="wrapper";function d(e){let{components:t,...o}=e;return(0,r.kt)(p,(0,i.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"-writing-yaml-with-validation"},"\ud83d\udcc4 Writing YAML with Validation"),(0,r.kt)("p",null,"When working with YAML files, validating them is like a superpower that saves you a lot of time and effort."),(0,r.kt)("p",null,"Each of the actions and workflows in AutoPR clearly define their inputs and outputs.\nBy enabling validation, you inform your editor of these definitions, so it can help you avoid writing invalid YAML."),(0,r.kt)("p",null,"There are three schemas available for validation:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"trigger_schema.json")," - validates trigger files"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"workflow_schema.json")," - validates workflows files"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"strict_workflow_schema.json")," - validates workflows files, with strong typing for workflows")),(0,r.kt)("h2",{id:"writing-with-strict-typing"},"Writing with strict typing"),(0,r.kt)("p",null,"Compared to ",(0,r.kt)("inlineCode",{parentName:"p"},"workflow_schema"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"strict_workflow_schema")," is also aware of workflow definitions (and their inputs/outputs).\nIf you're using it to write custom workflows that reference themselves, you will need to regenerate it after definining\nthe new workflows' names, inputs and outputs."),(0,r.kt)("p",null,"Regenerate by running ",(0,r.kt)("inlineCode",{parentName:"p"},"python -m autopr.models.config.entrypoints"),"\n(or ",(0,r.kt)("inlineCode",{parentName:"p"},"make schema")," if you're in the root of the AutoPR repository)."),(0,r.kt)("p",null,"Make sure to select the new schema file you generated if you were previously working off a remote URL."),(0,r.kt)("h2",{id:"editor-config"},"Editor config"),(0,r.kt)("p",null,"AutoPR workflows and triggers are strictly typed, and the YAML files that define them are validated against a JSON schema.\nConfiguring these in your editor can help you avoid errors and typos, and can help you discover new features."),(0,r.kt)("h3",{id:"vs-code"},"VS Code"),(0,r.kt)("p",null,"AutoPR includes a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/irgolic/AutoPR/tree/docs-launch/.vscode"},(0,r.kt)("inlineCode",{parentName:"a"},".vscode")," folder"),",\nwhich already contains settings for schema validation. Additionally, make sure you have extension ",(0,r.kt)("inlineCode",{parentName:"p"},"YAML by Red Hat")," installed."),(0,r.kt)("p",null,"If you want to set schema validation for an external repository, simply copy\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/irgolic/AutoPR/tree/docs-launch/.vscode"},"the ",(0,r.kt)("inlineCode",{parentName:"a"},".vscode")," folder"),"\ninto the root of your workspace."),(0,r.kt)("h3",{id:"pycharm"},"PyCharm"),(0,r.kt)("p",null,"Head to ",(0,r.kt)("inlineCode",{parentName:"p"},"Preferences > Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings")," and add the following mappings:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"AutoPR Triggers: ",(0,r.kt)("inlineCode",{parentName:"li"},"https://raw.githubusercontent.com/irgolic/AutoPR/triggers.schema.json")),(0,r.kt)("li",{parentName:"ul"},"AutoPR Workflows: ",(0,r.kt)("inlineCode",{parentName:"li"},"https://raw.githubusercontent.com/irgolic/AutoPR/workflows.schema.json")),(0,r.kt)("li",{parentName:"ul"},"AutoPR Strict Workflows: ",(0,r.kt)("inlineCode",{parentName:"li"},"https://raw.githubusercontent.com/irgolic/AutoPR/workflows-strict.schema.json"))),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"PyCharm Schema Settings",src:n(6181).Z,width:"2188",height:"1656"})),(0,r.kt)("p",null,"Afterwards, while editing a YAML file, select the corresponding schema in the bottom right corner of the editor."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"PyCharm Schema Selection",src:n(9091).Z,width:"1700",height:"1514"})))}d.isMDXComponent=!0},9091:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/pycharm_schema_selection-0a0cb2048c25db7f37be80341e47dc10.gif"},6181:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/pycharm_schema_settings-7a0091369347874c88d215e8bf330860.png"}}]);
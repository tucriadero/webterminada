exports.id=82,exports.ids=[82],exports.modules={8359:()=>{},3739:()=>{},3557:(e,t,r)=>{Promise.resolve().then(r.bind(r,8143)),Promise.resolve().then(r.bind(r,5691)),Promise.resolve().then(r.bind(r,4820))},8179:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},8143:(e,t,r)=>{"use strict";r.d(t,{Providers:()=>a});var o=r(326),i=r(8875),s=r(5442);function a({children:e}){return o.jsx(i.SessionContextProvider,{supabaseClient:s.O,initialSession:null,children:e})}},5691:(e,t,r)=>{"use strict";r.d(t,{default:()=>i}),r(7577);var o=r(5047);function i(){return(0,o.useRouter)(),null}r(5442)},4820:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});var o=r(326),i=r(7577),s=r(434);function a(){let[e,t]=(0,i.useState)(!1);return e?o.jsx("div",{className:"fixed bottom-0 left-0 w-full bg-[#dff6ea] text-[#33695d] px-6 py-4 shadow-xl z-50",children:(0,o.jsxs)("div",{className:"max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4",children:[(0,o.jsxs)("p",{className:"text-sm",children:["Utilizamos cookies para mejorar tu experiencia. Al continuar navegando aceptas nuestra"," ",o.jsx(s.default,{href:"/cookies",className:"underline text-[#5cae97] hover:text-[#4c9c85]",children:"Pol\xedtica de Cookies"}),"."]}),o.jsx("button",{onClick:()=>{localStorage.setItem("cookies-accepted","true"),t(!1)},className:"bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-lg font-medium transition-colors",children:"Aceptar"})]})}):null}},5442:(e,t,r)=>{"use strict";r.d(t,{O:()=>o});let o=(0,r(2997).eI)("https://cinsudwupbiqqizvqwij.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbnN1ZHd1cGJpcXFpenZxd2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0ODQ3MTIsImV4cCI6MjA2ODA2MDcxMn0.NL4RoZ3dPWllHaJfK37WtPtu-6NTNJ-DRJrs6MAY8E0")},4840:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c,metadata:()=>d});var o=r(9510);r(7633);var i=r(8570);let s=(0,i.createProxy)(String.raw`C:\Users\Usuario\webterminada-main\app\providers.tsx#Providers`),a=(0,i.createProxy)(String.raw`C:\Users\Usuario\webterminada-main\components\AuthRedirect.tsx#default`),n=(0,i.createProxy)(String.raw`C:\Users\Usuario\webterminada-main\components\CookieBanner.tsx#default`),d={metadataBase:new URL("https://www.tucriadero.es"),title:"TuCriadero",description:"Encuentra perros y gatos de criadores verificados.",icons:{icon:"/favicon.ico"},openGraph:{title:"TuCriadero.es – Criadores de perros y gatos",description:"Encuentra criaderos verificados y responsables cerca de ti. Contacto directo, sin intermediarios.",url:"https://www.tucriadero.es",siteName:"TuCriadero",images:[{url:"https://www.tucriadero.es/logo-share.jpg",width:1200,height:630,alt:"TuCriadero.es"}],locale:"es_ES",type:"website"},twitter:{card:"summary_large_image",title:"TuCriadero.es – Criadores responsables de perros y gatos",description:"Descubre criaderos con n\xfacleo zool\xf3gico, verificados y con animales disponibles.",images:["https://www.tucriadero.es/logo-share.jpg"]}};function c({children:e}){return o.jsx("html",{lang:"es",children:o.jsx("body",{children:(0,o.jsxs)(s,{children:[o.jsx(a,{}),e,o.jsx(n,{})," "]})})})}},7633:()=>{},381:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>R});var o,i=r(7577);let s={data:""},a=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||s,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,l=(e,t)=>{let r="",o="",i="";for(let s in e){let a=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+a+";":o+="f"==s[1]?l(a,s):s+"{"+l(a,"k"==s[1]?"":t)+"}":"object"==typeof a?o+=l(a,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=a&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=l.p?l.p(s,a):s+":"+a+";")}return r+(t&&i?t+"{"+i+"}":i)+o},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},m=(e,t,r,o,i)=>{let s=u(e),a=p[s]||(p[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!p[a]){let t=s!==e?e:(e=>{let t,r,o=[{}];for(;t=n.exec(e.replace(d,""));)t[4]?o.shift():t[3]?(r=t[3].replace(c," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(c," ").trim();return o[0]})(e);p[a]=l(i?{["@keyframes "+a]:t}:t,r?"":"."+a)}let m=r&&p.g?p.g:null;return r&&(p.g=p[a]),((e,t,r,o)=>{o?t.data=t.data.replace(o,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[a],t,o,m),a},f=(e,t,r)=>e.reduce((e,o,i)=>{let s=t[i];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+o+(null==s?"":s)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,a(t.target),t.g,t.o,t.k)}g.bind({g:1});let h,b,x,y=g.bind({k:1});function v(e,t){let r=this||{};return function(){let o=arguments;function i(s,a){let n=Object.assign({},s),d=n.className||i.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(d),n.className=g.apply(r,o)+(d?" "+d:""),t&&(n.ref=a);let c=e;return e[0]&&(c=n.as||e,delete n.as),x&&c[0]&&x(n),h(c,n)}return t?t(i):i}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,C=(()=>{let e=0;return()=>(++e).toString()})(),I=((()=>{let e;return()=>e})(),(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return I(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}}),P=[],k={toasts:[],pausedAt:void 0},N=e=>{k=I(k,e),P.forEach(e=>{e(k)})},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),A=e=>(t,r)=>{let o=z(t,e,r);return N({type:2,toast:o}),o.id},S=(e,t)=>A("blank")(e,t);S.error=A("error"),S.success=A("success"),S.loading=A("loading"),S.custom=A("custom"),S.dismiss=e=>{N({type:3,toastId:e})},S.remove=e=>N({type:4,toastId:e}),S.promise=(e,t,r)=>{let o=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?j(t.success,e):void 0;return i?S.success(i,{id:o,...r,...null==r?void 0:r.success}):S.dismiss(o),e}).catch(e=>{let i=t.error?j(t.error,e):void 0;i?S.error(i,{id:o,...r,...null==r?void 0:r.error}):S.dismiss(o)}),e};var O=new Map,J=1e3,D=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,E=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),M=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${E} 1s linear infinite;
`,y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),Z=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,F=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Z} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,v("div")`
  position: absolute;
`,v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,o=i.createElement,l.p=void 0,h=o,b=void 0,x=void 0,g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var R=S}};
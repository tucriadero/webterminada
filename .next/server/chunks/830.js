exports.id=830,exports.ids=[830],exports.modules={8359:()=>{},3739:()=>{},7131:(e,t,r)=>{Promise.resolve().then(r.bind(r,8143)),Promise.resolve().then(r.bind(r,5691)),Promise.resolve().then(r.bind(r,4820)),Promise.resolve().then(r.bind(r,5984)),Promise.resolve().then(r.bind(r,1475))},1669:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},8143:(e,t,r)=>{"use strict";r.d(t,{Providers:()=>i});var o=r(326),s=r(8875),a=r(5442);function i({children:e}){return o.jsx(s.SessionContextProvider,{supabaseClient:a.O,initialSession:null,children:e})}},5691:(e,t,r)=>{"use strict";r.d(t,{default:()=>s}),r(7577);var o=r(5047);function s(){return(0,o.useRouter)(),null}r(5442)},4820:(e,t,r)=>{"use strict";r.d(t,{default:()=>i});var o=r(326),s=r(7577),a=r(434);function i(){let[e,t]=(0,s.useState)(!1);return e?o.jsx("div",{className:"fixed bottom-0 left-0 w-full bg-[#dff6ea] text-[#33695d] px-6 py-4 shadow-xl z-50",children:(0,o.jsxs)("div",{className:"max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4",children:[(0,o.jsxs)("p",{className:"text-sm",children:["Utilizamos cookies para mejorar tu experiencia. Al continuar navegando aceptas nuestra"," ",o.jsx(a.default,{href:"/cookies",className:"underline text-[#5cae97] hover:text-[#4c9c85]",children:"Pol\xedtica de Cookies"}),"."]}),o.jsx("button",{onClick:()=>{localStorage.setItem("cookies-accepted","true"),t(!1)},className:"bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-lg font-medium transition-colors",children:"Aceptar"})]})}):null}},5984:(e,t,r)=>{"use strict";r.d(t,{default:()=>s}),r(7577),r(5442);var o=r(8875);function s(){return(0,o.useUser)(),null}},1475:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});var o=r(326),s=r(7577);function a(){let e=(0,s.useRef)(null);return o.jsx("audio",{ref:e,preload:"auto",children:o.jsx("source",{src:"/sounds/notification.mp3",type:"audio/mpeg"})})}},5442:(e,t,r)=>{"use strict";r.d(t,{O:()=>o});let o=(0,r(2997).eI)("https://cinsudwupbiqqizvqwij.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbnN1ZHd1cGJpcXFpenZxd2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0ODQ3MTIsImV4cCI6MjA2ODA2MDcxMn0.NL4RoZ3dPWllHaJfK37WtPtu-6NTNJ-DRJrs6MAY8E0")},4134:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p,metadata:()=>l});var o=r(9510);r(7633);var s=r(8570);let a=(0,s.createProxy)(String.raw`C:\Users\samax\webterminada-main\app\providers.tsx#Providers`),i=(0,s.createProxy)(String.raw`C:\Users\samax\webterminada-main\components\AuthRedirect.tsx#default`),n=(0,s.createProxy)(String.raw`C:\Users\samax\webterminada-main\components\CookieBanner.tsx#default`),d=(0,s.createProxy)(String.raw`C:\Users\samax\webterminada-main\components\NotificationListener.tsx#default`),c=(0,s.createProxy)(String.raw`C:\Users\samax\webterminada-main\components\NotificationSound.tsx#default`),l={metadataBase:new URL("https://www.tucriadero.es"),title:"TuCriadero",description:"Encuentra perros y gatos de criadores verificados.",icons:{icon:"/favicon.ico"},openGraph:{title:"TuCriadero.es – Criadores de perros y gatos",description:"Encuentra criaderos verificados y responsables cerca de ti. Contacto directo, sin intermediarios.",url:"https://www.tucriadero.es",siteName:"TuCriadero",images:[{url:"https://www.tucriadero.es/logo-share.jpg",width:1200,height:630,alt:"TuCriadero.es"}],locale:"es_ES",type:"website"},twitter:{card:"summary_large_image",title:"TuCriadero.es – Criadores responsables de perros y gatos",description:"Descubre criaderos con n\xfacleo zool\xf3gico, verificados y con animales disponibles.",images:["https://www.tucriadero.es/logo-share.jpg"]}};function p({children:e}){return o.jsx("html",{lang:"es",children:o.jsx("body",{children:(0,o.jsxs)(a,{children:[o.jsx(i,{}),o.jsx(d,{}),o.jsx(c,{}),e,o.jsx(n,{})]})})})}},7633:()=>{},381:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>R});var o,s=r(7577);let a={data:""},i=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||a,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,l=(e,t)=>{let r="",o="",s="";for(let a in e){let i=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+i+";":o+="f"==a[1]?l(i,a):a+"{"+l(i,"k"==a[1]?"":t)+"}":"object"==typeof i?o+=l(i,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=i&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=l.p?l.p(a,i):a+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+o},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},m=(e,t,r,o,s)=>{let a=u(e),i=p[a]||(p[a]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(a));if(!p[i]){let t=a!==e?e:(e=>{let t,r,o=[{}];for(;t=n.exec(e.replace(d,""));)t[4]?o.shift():t[3]?(r=t[3].replace(c," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(c," ").trim();return o[0]})(e);p[i]=l(s?{["@keyframes "+i]:t}:t,r?"":"."+i)}let m=r&&p.g?p.g:null;return r&&(p.g=p[i]),((e,t,r,o)=>{o?t.data=t.data.replace(o,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[i],t,o,m),i},f=(e,t,r)=>e.reduce((e,o,s)=>{let a=t[s];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+o+(null==a?"":a)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}x.bind({g:1});let g,b,h,y=x.bind({k:1});function v(e,t){let r=this||{};return function(){let o=arguments;function s(a,i){let n=Object.assign({},a),d=n.className||s.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(d),n.className=x.apply(r,o)+(d?" "+d:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),g(c,n)}return t?t(s):s}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,C=(()=>{let e=0;return()=>(++e).toString()})(),I=((()=>{let e;return()=>e})(),(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return I(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}}),P=[],N={toasts:[],pausedAt:void 0},k=e=>{N=I(N,e),P.forEach(e=>{e(N)})},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),z=e=>(t,r)=>{let o=$(t,e,r);return k({type:2,toast:o}),o.id},A=(e,t)=>z("blank")(e,t);A.error=z("error"),A.success=z("success"),A.loading=z("loading"),A.custom=z("custom"),A.dismiss=e=>{k({type:3,toastId:e})},A.remove=e=>k({type:4,toastId:e}),A.promise=(e,t,r)=>{let o=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?j(t.success,e):void 0;return s?A.success(s,{id:o,...r,...null==r?void 0:r.success}):A.dismiss(o),e}).catch(e=>{let s=t.error?j(t.error,e):void 0;s?A.error(s,{id:o,...r,...null==r?void 0:r.error}):A.dismiss(o)}),e};var O=new Map,J=1e3,D=y`
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
`,o=s.createElement,l.p=void 0,g=o,b=void 0,h=void 0,x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var R=A}};
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{1474:function(e,t,i){Promise.resolve().then(i.bind(i,7328)),Promise.resolve().then(i.bind(i,6310))},7328:function(e,t,i){"use strict";i.r(t),i.d(t,{ImageEditor:function(){return s}});var n=i(7437),r=i(6673),a=i(6310);let h={width:"100%",height:"100px",border:"2px dashed #ccc",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},s=()=>{let{image:e,canvasRef:t,imageDimensions:i,lockProportions:s,setLockProportions:l,setWidth:d,setHeight:o,handleUpload:u,handleAspectRatioChange:c,handleDownload:g}=(0,a.useImageEditor)();return(0,n.jsxs)("div",{children:[(0,n.jsx)(r.ZP,{onDrop:u,children:e=>{let{getRootProps:t,getInputProps:i}=e;return(0,n.jsxs)("div",{...t(),style:h,"data-testid":"dropzone",children:[(0,n.jsx)("input",{...i()}),(0,n.jsx)("p",{children:"Drag n drop an image here, or click to select one"})]})}}),e&&(0,n.jsxs)("div",{"data-testid":"image-editor",className:"w-screen",children:[(0,n.jsx)("h1",{children:"Image Editor"}),(0,n.jsx)("label",{htmlFor:"aspect-ratio",children:"Aspect Ratio"}),(0,n.jsxs)("select",{id:"aspect-ratio",onChange:e=>c(e.target.value),children:[(0,n.jsx)("option",{value:"",children:"Original"}),(0,n.jsx)("option",{value:"insta-story",children:"Story"}),(0,n.jsx)("option",{value:"insta-portrait",children:"Portrait"}),(0,n.jsx)("option",{value:"insta-square",children:"Square"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("input",{type:"number",value:i.width,onChange:e=>d(Number(e.target.value))}),(0,n.jsx)("input",{type:"number",value:i.height,onChange:e=>o(Number(e.target.value))}),(0,n.jsx)("input",{type:"checkbox",checked:s,onChange:()=>l(!s)})]}),(0,n.jsx)("canvas",{ref:t,width:0,height:0,className:"w-1/3"}),(0,n.jsx)("button",{onClick:g,children:"Download Edited Image"})]})]})}},6310:function(e,t,i){"use strict";i.r(t),i.d(t,{useImageEditor:function(){return o}});var n=i(2265),r=i(8613);let a=(e,t)=>Math.ceil(e*t),h=(e,t)=>Math.floor(e/t),s=(e,t,i,n)=>Math.min(i/e,n/t),l=(e,t,i,n)=>({x:(e-i)/2,y:(t-n)/2}),d={"insta-story":[1080,1920],"insta-portrait":[1080,1350],"insta-square":[1080,1080]},o=()=>{let e=(0,n.useRef)(null),[t,i]=(0,n.useState)(),[o,u]=(0,n.useState)({width:0,height:0}),[c,g]=(0,n.useState)(!0),[p,v]=(0,n.useState)("#000"),[x,w]=(0,n.useState)("jpeg"),[m,f]=(0,n.useState)(1),j=e=>{u({width:e,height:c?h(e,m):o.height})};return(0,n.useEffect)(()=>{c&&j(o.width)},[c]),(0,n.useEffect)(()=>{j(o.width)},[m]),(0,n.useEffect)(()=>{var i;let n=null===(i=e.current)||void 0===i?void 0:i.getContext("2d");if(!e.current||!n||!t)return;let r=(null==t?void 0:t.width)||0,a=(null==t?void 0:t.height)||0,h=o.width||t.width,d=o.height||t.height;e.current.width=h,e.current.height=d;let u=s(r,a,h,d),c=r*u,g=a*u,v=l(h,d,c,g);n.fillStyle=p,n.fillRect(0,0,h,d),n.drawImage(t,v.x,v.y,c,g)},[t,o,p]),{image:t,canvasRef:e,imageDimensions:o,lockProportions:c,setLockProportions:g,setWidth:j,setHeight:e=>{u({height:e,width:c?a(e,m):o.width})},handleUpload:t=>{let n=t[0],r=new Image;r.src=URL.createObjectURL(n),r.onload=()=>{if(i(r),u({width:r.width,height:r.height}),f(r.width/r.height),e.current){var t,n;e.current.width=r.width,e.current.height=r.height,null===(n=e.current)||void 0===n||null===(t=n.getContext("2d"))||void 0===t||t.drawImage(r,0,0)}}},handleDownload:()=>{var t;null===(t=e.current)||void 0===t||t.toBlob(e=>{e&&(0,r.saveAs)(e,"image.".concat(x))},"image/".concat(x))},handleAspectRatioChange:e=>{let[i,n]=d[e]||[null==t?void 0:t.width,null==t?void 0:t.height];f(i/n)}}}}},function(e){e.O(0,[38,971,472,744],function(){return e(e.s=1474)}),_N_E=e.O()}]);
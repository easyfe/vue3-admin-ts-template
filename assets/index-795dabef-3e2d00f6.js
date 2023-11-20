import"./index-71e4ade3.js";import{t as e}from"./index-052d02fc-353a1d05.js";import{M as a,aZ as u}from"./ui-3973d019.js";import{e as r,c as t,h as l,q as s,C as i,v as o,x as n}from"./core-e904f21d.js";const d=r({name:"Upload",__name:"index",props:{modelValue:{default:()=>""},maxSize:{default:0}},emits:["update:modelValue"],setup(r,{emit:d}){const m=r,f=t({get:()=>m.modelValue,set:e=>{d("update:modelValue",e)}}),p=t((()=>Array.isArray(f.value)?f.value.map((e=>({uid:e,name:e,status:"done",url:e}))):[{uid:f.value,name:f.value,status:"done",url:f.value}]));function c(e){return new Promise(((u,r)=>{if(m.maxSize&&e.size>1024*m.maxSize){const e=function(e){return e<1024?e+" B":e<1048576?(e/1024).toFixed(2)+" KB":e<1073741824?(e/1048576).toFixed(2)+" MB":(e/1073741824).toFixed(2)+" GB"}(1024*m.maxSize);a.error(`文件大小不能超过${e}`),r(!1)}u(!0)}))}function v(e){return new Promise((a=>{const u=p.value.findIndex((a=>a.url===e.url));u>-1&&(p.value.splice(u,1),f.value=p.value.map((e=>e.url))),a(!0)}))}function x(e){e.url&&(Array.isArray(f.value)?f.value.push(e.url):f.value=e.url)}return(a,r)=>{const t=u;return l(),s(e,null,{default:i((()=>[o(t,n({"list-type":"picture-card","image-preview":!0,"default-file-list":p.value,accept:"image/*","on-before-upload":c,"on-before-remove":v},a.$attrs,{onSuccess:x}),null,16,["default-file-list"])])),_:1})}}});export{d as default};

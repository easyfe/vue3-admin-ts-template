import{H as e}from"./index-cb520362.js";import{e as a}from"./index-79d804fd-09e44a48.js";import{aT as t}from"./ui-3c01ac45.js";import{e as o,c as d,r as n,w as s,h as u,q as l,C as r,v as m,x as p,B as i,y as f,N as v}from"./core-e904f21d.js";const c=o({name:"InputNumber",__name:"index",props:{modelValue:{default:void 0},debounce:{default:void 0}},emits:["update:modelValue"],setup(o,{emit:c}){const V=o,x=d({get:()=>V.modelValue,set:e=>{c("update:modelValue",e)}}),$=n();function b(e){V.debounce?j(e):x.value=e}s((()=>V.modelValue),(e=>{$.value=e}),{immediate:!0});const j=e((e=>{x.value=e}),V.debounce);function _(){x.value=void 0}return(e,o)=>{const d=t;return u(),l(a,null,{default:r((()=>[m(d,p({modelValue:$.value,"onUpdate:modelValue":o[0]||(o[0]=e=>$.value=e)},e.$attrs,{onInput:b,onClear:_}),i({_:2},[e.$attrs.prepend?{name:"prepend",fn:r((()=>[f(v(e.$attrs.prepend),1)])),key:"0"}:void 0,e.$attrs.append?{name:"append",fn:r((()=>[f(v(e.$attrs.append),1)])),key:"1"}:void 0]),1040,["modelValue"])])),_:1})}}});export{c as default};
import{H as e}from"./index-676b1d1f.js";import{e as a}from"./index-c1793516-91414c94.js";import{aO as t}from"./ui-e9725a95.js";import{e as n,c as o,h as s,q as u,C as d,v as r,x as p,B as l,y as m,N as i}from"./core-e904f21d.js";const f=n({name:"InputNumber",__name:"index",props:{modelValue:{default:void 0},debounce:{default:void 0}},emits:["update:modelValue"],setup(n,{emit:f}){const c=n,v=o({get:()=>c.modelValue,set:e=>{f("update:modelValue",e)}});function x(e){c.debounce?$(e):v.value=e}const $=e((e=>{v.value=e}),c.debounce);function b(){v.value=void 0}return(e,n)=>{const o=t;return s(),u(a,null,{default:d((()=>[r(o,p(e.$attrs,{"default-value":v.value,onInput:x,onClear:b}),l({_:2},[e.$attrs.prepend?{name:"prepend",fn:d((()=>[m(i(e.$attrs.prepend),1)])),key:"0"}:void 0,e.$attrs.append?{name:"append",fn:d((()=>[m(i(e.$attrs.append),1)])),key:"1"}:void 0]),1040,["default-value"])])),_:1})}}});export{f as default};
import"./index-bff4ec68.js";import{e}from"./index-b9c14449-8fd45451.js";import{au as a,a_ as l,ao as s}from"./ui-3b77adb6.js";import{e as t,c as o,h as u,q as d,C as m,v as r,x as i,j as n,F as p,O as c,y as f,N as x}from"./core-e904f21d.js";const V=t({name:"CheckBox",__name:"index",props:{labelKey:{default:"label"},valueKey:{default:"value"},modelValue:{default:()=>[]},options:{default:()=>[]}},emits:["update:modelValue"],setup(t,{emit:V}){const _=t,v=o({get:()=>_.modelValue,set:e=>{V("update:modelValue",e)}});return(t,o)=>{const V=a,b=l,j=s;return u(),d(e,null,{default:m((()=>[r(j,{direction:"vertical",size:"large"},{default:m((()=>[r(b,i({modelValue:v.value,"onUpdate:modelValue":o[0]||(o[0]=e=>v.value=e),class:"checkbox"},t.$attrs),{default:m((()=>[(u(!0),n(p,null,c(_.options,((e,a)=>(u(),d(V,i({key:a},e),{default:m((()=>[f(x(e[_.labelKey]),1)])),_:2},1040)))),128))])),_:1},16,["modelValue"])])),_:1})])),_:1})}}});export{V as default};

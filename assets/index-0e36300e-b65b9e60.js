import"./index-4a96beb3.js";import{t as e}from"./index-a72ccee4-1d276c2d.js";import{at as a,aX as l,ao as t}from"./ui-af5be32f.js";import{e as s,c as o,h as u,q as d,C as m,v as r,x as i,j as n,F as c,O as p,y as f,N as x}from"./core-e904f21d.js";const V=s({name:"CheckBox",__name:"index",props:{labelKey:{default:"label"},valueKey:{default:"value"},modelValue:{default:()=>[]},options:{default:()=>[]}},emits:["update:modelValue"],setup(s,{emit:V}){const v=s,_=o({get:()=>v.modelValue,set:e=>{V("update:modelValue",e)}});return(s,o)=>{const V=a,j=l,y=t;return u(),d(e,null,{default:m((()=>[r(y,{direction:"vertical",size:"large"},{default:m((()=>[r(j,i({modelValue:_.value,"onUpdate:modelValue":o[0]||(o[0]=e=>_.value=e),class:"checkbox"},s.$attrs),{default:m((()=>[(u(!0),n(c,null,p(v.options,((e,a)=>(u(),d(V,i({key:a},e),{default:m((()=>[f(x(e[v.labelKey]),1)])),_:2},1040)))),128))])),_:1},16,["modelValue"])])),_:1})])),_:1})}}});export{V as default};
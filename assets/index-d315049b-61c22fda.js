import"./index-474d4c88.js";import{e}from"./index-373f141f-6a4ca1ce.js";import{a_ as a}from"./ui-3973d019.js";import{e as l,c as t,h as u,q as s,C as o,v as d,x as m}from"./core-e904f21d.js";const r=l({name:"Cascader",__name:"index",props:{labelKey:{default:"label"},valueKey:{default:"value"},modelValue:{default:""}},emits:["update:modelValue"],setup(l,{emit:r}){const n=l,p=t({get:()=>n.modelValue,set:e=>{r("update:modelValue",e)}});return(l,t)=>{const r=a;return u(),s(e,null,{default:o((()=>[d(r,m({modelValue:p.value,"onUpdate:modelValue":t[0]||(t[0]=e=>p.value=e)},l.$attrs),null,16,["modelValue"])])),_:1})}}});export{r as default};

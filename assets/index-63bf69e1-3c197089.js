import"./index-71e4ade3.js";import{t as e}from"./index-052d02fc-353a1d05.js";import{aM as a}from"./ui-3973d019.js";import{e as t,c as l,h as o,q as s,C as m,v as u,x as d}from"./core-e904f21d.js";const r=t({name:"Textarea",__name:"index",props:{modelValue:{type:String,default:""}},emits:["update:modelValue"],setup(t,{emit:r}){const i=t,n=l({get:()=>i.modelValue,set:e=>{r("update:modelValue",e)}});return(t,l)=>{const r=a;return o(),s(e,null,{default:m((()=>[u(r,d({modelValue:n.value,"onUpdate:modelValue":l[0]||(l[0]=e=>n.value=e),modelModifiers:{trim:!0}},t.$attrs),null,16,["modelValue"])])),_:1})}}});export{r as default};

import"./index-f1efeeb0.js";import{e}from"./index-c1793516-8ce4bef4.js";import{aN as a}from"./ui-e9725a95.js";import{e as t,c as l,h as o,q as s,C as m,v as u,x as r}from"./core-e904f21d.js";const d=t({name:"Textarea",__name:"index",props:{modelValue:{type:String,default:""}},emits:["update:modelValue"],setup(t,{emit:d}){const i=t,n=l({get:()=>i.modelValue,set:e=>{d("update:modelValue",e)}});return(t,l)=>{const d=a;return o(),s(e,null,{default:m((()=>[u(d,r({modelValue:n.value,"onUpdate:modelValue":l[0]||(l[0]=e=>n.value=e),modelModifiers:{trim:!0}},t.$attrs),null,16,["modelValue"])])),_:1})}}});export{d as default};
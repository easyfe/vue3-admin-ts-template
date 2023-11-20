var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(a,l,r)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[l]=r;import{_ as u}from"./index-a604a2f8.js";import{u as n,n as i,T as p,D as c}from"./index-71e4ade3.js";import{u as b}from"./common-35fc7f4b.js";import{M as m,an as y}from"./ui-3973d019.js";import{e as d,c as f,r as v,h as k,q as h,C as g,v as j,y as x,a9 as O,X as w}from"./core-e904f21d.js";const P=d({name:"DevForm"}),q=d((T=((e,a)=>{for(var l in a||(a={}))t.call(a,l)&&s(e,l,a[l]);if(r)for(var l of r(a))o.call(a,l)&&s(e,l,a[l]);return e})({},P),a(T,l({setup(e){const{currentTheme:a}=n(),l=f((()=>[i.section("基础信息"),i.span("介绍","text"),i.input("文本","key1",{maxLength:20,showWordLimit:!0,rules:[p.require("必填","blur")],labelTips:"提示内容第一点",inputTips:"示文案这是示文案是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案"}),i.color("颜色","key8"),i.checkbox("多选框","key2",[{label:"label1",value:1},{label:"label2",value:2}],{rules:[p.require("必选","blur"),{validator:(e,a)=>{e||a("至少选择两个"),e.length<2?a("至少选择两个"):a()}}]}),i.upload("图片","key12",{inputTips:"推荐使用400*400的图片",customRequest:b}),i.radio("单选框","key3",[{label:"label1",value:1,disabled:!0},{label:"label2",value:2}],{type:"radio"}),i.inputNumber("数字输入框","key4"),i.select("下拉框","key5",[{label:"label1",value:1,disabled:!0},{label:"label2",value:2}],{rules:[p.require("必选","blur")]}),i.switch("切换","key7"),i.rangePicker("日期","key10",{type:"date",placeholder:["开始时间1","结束时间1"]}),i.time("时间","key11"),i.editor("富文本","key6",{theme:a.value,uploadProps:{customRequest:b}})])),r=v({key12:"https://cdn.v2ex.com/avatar/1b4e/0a2d/614153_xlarge.png?m=1681735508",key1:"这是input组件value",key8:"#fff",key5:[],key6:"",text:"这是一段介绍文字<font style='color:red;padding-left:10px;font-weight:bold'>支持HTML</font>"}),t=v();function o(){i.validate(t.value).then((()=>{m.success("保存成功")})).catch((e=>{console.log("error",e)}))}return(e,a)=>{const s=y,n=u;return k(),h(n,null,{bottom:g((()=>[j(s,{type:"primary",onClick:o},{default:g((()=>[x("保存")])),_:1})])),default:g((()=>[j(O(c),{ref_key:"form",ref:t,modelValue:O(r),"onUpdate:modelValue":a[0]||(a[0]=e=>w(r)?r.value=e:null),config:O(l)},null,8,["modelValue","config"])])),_:1})}}}))));var T;export{q as default};

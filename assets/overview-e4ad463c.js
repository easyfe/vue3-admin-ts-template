import{_ as t}from"./index-af8367f9.js";import{_ as a}from"./index-f1efeeb0.js";/* empty css              */import{b3 as e,ai as o,aj as i,b2 as s,at as r}from"./ui-e9725a95.js";import{e as n,c as l,h as c,q as p,C as d,v as u,j as m,F as f,O as x,a9 as h,m as F,l as g,M as y}from"./core-e904f21d.js";import"./echart-e2e41c78.js";import"./index-f6ea771a.js";const v=a(n({__name:"overview",props:{id:{default:""}},setup(a){const n=a,v=l((()=>[{title:"内容生产量",value:1902,prefix:{icon:"icon-edit",background:"#FFE4BA",iconColor:"#F77234"}},{title:"内容点击量",value:2445,prefix:{icon:"icon-thumb-up",background:"#E8FFFB",iconColor:"#33D1C9"}},{title:"内容曝光量",value:3034,prefix:{icon:"icon-heart",background:"#E8F3FF",iconColor:"#165DFF"}},{title:"活跃用户数",value:1275,prefix:{icon:"icon-user",background:"#F5E8FF",iconColor:"#722ED1"}}])),b=l((()=>({tooltip:{trigger:"axis"},grid:{left:"5%",right:"4%",top:"40",bottom:"40"},xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{name:"Email",type:"line",stack:"Total",smooth:!0,data:[120,132,101,134,90,230,210]},{name:"Union Ads",type:"line",stack:"Total",smooth:!0,data:[220,182,191,234,290,330,310]},{name:"Video Ads",type:"line",stack:"Total",smooth:!0,data:[150,232,201,154,190,330,410]},{name:"Direct",type:"line",stack:"Total",smooth:!0,data:[320,332,301,334,390,330,320]},{name:"Search Engine",type:"line",stack:"Total",smooth:!0,data:[820,932,901,934,1290,1330,1320]}]})));return(a,l)=>{const k=e,_=o,j=i,C=t,E=s,T=r;return c(),p(T,{style:{width:"100%"}},{default:d((()=>[u(E,{title:"数据总览",class:"general-card"},{default:d((()=>[u(j,{justify:"space-between"},{default:d((()=>[(c(!0),m(f,null,x(h(v),((t,a)=>(c(),p(_,{key:a,span:6},{default:d((()=>[u(k,{title:t.title,value:t.value,"show-group-separator":"","value-from":0,animation:""},{prefix:d((()=>[F("span",{class:"statistic-prefix",style:g({background:t.prefix.background})},[(c(),p(y(t.prefix.icon),{style:g({color:t.prefix.iconColor})},null,8,["style"]))],4)])),_:2},1032,["title","value"])])),_:2},1024)))),128))])),_:1}),u(C,{id:n.id,option:h(b),height:"500px"},null,8,["id","option"])])),_:1})])),_:1})}}}),[["__scopeId","data-v-bfcccde1"]]);export{v as default};
import{e as t,_ as a}from"./index-e449e3a2.js";import{_ as e}from"./index-cb520362.js";/* empty css              */import{b5 as o,ai as i,aj as s,b4 as n,at as r}from"./ui-3c01ac45.js";import{e as l,c,h as p,q as d,C as u,v as m,j as f,F as x,O as F,a9 as h,m as g,l as y,M as b}from"./core-e904f21d.js";import"./echart-c24cdfe3.js";import"./index-f6ea771a.js";const v=e(l({__name:"overview",props:{id:{default:""}},setup(e){const l=e,v=c((()=>[{title:"内容生产量",value:1902,prefix:{icon:"icon-edit",background:"#FFE4BA",iconColor:"#F77234"}},{title:"内容点击量",value:2445,prefix:{icon:"icon-thumb-up",background:"#E8FFFB",iconColor:"#33D1C9"}},{title:"内容曝光量",value:3034,prefix:{icon:"icon-heart",background:"#E8F3FF",iconColor:"#165DFF"}},{title:"活跃用户数",value:1275,prefix:{icon:"icon-user",background:"#F5E8FF",iconColor:"#722ED1"}}])),k=c((()=>t.option({tooltip:{trigger:"axis"},grid:{left:"5%",right:"4%",top:"40",bottom:"40"},xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{name:"Email",type:"line",stack:"Total",smooth:!0,data:[120,132,101,134,90,230,210]},{name:"Union Ads",type:"line",stack:"Total",smooth:!0,data:[220,182,191,234,290,330,310]},{name:"Video Ads",type:"line",stack:"Total",smooth:!0,data:[150,232,201,154,190,330,410]},{name:"Direct",type:"line",stack:"Total",smooth:!0,data:[320,332,301,334,390,330,320]},{name:"Search Engine",type:"line",stack:"Total",smooth:!0,data:[820,932,901,934,1290,1330,1320]}]})));return(t,e)=>{const c=o,_=i,j=s,C=a,E=n,T=r;return p(),d(T,{style:{width:"100%"}},{default:u((()=>[m(E,{title:"数据总览",class:"general-card"},{default:u((()=>[m(j,{justify:"space-between"},{default:u((()=>[(p(!0),f(x,null,F(h(v),((t,a)=>(p(),d(_,{key:a,span:6},{default:u((()=>[m(c,{title:t.title,value:t.value,"show-group-separator":"","value-from":0,animation:""},{prefix:u((()=>[g("span",{class:"statistic-prefix",style:y({background:t.prefix.background})},[(p(),d(b(t.prefix.icon),{style:y({color:t.prefix.iconColor})},null,8,["style"]))],4)])),_:2},1032,["title","value"])])),_:2},1024)))),128))])),_:1}),m(C,{id:l.id,option:h(k),height:"500px"},null,8,["id","option"])])),_:1})])),_:1})}}}),[["__scopeId","data-v-d428bbc7"]]);export{v as default};
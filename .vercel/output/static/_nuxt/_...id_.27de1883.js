import{i as _,o as c,b as i,e as t,t as s,h as e,j as d,k as h,f as l,u as f,w as x}from"./entry.7c881d54.js";import{_ as g}from"./nuxt-link.4a095c32.js";import{u as w}from"./fetch.504abe74.js";const y={class:"my-8"},N={class:"text-center text-lg font-bold"},k=t("strong",null,"Niveau:",-1),$=t("strong",null,"Portée:",-1),v=t("strong",null,"Durée:",-1),z=t("strong",null,"Zone d'effet:",-1),B=t("strong",null,"Incantation:",-1),C=t("strong",null,"Sommaire:",-1),D=t("strong",null,"Description:",-1),R=_({__name:"sort",props:{sort:null},setup(r){const o=r;return(n,a)=>(c(),i("div",y,[t("p",N,s(o.sort.nom)+" ("+s(o.sort.ecole.nom)+")",1),t("p",null,[k,e(" "+s(o.sort.niveau),1)]),t("p",null,[$,e(" "+s(o.sort.porte),1)]),t("p",null,[v,e(" "+s(o.sort.duree),1)]),t("p",null,[z,e(" "+s(o.sort.zone),1)]),t("p",null,[B,e(" "+s(o.sort.incantation),1)]),t("p",null,[C,e(" "+s(o.sort.sommaire),1)]),t("p",null,[D,e(" "+s(o.sort.description),1)])]))}}),S={class:"my-8 mx-auto max-w-7xl"},E=_({__name:"[...id]",async setup(r){let o,n;const a=d(),{data:u}=([o,n]=h(()=>w(`/api/sorts/${a.params.id}`,"$deMOzMitRz")),o=await o,n(),o);return(V,b)=>{const p=R,m=g;return c(),i("section",S,[l(p,{sort:f(u)},null,8,["sort"]),l(m,{to:"/sorts"},{default:x(()=>[e("Retour à la liste des sorts")]),_:1})])}}});export{E as default};
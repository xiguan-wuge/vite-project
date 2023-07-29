import{_ as b}from"./plugin-vue_export-helper.21dcd24c.js";import{d as w,r as A,o as C,a as l,c as i,b as s,F as c,e as y,t as h,p as x,f as F,g as r,w as B,h as v,v as m,u as f,i as E,j as g}from"./index.2e50bfa5.js";class N{constructor(e){this.canvas=document.getElementById(e);let t=this.canvas.getBoundingClientRect();this.w=t.right-t.left,this.h=t.bottom-t.top,this.ctx=this.canvas.getContext("2d"),this.ctx.font="20px Microsoft YaHei",this.barrageList=[]}shoot(e){let t=this.getTop(),o=this.getColor();this.getOffset();let u=Math.ceil(this.ctx.measureText(e).width),n={value:e,top:t,left:this.w,color:o,offset:3,width:u};this.barrageList.push(n)}draw(){if(this.barrageList.length){this.ctx.clearRect(0,0,this.w,this.h);for(let e=0;e<this.barrageList.length;e++){let t=this.barrageList[e];if(t.left+t.width<=0){this.barrageList.splice(e,1),e--;continue}t.left-=t.offset,this.drawText(t)}}requestAnimationFrame(this.draw.bind(this))}drawText(e){this.ctx.fillStyle=e.color,this.ctx.fillText(e.value,e.left,e.top)}getColor(){return"#"+Math.floor(Math.random()*16777215).toString(16)}getTop(){return Math.floor(Math.random()*(this.h-30))+30}getOffset(){return+(Math.random()*4).toFixed(1)+1}}const D=a=>(x("data-v-f496db5a"),a=a(),F(),a),L={class:"bullet"},M={class:"content"},$={class:"item"},S=D(()=>s("canvas",{id:"canvas",width:"300",height:"200",class:"canvas-wrapper"}," \u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301canvas\u6807\u7B7E\u3002 ",-1)),T=w({__name:"bullet",setup(a){const e=A(["akljdlkjdlka","ask\u62C9\u8FDB\u6765\u770B\u5927\u5E08\u51B3\u6597","\u6492\u9897\u7C92\u5242","\u7231\u8001\u656C\u8001\u5361\u52A0\u65AF\u4E1C\u83A8\u83EA\u78B1\u963F\u65AF\u5229\u5EB7\u5C31\u6253\u7B97\u7ACB\u523B\u5C31\u642D\u4E0A\u4E86\u80AF\u5FB7\u57FA\u963F\u65AF\u5229\u5EB7\u5927\u6570\u636E\u5E93\u62C9\u5FB7\u65AF\u57FA\u7231\u4E0A\u4E86"]);return C(()=>{const t=new N("canvas");t.draw(),["\u5F39\u5E55","666","233333333","javascript","html","css","\u524D\u7AEF\u6846\u67B6","Vue","React","Angular","\u6D4B\u8BD5\u5F39\u5E55\u6548\u679C"].forEach(u=>{t.shoot(u)})}),(t,o)=>(l(),i(c,null,[s("div",L,[s("div",M,[(l(!0),i(c,null,y(e,u=>(l(),i("div",$,h(u),1))),256))])]),S],64))}});var I=b(T,[["__scopeId","data-v-f496db5a"]]);const V=(a,e)=>{const t=r(0);B([a,e],([u,n])=>{o(u,n)});const o=(u,n)=>{t.value=Number(u)+Number(n)};return{addNum:t,addFn:o}},j=(a,e)=>{const t=r(0);B([a,e],([u,n])=>{o(u,n)});const o=(u,n)=>{t.value=Number(u)-Number(n)};return{subNum:t,subFn:o}},H=E("num1: "),R=E("num2: "),W=s("br",null,null,-1),O={__name:"demo",setup(a){const e=r(1),t=r(2),{addNum:o,addFn:u}=V(e,t);u(e.value,t.value);const{subNum:n,subFn:k}=j(e,t);return k(e.value,t.value),(G,d)=>(l(),i(c,null,[s("p",null,[H,v(s("input",{"onUpdate:modelValue":d[0]||(d[0]=p=>e.value=p),style:{width:"100px"}},null,512),[[m,e.value,void 0,{numer:!0}]])]),s("p",null,[R,v(s("input",{"onUpdate:modelValue":d[1]||(d[1]=p=>t.value=p),style:{width:"100px"}},null,512),[[m,t.value,void 0,{numer:!0}]])]),s("div",null,[s("span",null,"\u52A0\u6CD5\u7B49\u4E8E\uFF1A"+h(f(o)),1),W,s("span",null,"\u51CF\u6CD5\u7B49\u4E8E\uFF1A"+h(f(n)),1)])],64))}};const _=a=>(x("data-v-e8456c92"),a=a(),F(),a),U=_(()=>s("span",{style:{margin:"20px",padding:"10px","background-color":"pink",display:"inline-block"}},"\u884C\u5185\u6807\u7B7E",-1)),q=_(()=>s("span",{style:{margin:"20px",padding:"10px","font-size":"20px","background-color":"pink",display:"inline-block"}},"\u884C\u5185\u6807\u7B7E",-1)),z=_(()=>s("span",{style:{margin:"20px",padding:"10px","background-color":"pink",display:"inline-block"}},null,-1)),Y=w({__name:"HelloWorld",setup(a){return r(0),(e,t)=>{const o=I;return l(),i(c,null,[g(O),g(o),U,q,z],64)}}});var P=b(Y,[["__scopeId","data-v-e8456c92"]]);export{P as default};

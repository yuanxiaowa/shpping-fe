(function(t){function e(e){for(var r,a,c=e[0],u=e[1],s=e[2],l=0,f=[];l<c.length;l++)a=c[l],i[a]&&f.push(i[a][0]),i[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);d&&d(e);while(f.length)f.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(o.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},a={app:0},i={app:0},o=[];function c(t){return u.p+"js/"+({"calc-price":"calc-price",collection:"collection",comment:"comment",eval:"eval",index:"index",shop:"shop","sixty-course":"sixty-course","test-order":"test-order",tools:"tools"}[t]||t)+"."+{"calc-price":"580c029c",collection:"d64493a6",comment:"18dbee94",eval:"4b66fc68",index:"df379354",shop:"98432765","sixty-course":"8e42b8be","test-order":"2bbcf0b6",tools:"e9d847da"}[t]+".js"}function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={index:1,shop:1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise(function(e,n){for(var r="css/"+({"calc-price":"calc-price",collection:"collection",comment:"comment",eval:"eval",index:"index",shop:"shop","sixty-course":"sixty-course","test-order":"test-order",tools:"tools"}[t]||t)+"."+{"calc-price":"31d6cfe0",collection:"31d6cfe0",comment:"31d6cfe0",eval:"31d6cfe0",index:"0b2e3458",shop:"8747135b","sixty-course":"31d6cfe0","test-order":"31d6cfe0",tools:"31d6cfe0"}[t]+".css",i=u.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var s=o[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===i))return e()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){s=f[c],l=s.getAttribute("data-href");if(l===r||l===i)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var r=e&&e.target&&e.target.src||i,o=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[t],d.parentNode.removeChild(d),n(o)},d.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(d)}).then(function(){a[t]=0}));var r=i[t];if(0!==r)if(r)e.push(r[2]);else{var o=new Promise(function(e,n){r=i[t]=[e,n]});e.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(t),s=function(e){l.onerror=l.onload=null,clearTimeout(f);var n=i[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");o.type=r,o.request=a,n[1](o)}i[t]=void 0}};var f=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/public/",u.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var f=0;f<s.length;f++)e(s[f]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"034f":function(t,e,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"17ee":function(t,e,n){"use strict";n.d(e,"a",function(){return s});n("f559"),n("ac6a"),n("5df3"),n("6762"),n("2fdb"),n("6d67"),n("d25f"),n("96cf");var r=n("3b8d"),a=n("eef9"),i=n("ddd3"),o=n("7f5d"),c=n("5c96"),u=n("6357");function s(t,e,n){return l.apply(this,arguments)}function l(){return l=Object(r["a"])(regeneratorRuntime.mark(function t(e,n,r){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(e.map(function(t){return Object(o["A"])({data:t},n,r)}));case 2:return a=t.sent,t.abrupt("return",a.filter(Boolean));case 4:case"end":return t.stop()}},t)})),l.apply(this,arguments)}i["a"].$on("qiangquan",function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["a"])(e);case 2:return e=t.sent,t.next=5,s(e.urls,e.datetime,e.platform);case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),i["a"].$on("coudan",function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["a"])(e);case 2:return e=t.sent,t.next=5,s(e.urls,void 0,e.platform);case 5:if(n=t.sent,e.urls=n.map(function(t){var e=t.url;return e}).filter(Boolean),0!==e.urls.length){t.next=9;break}throw new Error("无链接");case 9:1===e.urls.length?Object(o["a"])({url:e.urls[0],quantity:e.quantities[0],skus:e.skus,expectedPrice:e.expectedPrice,from_pc:e.from_pc,other:{},diejia:e.diejia,jianlou:e.jianlou},e.datetime,e.platform):(c["Notification"].success("开始凑单"),i["a"].$emit("unselect-all",e.platform),setTimeout(function(){Object(o["m"])(Object.assign({from_pc:!0,other:{}},e),e.platform)}));case 10:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),i["a"].$on("unselect-all",function(t){return Object(o["h"])({checked:!1},t)}),i["a"].$on("sys-time",function(t){var e=t.includes("京东")?"jingdong":"taobao";Object(o["G"])(e)}),i["a"].$on("tasks",function(t){t&&Object(o["z"])(t.qq),Object(o["w"])().then(function(e){Object(u["a"])(e.map(function(t){return[t.platform,t.type,t.text,t.time].join("-")}).join("\n")||"暂无",t&&t.qq)}),t&&Object(o["y"])()}),i["a"].$on("tasks-kill",function(t){t&&Object(o["z"])(t.qq),Object(o["w"])().then(function(e){Promise.all(e.map(function(t){return Object(o["b"])(t.id)})).then(function(){Object(u["a"])("已取消",t&&t.qq),t&&Object(o["y"])()},function(){Object(u["a"])("取消失败",t&&t.qq),t&&Object(o["y"])()})})}),i["a"].$on("check-status",function(t){t&&Object(o["z"])(t.qq),Object(o["j"])("taobao",t&&t.qq).then(function(e){e&&e.startsWith("http")?c["MessageBox"].alert("<img src=".concat(e," />"),{dangerouslyUseHTMLString:!0,center:!0}):(c["Notification"].success("(".concat(e,")状态正常")),Object(u["a"])("(".concat(e,")登录状态正常"),t&&t.qq))}),t&&Object(o["y"])()})},6357:function(t,e,n){"use strict";n.d(e,"a",function(){return h});var r=n("d225"),a=n("b0b4"),i=(n("a481"),n("4f37"),n("3b2b"),n("6762"),n("2fdb"),n("ddd3")),o=n("d70b"),c=n("7f5d"),u=n("eef9"),s=(n("17ee"),new WebSocket("ws://localhost:6700/event/"));s.onmessage=function(t){var e=JSON.parse(t.data),n=e.message_type,r=e.raw_message,a=e.group_id,u=e.user_id,s=r;if("group"===n)o["a"].includes(a)&&g(r)&&(console.log(s),Object(c["D"])(s));else if("private"===n&&(u===o["c"]||o["b"][u])){var l,f=u===o["c"]?void 0:{qq:u,port:o["b"][u]};if("cs"===r||"检查状态"===r)return i["a"].$emit("check-status",f);if("任务列表"===r||"rwlb"===r)return i["a"].$emit("tasks",f);if("秒杀"===r||"ms"===r)return i["a"].$emit("seckill",f);if("取消任务列表"===r||"qxrwlb"===r)return i["a"].$emit("tasks-kill",f);if(u!==o["c"])return;if(r.includes("同步时间"))return i["a"].$emit("sys-time",r);/(\d+)点/.test(s)?l=RegExp.$1:s.includes("现在")&&(l=new Date),g(r,l)}};var l=/(?<!\w)\w{11}(?!\w)/g,f=/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g,d=/[&%【】,，，\s￥(（¢)）\-~!\/$​：。€₤]/g;function p(t){return t.replace(l,"").replace(/.*复制.*/,"").replace(/.*点击链接.*/,"").replace(f,"").replace(d,"").replace(/群有反馈|领取|速度|无门槛|京东|红包|先?领券|防身/g,"").replace(/\[CQ:imagefile=[^\]]+\]/g,"").trim()}var m=function(){function t(){Object(r["a"])(this,t),this.max=20,this.items=[]}return Object(a["a"])(t,[{key:"add",value:function(t){this.items.length>=this.max&&this.items.shift(),this.items.push(p(t))}},{key:"has",value:function(t){var e=p(t);return this.items.includes(e)}}]),t}(),b=new m;function g(t,e){if(!t.includes("【苏宁】")&&!t.includes("【盒马】")&&(t=t.replace(/\s+/," ").replace(/&amp;/g,"&").replace(/💰/g,"元").trim(),!b.has(t))){b.add(t);var n=Object(u["c"])(t,e);return n&&n.action?"notice"===n.action||(!(n.datetime||"coudan"!==n.action||!/\d点/.test(t))||(n.from_pc=t.includes("电脑"),i["a"].$emit(n.action,n),!0)):void 0}}function h(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o["c"];Object(c["E"])(t,e)}window.recorder=b},"64a9":function(t,e,n){},"7f5d":function(t,e,n){"use strict";n.d(e,"z",function(){return m}),n.d(e,"y",function(){return b}),n.d(e,"f",function(){return v}),n.d(e,"d",function(){return j}),n.d(e,"g",function(){return y}),n.d(e,"h",function(){return w}),n.d(e,"c",function(){return O}),n.d(e,"e",function(){return x}),n.d(e,"i",function(){return _}),n.d(e,"a",function(){return k}),n.d(e,"m",function(){return q}),n.d(e,"A",function(){return $}),n.d(e,"l",function(){return S}),n.d(e,"k",function(){return E}),n.d(e,"C",function(){return C}),n.d(e,"t",function(){return R}),n.d(e,"D",function(){return M}),n.d(e,"E",function(){return N}),n.d(e,"v",function(){return P}),n.d(e,"B",function(){return T}),n.d(e,"j",function(){return z}),n.d(e,"G",function(){return A}),n.d(e,"x",function(){return D}),n.d(e,"p",function(){return B}),n.d(e,"F",function(){return L}),n.d(e,"w",function(){return J}),n.d(e,"b",function(){return Z}),n.d(e,"o",function(){return H}),n.d(e,"n",function(){return F}),n.d(e,"u",function(){return I}),n.d(e,"q",function(){return G}),n.d(e,"s",function(){return Q}),n.d(e,"r",function(){return U}),n.d(e,"H",function(){return W});var r=n("cebc"),a=n("bc3a"),i=n.n(a),o=n("5c96"),c=n("ddd3"),u=n("6357"),s=n("d70b"),l=location.hostname,f=i.a.create({baseURL:"http://".concat(l,":",7001)}),d=localStorage.getItem("user");d=d?JSON.parse(d):{};var p=[d];function m(t){p.push({id:t,qq:t})}function b(){setTimeout(function(){p.pop()})}function g(){o["MessageBox"].prompt("请输入用户名").then(function(t){var e=t.value;o["MessageBox"].prompt("请输入QQ号码").then(function(t){var n=t.value;Object.assign(d,{id:e,qq:n}),localStorage.setItem("user",JSON.stringify(d)),h({id:d.id,qq:n})})})}function h(t){return f.get("/authorize",{params:t})}function v(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return f.get("/cart",{params:{platform:t,from_pc:e?1:""}})}function j(t,e,n){return f.post("/cart/buy",t,{params:{platform:n,t:e}})}function y(t,e){return f.post("/cart/toggle",t,{params:{platform:e}})}function w(t,e){return f.post("/cart/toggle-all",t,{params:{platform:e}})}function O(t,e){return f.post("/cart/add",t,{params:{platform:e}})}function x(t,e){return f.post("/cart/del",t,{params:{platform:e}})}function _(t,e){return f.post("/cart/quantity",t,{params:{platform:e}})}function k(t,e,n){return f.post("/buy/direct",t,{params:{platform:n,t:e}})}function q(t,e){return f.post("/coudan",t,{params:{platform:e}})}function $(t,e,n){return f.post("/qiangquan",t,{params:{platform:n,t:e}})}function S(t,e){return f.get("/comment",{params:Object(r["a"])({platform:e},t)})}function E(t,e){return f.post("/comment/add",t,{params:{platform:e}})}function C(t,e){return f.post("/resolve/url",t,{params:{platform:e}})}function R(t){return f.get("/qrcode/generate",{params:{url:t}})}function M(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:124866249;return i.a.get("http://localhost:5700/send_group_msg",{params:{group_id:e,message:t}})}function N(t,e){return i.a.get("http://localhost:5700/send_private_msg",{params:{user_id:e,message:t}})}function P(){return f.get("/sixty-course/list")}function T(t){return f.get("/sixty-course/reply",{params:t})}function z(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s["c"];return f.get("/check/status",{params:{platform:t,qq:e}})}function A(t){return f.get("/sys/time",{params:{platform:t}})}function D(t){return f.get("/goods/list",{params:t})}function B(){return f.get("/config")}function L(t){return f.post("/config",t)}function J(){return f.get("/task/list")}function Z(t){return f.get("/task/cancel",{params:{id:t}})}function H(t){return f.get("/collection",{params:t})}function F(t,e){return f.post("/collection/del",t,{params:{platform:e}})}function I(t){return f.get("/seckill/list",{params:t})}function G(t){return f.get("/my/coupons",{params:t})}function Q(){return f.get("/quanpin/plus")}function U(t){return f.post("/quanpin/plus/get",t)}function W(t){return f.get("/test/order",{params:t})}f.interceptors.request.use(function(t){return t.params||(t.params={}),t.params._id=p[p.length-1].id,t}),f.interceptors.response.use(function(t){if(200!==t.status)throw o["Notification"].error(t.data.message),new Error(t.data.message);var e=t.data,n=e.code,r=e.msg,a=e.data;if(0!==n){if(o["Notification"].error(r),2===n){var i=t.config.params,s=i&&i._id;s&&m(s),h(i&&{qq:i.qq}),s&&b()}else 3===n?g():"令牌过期"===r&&(c["a"].$emit("check-status"),Object(u["a"])(r));throw new Error(r)}return r&&o["Notification"].success(r),a}),d.id?h():g()},b1f3:function(t,e){},b38b:function(t){t.exports=["大闸蟹","螃蟹","龙虾","护发素","面膜","婴","冰袖","卷发棒","面膜","腮红","充电宝","孕妇","童装","宝宝","卫生巾","耳机","名人","纸尿裤","试卷","真题","素描","眉笔","女款","冈本","套套","避孕套","防晒","洗面奶","眼罩","蟑螂药","儿童"]},cd49:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-component__scroll"},[n("config"),n("router-view"),n("el-backtop",{attrs:{target:".page-component__scroll"}})],1)},i=[],o=n("d225"),c=n("308d"),u=n("6bb5"),s=n("4e2b"),l=n("9ab4"),f=n("60a3"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{attrs:{size:"small"}},[n("el-form-item",[n("el-button",{on:{click:function(e){t.drawer=!0}}},[t._v("配置")]),n("el-button",{on:{click:function(e){t.show_task=!0}}},[t._v("任务列表")])],1),n("el-drawer",{attrs:{title:"配置",visible:t.drawer,direction:"ltr"},on:{"update:visible":function(e){t.drawer=e}}},[n("el-divider"),n("el-form-item",[n("status-comp")],1),n("el-divider"),n("el-form-item",{attrs:{label:"自动提交订单"}},[n("el-checkbox",{on:{input:t.setConfig},model:{value:t.config.isSubmitOrder,callback:function(e){t.$set(t.config,"isSubmitOrder",e)},expression:"config.isSubmitOrder"}})],1),n("el-form-item",{attrs:{label:"延迟"}},[n("el-input-number",{on:{input:t.setConfig},model:{value:t.config.delay_all,callback:function(e){t.$set(t.config,"delay_all",e)},expression:"config.delay_all"}})],1),n("el-form-item",{attrs:{label:"下单间隔"}},[n("el-input-number",{on:{input:t.setConfig},model:{value:t.config.interval_submit,callback:function(e){t.$set(t.config,"interval_submit",e)},expression:"config.interval_submit"}})],1),n("el-form-item",{attrs:{label:"下单延时"}},[n("el-input-number",{on:{input:t.setConfig},model:{value:t.config.delay_submit,callback:function(e){t.$set(t.config,"delay_submit",e)},expression:"config.delay_submit"}})],1),n("el-form-item",[n("el-button",{on:{click:t.pullConfig}},[t._v("拉取配置")])],1)],1),n("task",{model:{value:t.show_task,callback:function(e){t.show_task=e},expression:"show_task"}})],1)},p=[],m=n("b0b4"),b=n("7f5d"),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-drawer",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{visible:t.vv,size:"50%",title:"任务列表",direction:"ltr"},on:{"update:visible":function(e){t.vv=e}}},[n("el-card",[n("el-button",{staticStyle:{padding:"3px 0"},attrs:{type:"text"},on:{click:t.getData}},[t._v("拉取")]),t._l(t.items,function(e){return n("el-row",{key:e.id,staticStyle:{"margin-bottom":".5em"}},[n("el-col",[t._v("\n        "+t._s(e.time)+": "+t._s(e.text)+"-"+t._s(e.platform)+t._s(e.name)+"\n        "),n("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(n){return t.cancel(e.id)}}},[t._v("取消")])],1)],1)})],2)],1)},h=[],v=(n("20d6"),n("96cf"),n("3b8d")),j=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.items=[],t.loading=!1,t}return Object(s["a"])(e,t),Object(m["a"])(e,[{key:"getData",value:function(){var t=Object(v["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.loading=!0,Object(b["w"])().then(function(t){e.items=t,e.loading=!1});case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"cancel",value:function(t){var e=this;Object(b["b"])(t).then(function(){var n=e.items.findIndex(function(e){return e.id===t});e.items.splice(n,1)})}},{key:"vv",set:function(t){this.$emit("input",t)},get:function(){return this.value}}]),e}(f["c"]);l["a"]([Object(f["b"])(Boolean)],j.prototype,"value",void 0),j=l["a"]([f["a"]],j);var y=j,w=y,O=n("2877"),x=Object(O["a"])(w,g,h,!1,null,null,null),_=x.exports,k=n("e2a0"),q=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.config={},t.drawer=!1,t.show_task=!1,t}return Object(s["a"])(e,t),Object(m["a"])(e,[{key:"mounted",value:function(){this.pullConfig()}},{key:"pullConfig",value:function(){var t=this;Object(b["p"])().then(function(e){t.config=e})}},{key:"setConfig",value:function(){Object(b["F"])(this.config)}}]),e}(f["c"]);q=l["a"]([Object(f["a"])({components:{Task:_,StatusComp:k["a"]}})],q);var $=q,S=$,E=Object(O["a"])(S,d,p,!1,null,null,null),C=E.exports,R=function(t){function e(){return Object(o["a"])(this,e),Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments))}return Object(s["a"])(e,t),e}(f["c"]);R=l["a"]([Object(f["a"])({components:{Config:C}})],R);var M=R,N=M,P=(n("034f"),Object(O["a"])(N,a,i,!1,null,null,null)),T=P.exports,z=n("5c96"),A=n.n(z),D=(n("0fae"),n("6357"),n("b1f3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{position:"relative"}},[n("el-button",{staticClass:"__clip-btn",staticStyle:{position:"absolute",right:"0"},attrs:{size:"small"}},[t._v("复制")]),n("div",{domProps:{innerHTML:t._s(t.html)}})],1)}),B=[],L=(n("a481"),n("b311")),J=n.n(L);new J.a(".__clip-btn",{text:function(t){return console.log(t.nextElementSibling.innerText),t.nextElementSibling.innerText}});var Z=function(t){function e(){return Object(o["a"])(this,e),Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments))}return Object(s["a"])(e,t),Object(m["a"])(e,[{key:"html",get:function(){return JSON.stringify(this.data,null,2).replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;")}}]),e}(f["c"]);l["a"]([Object(f["b"])()],Z.prototype,"data",void 0),Z=l["a"]([Object(f["a"])({components:{}})],Z);var H=Z,F=H,I=Object(O["a"])(F,D,B,!1,null,null,null),G=I.exports;r["default"].component("clipboard",G);var Q=n("8c4f"),U=n("db39");r["default"].use(Q["a"]);var W=new Q["a"]({mode:"hash",base:"/public/",routes:U["a"]});r["default"].use(A.a),r["default"].config.productionTip=!1,new r["default"]({router:W,render:function(t){return t(T)}}).$mount("#app")},d70b:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return i});var r=[774012227,707407810,289612257,770694998,239941001],a={261663408:7005,279557608:7004,727694556:7003,870092104:7002},i=870092104},ddd3:function(t,e,n){"use strict";var r=n("2b0e"),a=new r["default"];e["a"]=a},e2a0:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-radio-group",{model:{value:t.platform,callback:function(e){t.platform=e},expression:"platform"}},[n("el-radio",{attrs:{label:"taobao"}},[t._v("淘宝")]),n("el-radio",{attrs:{label:"jingdong"}},[t._v("京东")])],1),n("el-button",{attrs:{size:"small"},on:{click:t.checkStatus}},[t._v("获取状态")]),n("el-button",{attrs:{size:"small"},on:{click:t.sysTime}},[t._v("同步时间")])],1)},a=[],i=n("d225"),o=n("b0b4"),c=n("308d"),u=n("6bb5"),s=n("4e2b"),l=n("9ab4"),f=n("60a3"),d=n("7f5d"),p=n("ddd3"),m=function(t){function e(){var t;return Object(i["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.platform="taobao",t.status_text="",t}return Object(s["a"])(e,t),Object(o["a"])(e,[{key:"checkStatus",value:function(){p["a"].$emit("check-status")}},{key:"sysTime",value:function(){Object(d["G"])(this.platform)}}]),e}(f["c"]);m=l["a"]([f["a"]],m);var b=m,g=b,h=n("2877"),v=Object(h["a"])(g,r,a,!1,null,null,null);e["a"]=v.exports},eef9:function(t,e,n){"use strict";n.d(e,"c",function(){return u}),n.d(e,"a",function(){return d}),n.d(e,"b",function(){return m});n("5df3"),n("96cf");var r=n("3b8d"),a=(n("6b54"),n("87b3"),n("7514"),n("6762"),n("2fdb"),n("4f37"),n("6c7b"),n("c5f6"),n("6d67"),n("3b2b"),n("a481"),n("f3e2"),n("4917"),n("ac6a"),n("456d"),n("28a5"),n("0cd8"),n("7f5d")),i=n("b38b");window.resolveText=u;var o="零一二三四五六七八九十".split("").reduce(function(t,e,n){return t[e]=n,t},{"两":2}),c=Object.keys(o).join("");function u(t,e){var n,r,a,u=!1;if(r=t.match(/(?<![a-zA-Z0-9&=.\/?])[a-zA-Z0-9]{11}(?![a-zA-Z0-9&=.\/?])/g),r?n="taokouling":r=t.match(/https?:\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?/g),r){n="url",r.forEach(function(e){t=t.replace(e,"")});var l=t.match(/(?<=(?<!拍)下|拍|买|加车|加购|选)\d+/g);l||(l=t.match(/(?<!前\d*)\d+(?=件(?!套)|份)/g)),l||(l=t.match(new RegExp("(?<!限购)[".concat(c,"](?=件|份)"),"g")),l&&(l=l.map(function(t){return o[t]}))),a=l?r.map(function(t,e){return Number(l[e])||1}):Array(r.length).fill(1);var f,d=10,p="";if((/([\d.]+)元/.test(t)||/付([\d.]+)/.test(t)||/(?:到手|预计|拍下)([\d\.]+)/.test(t)||/【([\d.]+)(包邮)?】/.test(t)||/\[([\d.]+)\]/.test(t)||/(?:[\s：:，,]|半价|折合|折后)([\d.]+)(?!\w)/.test(t)||/([\d\.]+)包邮/.test(t)||/件([\d\.]+)/.test(t)||/([\d\.]+)到手/.test(t)||/价([\d\.]+)/.test(t)||/([\d\.]+)起/.test(t)||/^\s*([\d.]+)(?!点)/.test(t))&&(u=!0,d=Number(RegExp.$1)),/^(?:下|拍)(\d+)$/.test(t.trim()))d=50,p="coudan",u=!0;else if(/(?<!\d|第..)0(?=元|[!\d])|0撸|零撸|免单|不是(0|零)不要买|实付0|直接(够)买就是0|到手0/.test(t))d=0,u=!0,p="coudan";else if(t.includes("一分"))d=.01,p="coudan",u=!0;else if(/(?<!\d|件|份|条)(?<!\d)(0\.\d+)/.test(t))d=Number(RegExp.$1),p="coudan",u=!0;else if(t.includes("试试"))/\d+点/.test(t)?p="qiangquan":(d=10,p="coudan");else if(t.includes("锁单")||t.includes("先锁")||t.includes("速度拍下"))p="coudan",d>500&&(d=500);else if(t.includes("叠加")){var m=/(\d+)-(\d+)/g,b=0,g=0;while(m.test(t))b=Math.max(+RegExp.$1,b),g=Math.max(+RegExp.$2,g);if(t.includes("米")||/[^酱]油/.test(t))if(10!==d){var h=d/a[0];h>1.75&&(d=Math.min(10,d))}else d=Math.min(d,50);else t.includes("洗衣")||t.includes("洗发")?d=Math.min(d,30):t.includes("婴")||t.includes("孕")?d=Math.min(d,5):b>70?t.includes("衣")||(d=Math.min(d,20)):d=Math.min(d,10);/\d+点/.test(t)?p="qiangquan":(p="coudan",f=b)}else if(/前\d+(?!分钟)|(?<!\d)0\.\d+|速度|抽奖|领金豆|淘宝搜|(?<!可用|消灭)(小|聚划算)?红包|虹包|神价|秒杀|神车|手慢无|手快有|好价|神价/.test(t))p="qiangquan";else{if(/拼购([券卷]|日)|领[券卷]|新[券卷]|领全品|白条[券卷]|吱付[券卷]|支付[券卷]|可领|领取优惠[券卷]|无门槛|史低|漏洞|bug|抢[券卷]|快领|速度领|(\d+)?-\d+[券卷]|领(标题)?下方|领\d+折?[券卷]|防身|福利|(\d|一二三四五六七八九)(毛|分)/.test(t)){if("taokouling"===n&&i.find(function(e){return t.includes(e)}))return;return{type:n,action:"qiangquan",urls:r,quantities:a,expectedPrice:d,datetime:s(e)}}t.includes("1元包邮")?/钢化膜|手机膜|数据线/.test(t)||(p="notice"):/大米|盐|猫超|有货的上|蟹|桌|椅/.test(t)&&(p="notice")}return/(\d+)点/.test(t)||(d<1&&e&&(p="coudan"),!p&&t.includes("抢单")&&(p="coudan")),{type:n,urls:r,quantities:a,expectedPrice:d,action:p,forcePrice:u,diejia:f,datetime:s(e),jianlou:"coudan"===p&&e?30:void 0}}if(/速度|锁单|试试|叠加/.test(t))return{action:"notice"}}function s(t){if(t){if(t instanceof Date)return t.toString();var e=+t,n=new Date,r=new Date(n.getFullYear(),n.getMonth(),n.getDate(),e);return(0===e||n.getHours()>e)&&r.setDate(r.getDate()+1),r.toString()}}function l(t){return f.apply(this,arguments)}function f(){return f=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.urls,r=e.platform,t.abrupt("return",Promise.all(n.map(function(t){return Object(a["C"])({data:t},r)})));case 2:case"end":return t.stop()}},t)})),f.apply(this,arguments)}function d(t){return p.apply(this,arguments)}function p(){return p=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="taobao",e.urls[0].includes(".jd.com")&&(n="jingdong"),e.platform=n,t.next=5,l(e);case 5:return r=t.sent,e.urls=r,t.abrupt("return",e);case 8:case"end":return t.stop()}},t)})),p.apply(this,arguments)}function m(t){return b.apply(this,arguments)}function b(){return b=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=e.replace(/\s+/," ").replace(/&amp;/g,"&").replace(/💰/g,"元").trim(),n=u(e),t.next=4,d(n);case 4:if(n=t.sent,n){t.next=7;break}throw new Error("无链接");case 7:return t.abrupt("return",n);case 8:case"end":return t.stop()}},t)})),b.apply(this,arguments)}}});
//# sourceMappingURL=app.a3220ce5.js.map
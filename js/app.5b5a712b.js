(function(e){function t(t){for(var o,r,u=t[0],i=t[1],s=t[2],l=0,f=[];l<u.length;l++)r=u[l],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&f.push(a[r][0]),a[r]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],o=!0,r=1;r<n.length;r++){var u=n[r];0!==a[u]&&(o=!1)}o&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},a={app:0},c=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-00246503":"f45ff620","chunk-7b857d43":"af9144b2"}[e]+".js"}function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-00246503":1,"chunk-7b857d43":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-00246503":"1b209600","chunk-7b857d43":"aa476211"}[e]+".css",a=i.p+o,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===o||l===a))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===o||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var o=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=o,delete r[e],d.parentNode.removeChild(d),n(c)},d.href=a;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){r[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var c=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",f.name="ChunkLoadError",f.type=o,f.request=r,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/thef2e-2019-w6-reservation/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1a1c":function(e,t,n){},"33f9":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],c={name:"app"},u=c,i=n("2877"),s=Object(i["a"])(u,r,a,!1,null,null,null),l=s.exports,f=(n("7f7f"),n("8c4f")),d=(n("ac6a"),n("2f62")),m=n("bc3a"),p=n.n(m);o["default"].use(d["a"]);var h={Authorization:"Bearer 4jGwjfznoX5ftKlftGTPRrm8DSTpZAzILdyoxCvtTZGQBSbSJzsEN0ldgOg7",accept:"application/json"},g=[],v=new d["a"].Store({strict:!1,state:{rooms:null,room:null,reserveDate:[],reserveResult:null,bookingData:null,bookingModal:!1,bookingLoading:!1},mutations:{setRooms:function(e,t){e.rooms=t},setRoom:function(e,t){e.room=t},setReserveDate:function(e,t){e.reserveDate=t},setReserveResult:function(e,t){e.reserveResult=t},setBookingData:function(e,t){e.bookingData=t},toggleBookingModal:function(e,t){e.bookingModal=t},setBookingLoading:function(e,t){e.bookingLoading=t}},actions:{getRooms:function(e){var t=e.commit;p.a.get("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms",{headers:h}).then((function(e){e.data.success&&function(){for(var n=0,o=e.data.items.reverse(),r=0;r<o.length;r++)g[r]=document.createElement("IMG"),g[r].src=o[r].imageUrl,g[r].onload=function(){n++,n===o.length&&t("setRooms",o)}}()})).catch((function(e){return console.error(e)}))},getRoom:function(e,t){var n=e.commit;p.a.get("https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(t),{headers:h}).then((function(e){if(e.data.success){var t=0,o=e.data.room[0].imageUrl;o.forEach((function(r){var a=new Image;a.onload=function(){t++,t===o.length&&(n("setRoom",e.data.room[0]),n("setBookingData",e.data.booking))},a.src=r}))}})).catch((function(e){return console.error(e)}))},booking:function(e,t){var n=e.state,o=e.commit,r=e.dispatch;o("setBookingLoading",!0),p()({method:"POST",url:"https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(n.route.params.id),headers:h,data:t}).then((function(e){e.data.success&&(o("setReserveResult",""),o("setReserveDate",[]),r("getRoom",n.route.params.id))})).catch((function(e){e.response&&o("setReserveResult",e.response.data.message)})).finally((function(){o("setBookingLoading",!1),o("toggleBookingModal",!1)}))}}});o["default"].use(f["a"]);var b=new f["a"]({routes:[{path:"/",name:"home",component:function(){return n.e("chunk-7b857d43").then(n.bind(null,"bb51"))}},{path:"/room/:id",name:"room",component:function(){return n.e("chunk-00246503").then(n.bind(null,"3ab1"))}},{path:"*",redirect:"/"}]});b.afterEach((function(e,t){"room"===e.name?v.commit("setReserveDate",[]):(v.commit("setRoom",null),v.commit("setBookingData",null))}));var k=b,y=n("31bd"),w=n("e069"),R=n.n(w),j=n("80dc"),O=n.n(j);n("dcad");o["default"].use(R.a,{locale:O.a});n("33f9"),n("1a1c");o["default"].config.productionTip=!1,Object(y["sync"])(v,k),new o["default"]({router:k,store:v,render:function(e){return e(l)}}).$mount("#app")}});
//# sourceMappingURL=app.5b5a712b.js.map
(function(t){function e(e){for(var n,a,i=e[0],s=e[1],u=e[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);p&&p(e);while(d.length)d.shift()();return c.push.apply(c,u||[]),r()}function r(){for(var t,e=0;e<c.length;e++){for(var r=c[e],n=!0,a=1;a<r.length;a++){var i=r[a];0!==o[i]&&(n=!1)}n&&(c.splice(e--,1),t=s(s.s=r[0]))}return t}var n={},a={app:0},o={app:0},c=[];function i(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"522904f9"}[t]+".js"}function s(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(t){var e=[],r={about:1};a[t]?e.push(a[t]):0!==a[t]&&r[t]&&e.push(a[t]=new Promise((function(e,r){for(var n="css/"+({about:"about"}[t]||t)+"."+{about:"f80b6648"}[t]+".css",o=s.p+n,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var u=c[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===o))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===n||l===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var n=e&&e.target&&e.target.src||o,c=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=n,delete a[t],p.parentNode.removeChild(p),r(c)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[t]=0})));var n=o[t];if(0!==n)if(n)e.push(n[2]);else{var c=new Promise((function(e,r){n=o[t]=[e,r]}));e.push(n[2]=c);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=i(t);var d=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(p);var r=o[t];if(0!==r){if(r){var n=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",d.name="ChunkLoadError",d.type=n,d.request=a,r[1](d)}o[t]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},s.m=t,s.c=n,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(r,n,function(e){return t[e]}.bind(null,n));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var p=l;c.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-app-bar",{attrs:{app:""}},[r("app-topbar",{attrs:{products:t.products}})],1),r("v-content",[r("v-container",{attrs:{fluid:""}},[r("router-view",{attrs:{products:t.products}})],1)],1),r("v-footer",{attrs:{app:""}})],1)},o=[],c=(r("d3b7"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"sidebar"},[t._v(" Company: "),t._l(t.products,(function(e,n){return r("v-checkbox",{key:n,attrs:{type:"checkbox",label:e.company},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})}))],2)}),i=[],s={name:"Sidebar",props:{products:{type:Array,default:Array,required:!0}},data:function(){return{model:!1}}},u=s,l=r("2877"),d=r("6544"),p=r.n(d),f=r("ac7c"),m=Object(l["a"])(u,c,i,!1,null,null,null),h=m.exports;p()(m,{VCheckbox:f["a"]});var v=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"topbar container"},[r("div",{staticClass:"flex row align-center"},[r("v-btn",{staticClass:"d-flex col-1 align-center",attrs:{to:"/",fixed:"",text:"",icon:"",color:"blue lighten-2"}},[r("v-icon",{attrs:{large:""}},[t._v("mdi-home")])],1),r("router-link",{staticClass:"d-flex col-2 offset-md-5",attrs:{to:"/"}},[r("h3",[t._v("Van-Code Store")])]),r("div",{staticClass:"d-flex justify-end col-3 offset-md-2 justify-space-between align-center"},[r("div",[t._v("Hello"+t._s(t.userName))]),t.isLoggedIn?r("v-btn",{attrs:{text:""},on:{click:t.signOut}},[t._v("Sign Out")]):r("v-btn",{attrs:{text:"",to:"/signin"}},[t._v("Sign In")]),r("v-btn",{attrs:{to:{path:"/cart",query:{redirectPath:"checkout"}},text:"",icon:"",large:"",color:"primary"}},[r("v-badge",{attrs:{color:"pink",content:t.cartBadge,value:t.cartBadge>0}},[r("v-icon",{staticClass:"right"},[t._v("mdi-cart")])],1)],1)],1)],1)])},g=[],b=(r("d81d"),r("b0c0"),{name:"Topbar",props:{products:{type:Array,default:Array,required:!0}},computed:{cartBadge:function(){return this.$store.state.cart.length},isLoggedIn:function(){return this.$store.state.user.isLoggedIn},list:function(){return this.products.map((function(t){return t.name}))},userName:function(){return this.$store.state.user.name?", ".concat(this.$store.state.user.name):"!"}},methods:{signOut:function(){this.$store.commit("userData",{isLoggedIn:!1}),"CheckOut"===this.$router.name&&this.$router.push("/")}}}),y=b,C=r("4ca6"),_=r("8336"),x=r("132d"),P=Object(l["a"])(y,v,g,!1,null,null,null),w=P.exports;p()(P,{VBadge:C["a"],VBtn:_["a"],VIcon:x["a"]});var k={name:"App",components:{AppSidebar:h,AppTopbar:w},created:function(){this.fetchProducts()},data:function(){return{products:[]}},methods:{fetchProducts:function(){var t=this;fetch("./json/MOCK_DATA.json").then((function(t){return t.json()})).then((function(e){return t.products=e}))}}},O=k,j=r("7496"),A=r("40dc"),$=r("a523"),V=r("a75b"),q=r("553a"),I=Object(l["a"])(O,a,o,!1,null,null,null),S=I.exports;p()(I,{VApp:j["a"],VAppBar:A["a"],VContainer:$["a"],VContent:V["a"],VFooter:q["a"]});var E=r("8c4f"),T=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[r("v-container",[r("v-row",{staticClass:"text-center"},t._l(t.products,(function(t){return r("v-col",{key:t.item_num,attrs:{cols:"3"}},[r("product-item",{attrs:{product:t}})],1)})),1)],1)],1)},L=[],B=r("9588"),D={name:"Home",props:{products:{type:Array,default:Array,required:!0}},components:{ProductItem:B["a"]}},N=D,R=r("62ad"),M=r("0fd9"),H=Object(l["a"])(N,T,L,!1,null,null,null),F=H.exports;p()(H,{VCol:R["a"],VContainer:$["a"],VRow:M["a"]});r("4de4"),r("7db0");var J=r("2f62");r("d491");n["a"].use(J["a"]);var K=new J["a"].Store({state:{cart:[],user:{isLoggedIn:!1,name:"Customer",shipping:[]}},mutations:{userData:function(t,e){t.user=e},cartData:function(t,e){t.cart=e},addItem:function(t,e){var r=t.cart.find((function(t){return t.item_num===e.item_num}));r?r.quantity+=e.quantity:t.cart.push(e)},removeItem:function(t,e){t.cart=t.cart.filter((function(t){return t.item_num!==e}))},updateAddressList:function(t,e){t.user.shipping=e}},actions:{},modules:{}});n["a"].use(E["a"]);var Q=[{path:"/",name:"Home",component:F},{path:"/product/:value1",name:"Prodcut Details",component:function(){return r.e("about").then(r.bind(null,"7011"))}},{path:"/cart",name:"Cart",component:function(){return r.e("about").then(r.bind(null,"b789"))}},{path:"/signin",name:"SignIn",component:function(){return r.e("about").then(r.bind(null,"54e2"))}},{path:"/register",name:"Register",component:function(){return r.e("about").then(r.bind(null,"73cf"))}},{path:"/checkout",name:"CheckOut",meta:{requiresAuth:!0},beforeEnter:function(t,e,r){K.state.user.isLoggedIn?r({query:{redirectPath:""}}):r({path:"/signin"})},component:function(){return r.e("about").then(r.bind(null,"7cb4"))}}],U=new E["a"]({routes:Q}),z=U,G=r("f309");n["a"].use(G["a"]);var W=new G["a"]({});n["a"].config.productionTip=!1,new n["a"]({router:z,store:K,vuetify:W,render:function(t){return t(S)}}).$mount("#app")},9588:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("router-link",{staticClass:"product-item",attrs:{to:"product/"+t.product.item_num}},[r("v-card",{ref:t.product.item_num,class:{"cartRow mb-4 align-center":t.isCartPage,notCart:!t.isCartPage}},[r("v-img",{staticClass:"white--text",class:{"d-flex":t.isCartPage},attrs:{height:t.height,width:t.width,src:t.product.image,cols:t.isCartPage?3:"auto"}}),r("v-col",{attrs:{cols:t.isCartPage?6:"auto"}},[r("v-card-title",{class:{"text-left":t.isCartPage}},[t._v(t._s(t.product.name))]),r("v-card-text",{staticClass:"text-left"},[t._v(t._s(t.product.description))]),t.isCartPage?r("div",{staticClass:"row col-12 text-left"},[r("v-btn",{attrs:{text:""},on:{click:function(e){return e.preventDefault(),t.clickRemove(e)}}},[t._v("Remove")])],1):t._e()],1),r("v-col",{class:{"align-center":t.isCartPage},attrs:{cols:t.isCartPage?3:"auto"}},[r("v-card-text",{class:{"text--primary":!0,"text-right":t.isCartPage}},[r("div",{class:{"col-12 d-flex text-right":t.isCartPage,"text-left":!t.isCartPage}},[t.isCartPage?r("div",{staticClass:"col-6"},[t._v("Qty: "+t._s(t.quantity))]):t._e(),r("strong",{class:{"col-6":t.isCartPage}},[t._v("$"+t._s(t.isCartPage?t.product.price*t.quantity:t.product.price))])]),t.quantity>1?r("em",{staticClass:"col-12"},[t._v("($"+t._s(t.product.price)+" each)")]):t._e()])],1)],1)],1)},a=[],o=(r("7db0"),r("b0c0"),{name:"ProductItem",props:{product:{type:Object,default:Object,required:!0}},components:{},data:function(){var t="Cart"===this.$route.name||"CheckOut"===this.$route.name;return{isCartPage:t,width:t?"100":"auto",height:t?"100":"200"}},computed:{quantity:function(){var t=this;if(this.$store.state.cart.length>0){var e=this.$store.state.cart.find((function(e){return t.product.item_num===e.item_num}));if(e)return e.quantity}}},methods:{clickRemove:function(){this.$store.commit("removeItem",this.product.item_num)}}}),c=o,i=(r("b8e3"),r("2877")),s=r("6544"),u=r.n(s),l=r("8336"),d=r("b0af"),p=r("99d9"),f=r("62ad"),m=r("adda"),h=Object(i["a"])(c,n,a,!1,null,"072f65d4",null);e["a"]=h.exports;u()(h,{VBtn:l["a"],VCard:d["a"],VCardText:p["c"],VCardTitle:p["d"],VCol:f["a"],VImg:m["a"]})},b8e3:function(t,e,r){"use strict";var n=r("de2a"),a=r.n(n);a.a},de2a:function(t,e,r){}});
//# sourceMappingURL=app.b0c774a2.js.map
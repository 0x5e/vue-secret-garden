webpackJsonp([1],[,,,function(e,t,n){"use strict";var o=n(0),a=n(20),i=n(17),s=n.n(i);o.a.use(a.a),t.a=new a.a({routes:[{path:"/",name:"Paint",component:s.a}]})},function(e,t,n){n(10);var o=n(1)(n(6),n(18),null,null);e.exports=o.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(4),i=n.n(a),s=n(3);o.a.config.productionTip=!1,new o.a({el:"#app",router:s.a,template:"<App/>",components:{App:i.a}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(15),a=n.n(o),i=n(12);n.n(i);t.default={name:"paint",data:function(){var e=["#247ba0","#70c1b3","#b2dbbf","#f3ffbd","#ff1654"];return{msg:"Secret Garden",picked:e[0],options:e,phone:""}},mounted:function(){if(!CanvasRenderingContext2D.prototype.fillFlood)return void alert("CanvasRenderingContext2D.fillFlood() not supported");this.AVInit(),this.loadImage()},methods:{AVInit:function(){a.a.init({appId:"IjU4EYmuxCwdJcgI9gVamsSL-gzGzoHsz",appKey:"TiADKTyeuiBuAoeQTaKocPbq"})},loadImage:function(){var e=document.getElementById("canvas"),t=e.getContext("2d"),n=new Image;n.src="static/bg.jpeg",n.onload=function(){t.drawImage(n,0,0,e.width,e.height)}},select:function(e){this.picked=e.toElement.title,console.log("select: "+this.picked)},click:function(e){var t=e.offsetX,n=e.offsetY;console.log("click: "+[t,n]);var o=document.getElementById("canvas"),a=o.getContext("2d");a.fillStyle=this.picked,a.fillFlood(t,n,32)},submit:function(e){if(console.log(e),!this.phone)return void alert("请输入联系方式");var t=document.getElementById("canvas"),n=t.toDataURL("image/jpeg"),o={base64:n.split(",")[1]},i=new a.a.File("canvas.jpg",o);i.metaData("owner",this.phone);var s=e.toElement;s.disabled=!0,i.save({onprogress:function(e){"upload"!==e.direction&&console.log("progress: "+e.progress)}},{}).then(function(e){console.log(e.attributes),alert("上传成功！")},function(e){console.error(e),alert("上传失败！"),s.disabled=!1})}}}},,,function(e,t){},function(e,t){},,,,,,function(e,t,n){n(11);var o=n(1)(n(7),n(19),"data-v-591d5cfc",null);e.exports=o.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"paint"},[n("h1",[e._v(e._s(e.msg))]),e._v(" "),n("table",{attrs:{cellpadding:"20"}},e._l(e.options,function(t){return n("td",{style:{background:t},attrs:{rowspan:"5",valign:"top",title:t},on:{click:e.select}})})),e._v(" "),n("span",[n("a",[e._v("联系方式:")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"phone",placeholder:"手机号/邮箱"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),e._v(" "),n("button",{on:{click:e.submit}},[e._v("上传")])]),e._v(" "),n("p"),e._v(" "),n("canvas",{attrs:{id:"canvas",width:"800",height:"800"},on:{click:e.click}})])},staticRenderFns:[]}}],[5]);
//# sourceMappingURL=app.2d518e9f165d47692963.js.map
webpackJsonp([0],[,,,function(t,e,n){n(22);var a=n(0)(n(9),n(45),"data-v-7056dc75",null);t.exports=a.exports},,function(t,e,n){"use strict";var a=n(1),s=n(48),i=n(35),c=n.n(i),o=n(37),r=n.n(o),l=n(38),d=n.n(l),u=n(36),p=n.n(u),m=n(39),h=n.n(m),v=n(34),f=n.n(v);a.a.use(s.a),e.a=new s.a({routes:[{path:"/",redirect:"/main"},{path:"/main",name:"Main",component:c.a,meta:{title:"首页"}},{path:"/select",name:"Select",component:r.a,meta:{title:""}},{path:"/select_color",name:"SelectColor",component:d.a,meta:{title:"配色"}},{path:"/paint",name:"Paint",component:p.a,meta:{title:"填色"}},{path:"/submit",name:"Submit",component:h.a,meta:{title:"提交"}},{path:"/feedback",name:"Feedback",component:f.a,meta:{title:"反馈"}}]})},function(t,e,n){n(19);var a=n(0)(n(8),n(42),null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),s=n(6),i=n.n(s),c=n(5);a.a.config.productionTip=!1,new a.a({el:"#app",router:c.a,template:"<App/>",components:{App:i.a}}),c.a.beforeEach(function(t,e,n){document.title=t.meta.title||document.title,n()})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(2);n.n(a).a.init({appId:"IjU4EYmuxCwdJcgI9gVamsSL-gzGzoHsz",appKey:"TiADKTyeuiBuAoeQTaKocPbq"}),e.default={name:"app"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"color-picker",props:["colors","selection"],data:function(){return{index:0}},computed:{color:function(){return this.colors?this.colors[this.index]:""}},methods:{select:function(t){this.index=parseInt(t.toElement.title),console.log("select: "+this.color)}},watch:{hidden:function(t,e){}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"main",data:function(){return{list:[{name:"樱·猫咪",desc:"樱花树下橘猫清澈的眸子",color:"#EECA7D",imgs:["static/png/300dpi交错（优先试）/24X9.5cm猫叶.png","static/png/300dpi交错（优先试）/24X9.5cm线条猫.png"]},{name:"荷·锦鲤",desc:"立夏三日下荷塘与鱼嬉戏",color:"#85AE51",imgs:["static/png/300dpi交错（优先试）/24X9.5cm藕.png"]},{name:"葵·松鼠",desc:"黄昏向日葵看向松鼠尾巴",color:"#E87D5C",imgs:["static/png/300dpi交错（优先试）/24X9.5cm松鼠穿裤子.png"]},{name:"梅·天鹅",desc:"倒映天空黑天鹅细嗅红梅",color:"#3E4C55",imgs:["static/png/300dpi交错（优先试）/24X9.5cm天鹅.png"]}]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),s=n.n(a),i=n(30),c=n.n(i),o=n(25),r=(n.n(o),n(26)),l=n.n(r);e.default={name:"paint",data:function(){return{pickerHidden:!1,steps:[],stepIndex:0,offset:{x:0,y:0},translate:{x:0,y:0},scale:1,minScale:1,maxScale:1}},computed:{canvas:function(){return document.getElementById("canvas")},ctx:function(){return this.canvas.getContext("2d")},canvasStyle:function(){return{marginLeft:this.offset.x+"px",marginTop:this.offset.y+"px",transform:c()("translate(%dpx, %dpx) scale(%f, %f)",this.translate.x,this.translate.y,this.scale,this.scale)}}},beforeCreate:function(){this.$route.params.img||this.$router.replace("/")},mounted:function(){var t=this;if(!CanvasRenderingContext2D.prototype.fillFlood)return void alert("CanvasRenderingContext2D.fillFlood() not supported");this.loadImage(function(){console.log("canvas loaded"),t.canvas.hidden=!1,t.offset={x:(window.innerWidth-t.canvas.width)/2,y:(window.innerHeight-t.canvas.height)/2};var e=window.innerWidth/t.canvas.width,n=window.innerHeight/t.canvas.height;console.log("scale",e,n);var a=Math.min(e,n),s=Math.max(e,n);t.minScale=a,t.maxScale=4*s,t.scale=s,t.HammerInit()}),this.canvas.hidden=!0},methods:{loadImage:function(t){var e=this,n=new Image;n.onload=function(){e.canvas.width=n.width,e.canvas.height=n.height,e.ctx.drawImage(n,0,0,e.canvas.width,e.canvas.height),t&&t()},n.src=this.$route.params.img},HammerInit:function(){var t=this,e={},n=1,a=new l.a(this.canvas);a.get("pan").set({direction:l.a.DIRECTION_ALL}),a.on("panstart",function(n){e={x:t.translate.x,y:t.translate.y},console.log("panstart",e)}),a.on("panmove",function(n){t.translate={x:e.x+n.deltaX,y:e.y+n.deltaY}}),a.get("pinch").set({enable:!0}),a.on("pinchstart",function(e){n=t.scale*e.scale,console.log("pinchstart",n)}),a.on("pinch",function(e){t.scale=n*e.scale,t.scale=Math.min(t.scale,t.maxScale),t.scale=Math.max(t.minScale,t.scale)})},click:function(t){var e=t.offsetX,n=t.offsetY;console.log("click",{x:e,y:n});var a=this.ctx.getImageData(e,n,1,1).data;if(0===a[0]&&0===a[1]&&0===a[2]&&0!==a[3])return void console.log("skip the line");this.fill(e,n,this.$refs.picker.color),this.steps=this.steps.slice(0,this.stepIndex++),this.steps.push({x:e,y:n,color:this.$refs.picker.color})},fill:function(t,e,n){this.ctx.fillStyle=n,this.ctx.fillFlood(t,e,100)},backward:function(){var t=this;this.stepIndex<=0||(this.stepIndex--,this.loadImage(function(){for(var e=0;e<t.stepIndex&&e<t.steps.length;e++){var n=t.steps[e],a=n.x,s=n.y,i=n.color;t.fill(a,s,i)}}))},forward:function(){if(!(this.stepIndex>=this.steps.length)){var t=this.steps[this.stepIndex++],e=t.x,n=t.y,a=t.color;this.fill(e,n,a)}},next:function(){var t=this.$route.params;t.img=this.canvas.toDataURL("image/png"),t.steps=this.steps.slice(0,this.stepIndex),this.$router.push({name:"Submit",params:t})}},components:{ColorPicker:s.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"select",data:function(){return{}},beforeCreate:function(){this.$route.params.imgs||this.$router.replace("/")},mounted:function(){document.title=this.$route.params.name}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),s=n.n(a);e.default={name:"select_color",data:function(){return{list:[{desc:"少女的第一盘眼影",colors:["#6F0051","#971B40","#FAB3AF","#FCC584","#F0D6E3","#E2DEF0","#EF766D","#F2A6B3","#FECFBB","#FDE3B2","#E97585","#E95166"]},{desc:"凌晨六点窗沿有雾气",colors:["#C8D3F3","#F3F8ED","#DCECF2","#C1D9EA","#97B9D8","#A1C0EE","#42576A","#717D9B","#A7748A","#C1B6B0","#ECCE90","#E0D6A3"]},{desc:"小河边上浮萍初现",colors:["#8BB297","#8F8373","#D8907A","#C2D3A6","#D3E28D","#93D9F2","#1E8B88","#CAE37B","#8D9C1F","#6D7A66","#CED8D9","#B3C8BA"]}]}},beforeCreate:function(){this.$route.params.img||this.$router.replace("/")},components:{ColorPicker:s.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),s=n.n(a);e.default={name:"submit",data:function(){return{loading:!1}},computed:{phone:function(){return document.getElementById("phone").value},author:function(){return""}},beforeCreate:function(){this.$route.params.img||this.$router.replace("/")},methods:{submit:function(){var t=this;if(0===this.phone.length)return void alert("请输入联系方式");var e=this.$route.params.img.replace(/^data:image\/(png|jpg);base64,/,""),n={base64:e},a=new s.a.File("canvas.png",n);a.metaData("author",this.author),a.metaData("phone",this.phone),a.metaData("steps",this.$route.params.steps),this.loading=!0,a.save({onprogress:function(t){"upload"===t.direction&&console.log("progress: "+t.progress)}},{}).then(function(e){console.log(e),t.queryCounter(e)},function(e){t.loading=!1,console.error(e),alert("上传失败！")})},queryCounter:function(t){var e=this;new s.a.Query("_File").count().then(function(n){e.$router.push({path:"feedback",query:{objectId:t.id,count:n}})},function(t){e.loading=!1,console.log(t),alert(t)})}},watch:{}}},,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,,function(t,e,n){t.exports=n.p+"static/img/feedback_bg2.db5096a.svg"},function(t,e,n){t.exports=n.p+"static/img/submit.3804733.svg"},function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTIzLjQyIDI2LjE2Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZvbnQtc2l6ZToxMHB4O2ZpbGw6I2VmY2E3YTtmb250LWZhbWlseTpBZG9iZUhlaXRpU3RkLVJlZ3VsYXIsIEFkb2JlSGVpdGlTdGQgUmVndWxhcjtsZXR0ZXItc3BhY2luZzotMC4wNmVtO308L3N0eWxlPjwvZGVmcz48dGl0bGU+c3VibWl0X3RpcHM8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSLnu4RfMiIgZGF0YS1uYW1lPSLnu4QgMiI+PGcgaWQ9Iue7hF8zIiBkYXRhLW5hbWU9Iue7hCAzIj48ZyBpZD0i54K55Ye75Zu+54mH5Y+v6aKE6KeI5aSn5Zu+X+S/neWtmOiHs+ebuOWGjF/liIbkuqvliLDmnIvlj4vlnIjlk6YiIGRhdGEtbmFtZT0i54K55Ye75Zu+54mH5Y+v6aKE6KeI5aSn5Zu+77yMDeS/neWtmOiHs+ebuOWGjO+8jOWIhuS6q+WIsOaci+WPi+WciOWTpiI+PHRleHQgY2xhc3M9ImNscy0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDExLjI1KSI+54K55Ye75Zu+54mH5Y+v6aKE6KeI5aSn5Zu+77yMPHRzcGFuIHg9IjAiIHk9IjEyLjAxIj7kv53lrZjoh7Pnm7jlhozvvIzliIbkuqvliLDmnIvlj4vlnIjlk6Y8L3RzcGFuPjwvdGV4dD48L2c+PGcgaWQ9IuWbvuWxgl84X0ltYWdlIiBkYXRhLW5hbWU9IuWbvuWxgiA4wqBJbWFnZSI+PGltYWdlIGlkPSLlm77lsYJfOF9JbWFnZS0yIiBkYXRhLW5hbWU9IuWbvuWxgiA4wqBJbWFnZSIgd2lkdGg9IjE1MSIgaGVpZ2h0PSI0OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODcuMTgpIHNjYWxlKDAuMjQpIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUprQUFBQXlDQVlBQUFCUGgzbVhBQUFBQ1hCSVdYTUFBQzRqQUFBdUl3RjRwVDkyQUFBRlQwbEVRVlI0WHUyZDIyL1VWaERHSjRSRU5BZ3FGQllTUkFzVnQ5Qm5RcDZvUWk4cUt2U2hCZlVKQ2lMUUFsSUZxQUtrMERUN242Y3pPbU55MXJYOW5adlhmaGhMUHgxbC9jM2xrOWJlOWZIeGhnNE9EcWdQZUZ0a3ZtZmU2cmlJWXNhS2Vja0RDbExoYmNMOHkweDFuS0NZc1dKZThvQ0NWSGc3eCt5cEdSblBvWml4WWw3eWdJSlVlRnRuL2xFek1xNmptTEZpWHZLQWdsVDBpTmxYTS92ek9HTDZ3cnprQVFXcDhIYUNlYU5tWkR5QllzYUtlY2tETlhTTVdVSkpPdUsvWkg2UUVXazdjaXhKSDBpSE1DOHo4WFAxMHBYa0t2T0tlY1NjUm9uNlFPcHFmZW5qS3RKMzVERXZCWW4xMHBaa2dYbEM3cFFxdktRNVhPcldlcGhvM2FxSDM2VXZGTmVReDd3VUpNVkxXeUl4Yzl0TEpMd0lOY1RiVWVaemNsY3lYK2g0VWw1SHNaNlJGN1g2MnlqT3ZNRDRRYngwSlR6QzNLa2wvSTFhWm9oNU84NWNaKzR5ejVuMzVDNlI5M1NVdjUvcGZ0RWRiOG16cUhYOHVuZmE2b1pBNW1WUUw4alFVWm8xOUF2VjN2VzhMVE9iMnVnMGdtY2F0OXhRODFkUDl5TUZIbW5tWlp4ZXNNQzlnN2ZJbmFaUDFmYko2ZlpSUzdQNzVJNlVYUjMzVzNRU3YxN0xlNHBjUGFrTGo1UlF5THdJYy9jQ0JSMG1yekYvMXhxVHBwOHkyOHdHT2JNVEhUZjA5YWQwT09OY0lYbmdWVXBmbUpkK3ZVQkJpNUhMNUQ3TC9ZWWVhOE9kcDFCeXA5M3JxdmZqSmQ5bFZMczA1dVZUYkc5ZW9LQ2htVFdhUFZMa2RDdW4wS0NKT1MvUE1ZM3pUOWVTZHczRmxzSzhOT1lwN2dVS2FnM0lMSy8vVHBlbElqZFJITWg1a3c2WG5rdzFmL0pzZGlqbUJlWXM1Z1VLYW9YbHFzTi9oOTlHTVNIUTdOeVA1TjlFTWJtWUYwd3BMMURnRlZ4aC92Q0t5a3h2MGp1N0lYZjlTSlE2S3lndUZmTVNSaWt2VU9BVmxDK0YxZEh5a2JtR1ltSWc5K1cwdXJxUk9oc29KaFh6RWs0Skw3S2RZYjVqN2pFL2tadjVsYy9qWlUrMG9LOVBGYm5jTFhLMGVEV1dORzlWUStvdGVQdVh0YSs3MnVjOTdmdU1wekV2NC9SQ08xNENuNjFhb2VmZXZtM1VYQXJrNW11cUdsSnZ5ZHUzMWRMbmpxY3hMd0c5eFVMNVhtYnVxUHZjOGtSeUU3V2FmMGs2WllaQTd0UmNuZnFsM2tsdjN6Y3RmYjcwTk9ZbG9MZFlLTjhMWFNSMzcrcyt1WHRURDVodm1jODhrY3pCOUw0dW5QNi8vbnpOMjdlaWZUM1FQdTlyM3hjOGpYa0o2QzJXYkMrb2dDWTY3eFdSZTE2OUxKWWp0eGh1MXpOekhzWEVZbDdpeWZVQ0JWcGs4Q09tRk9ZbG5sd3ZVS0JGQnYvc0w0VjVpU2ZYQ3hSb2tjR3ZZa3BoWHVMSjlRSUZXbVR3K1poU21KYzRTbmlCQXEvWVBHZVdoVjVPL1ZyTHZBUlN3Z3NVZU1YcTk4Z2VVNkdqaGdyZEl3dkZ2SVJSeWdzVTFJck82MjcvRFJTVGkzbkJsUElDQmJXaVRldVdrcFovZURrM3FkQzZwUmpNQzh4WnpBc1VOQlR2ZXdYbVdSUmJDdlBTbUtlNEZ5aG9hZVFLTmE4bGx5K2hnNjBsVDhHOGZJcnR6UXNVZERUVjlsU01yQjdZSm5kVklqOVROTkd4ZWlwbWgyYXZWcVpVNkttWVZNeEx2MTZnQUJqcTVmbStJVEF2L1htQkFnUVZmbEo1U014TFAxNmdJQlNhL2MwRmFWUSt5MlZ5Y0UvSDkvcTZySjZVVTNUamJ5Nk1BZk9DODhZQUJhbVFPNUxrc2ZhSmpzV09qSGxqWHZLQWdsQzBlZmtGdjB2TVYrUVczVjN3dUtpdlgxSmQ3K1pTTVM4NGJ3eFFFSUlhK1puNVFPNFV2TnZCUjlYSkF3ZEprM3Q5WWw3S2U0R0NFSGhiWmQ0Ui9sTHBJL3BWbEh2ZW1KZnlYcUFnQkRyOFZ5cnlhOHB2QTNoRGMvcVhLN0dZbC9KZW9DQVVOU1JmSnMvcXVOcUF2Nytva1pLWUY1dzNCaWhJaGR4RERsK1R1M3lXTWVyaGd6RmhYdktBZ2xqSS9hYnBMWnE5Z3ovVnYrWDFJeWpIV0RBdlpZQ0NXTlRNdzVxUmlvZDltaW1OZVNrREZLUkE3aDhhL01tOFp2N1NVZjYrZ21MSGhubkpCd29NSTVmL0FDY20yTlRnNE1NNkFBQUFBRWxGVGtTdVFtQ0MiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+"},function(t,e,n){n(20);var a=n(0)(null,n(43),"data-v-55c4d291",null);t.exports=a.exports},function(t,e,n){n(24);var a=n(0)(n(10),n(47),"data-v-e6016676",null);t.exports=a.exports},function(t,e,n){n(21);var a=n(0)(n(11),n(44),"data-v-591d5cfc",null);t.exports=a.exports},function(t,e,n){n(17);var a=n(0)(n(12),n(40),"data-v-0ae9b588",null);t.exports=a.exports},function(t,e,n){n(23);var a=n(0)(n(13),n(46),"data-v-9c86292a",null);t.exports=a.exports},function(t,e,n){n(18);var a=n(0)(n(14),n(41),"data-v-1c585ab8",null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"select"},t._l(t.$route.params.imgs,function(e,a){return n("div",{key:a,staticClass:"item"},[n("div",{staticClass:"index",style:{background:t.$route.params.color}},[t._v(t._s(a+1))]),t._v(" "),n("router-link",{attrs:{to:{name:"SelectColor",params:{img:e,color:t.$route.params.color}}}},[n("img",{staticClass:"pic",style:{borderColor:t.$route.params.color},attrs:{src:e}})])],1)}))},staticRenderFns:[]}},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"submit"},[t.loading?a("div",{attrs:{id:"loading"}}):t._e(),t._v(" "),a("div",{staticClass:"title"},[t._v("您的佳作")]),t._v(" "),a("img",{staticClass:"pic",style:{borderColor:t.$route.params.color},attrs:{src:t.$route.params.img}}),t._v(" "),a("img",{attrs:{id:"tips",src:n(33)}}),t._v(" "),a("div",{attrs:{id:"tips2"}},[t._v("请留下您的联系方式，方便工作人员与您联系。")]),t._v(" "),a("input",{style:{borderColor:t.$route.params.color},attrs:{type:"number",id:"phone",placeholder:"手机号"}}),t._v(" "),a("img",{attrs:{id:"submit",src:n(32)},on:{click:t.submit}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)},staticRenderFns:[]}},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"feedback"},[a("div",{staticClass:"text-container"},[a("div",[t._v("您的马克杯正在孕育")]),t._v(" "),a("div",[t._v("它将成为"),a("span",{staticClass:"index"},[t._v("第"+t._s(Number(t.$route.query.count))+"位")]),t._v("马克宝宝")]),t._v(" "),a("div",[t._v("请在接收到手机短信之后")]),t._v(" "),a("div",[t._v("前往月牙楼525认领哦~")])]),t._v(" "),a("img",{staticClass:"bottom",attrs:{src:n(31)}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"paint"},[n("canvas",{style:t.canvasStyle,attrs:{id:"canvas"},on:{click:t.click}}),t._v(" "),n("div",{staticClass:"tool-bar"},[n("div",{attrs:{id:"back-btn"},on:{click:t.backward}}),t._v(" "),n("div",{attrs:{id:"done-btn"},on:{click:t.next}}),t._v(" "),n("div",{attrs:{id:"forward-btn"},on:{click:t.forward}})]),t._v(" "),t.pickerHidden?n("div",{staticClass:"picker-container",style:{backgroundColor:"transparent"}},[n("div",{attrs:{id:"fold-btn"},on:{click:function(e){t.pickerHidden=!t.pickerHidden}}})]):n("div",{staticClass:"picker-container"},[n("div",{attrs:{id:"unfold-btn"},on:{click:function(e){t.pickerHidden=!t.pickerHidden}}}),t._v(" "),n("color-picker",{ref:"picker",attrs:{colors:t.$route.params.colors,selection:"true"}})],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"color-picker"},t._l(t.colors,function(e,a){return n("div",{staticClass:"circle",class:{first:0==a,active:"true"===t.selection&&a===t.index},style:{background:e},attrs:{title:a},on:{click:t.select}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"select_color"},t._l(t.list,function(e,a){return n("div",{key:a,staticClass:"item"},[n("router-link",{attrs:{to:{name:"Paint",params:{img:t.$route.params.img,color:t.$route.params.color,colors:e.colors}}}},[n("color-picker",{attrs:{colors:e.colors}})],1),t._v(" "),n("div",{staticClass:"desc"},[t._v(t._s(e.desc))])],1)}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},t._l(t.list,function(e,a){return n("div",{key:a,staticClass:"item",style:{borderColor:e.color,color:e.color}},[n("div",{staticClass:"text"},[t._v(t._s(e.desc))]),t._v(" "),n("router-link",{attrs:{to:{name:"Select",params:e}}},[n("img",{staticClass:"pic",attrs:{src:e.imgs[0]}})])],1)}))},staticRenderFns:[]}}],[7]);
//# sourceMappingURL=app.c8425886ae735aff6b49.js.map
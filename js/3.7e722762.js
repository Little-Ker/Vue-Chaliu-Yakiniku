"use strict";(self["webpackChunkvue_stock_web"]=self["webpackChunkvue_stock_web"]||[]).push([[3],{3:function(e,s,a){a.r(s),a.d(s,{default:function(){return K}});var t=a(3396),o=a(7156);const i=e=>((0,t.dD)("data-v-80c34a6a"),e=e(),(0,t.Cn)(),e),r={class:"member-reserve"},m=i((()=>(0,t._)("h1",{class:"title"},"預約紀錄",-1))),d=i((()=>(0,t._)("p",{class:"txt main-white-aaa"},"- 目前僅提供前十筆紀錄。",-1))),l={class:"shop"},n={class:"name d-flex"},c={class:"main-white-aaa d-flex"},p={class:"fw-700 data d-flex"},h={class:"mr-2"},w=i((()=>(0,t._)("span",null,null,-1))),g={class:"d-flex time-block"},f={class:"mr-2 d-block"},u={class:"d-block"},b={class:"fw-700 data d-flex"},v=i((()=>(0,t._)("span",{class:"mr-2"},"訂位人數:",-1))),_={class:"fw-700 data d-flex"},k=i((()=>(0,t._)("span",{class:"mr-2"},"聯絡人:",-1))),x={class:"fw-700 data d-flex"},S=i((()=>(0,t._)("span",{class:"mr-2"},"手機號碼:",-1))),C={class:"recordTime align-self-end main-white-aaa fs-14"},O=["onClick"],N={key:1,class:"statusTxt fw-700"},D={class:"d-flex justify-content-center"},I={key:0,class:"noOrder"},z=i((()=>(0,t._)("p",{class:"icon-calendar text-align-center"},null,-1))),T=i((()=>(0,t._)("p",{class:"txt fw-700 text-align-center"},"目前無任何紀錄",-1))),W=[z,T];function R(e,s,a,i,z,T){return(0,t.wg)(),(0,t.iD)("div",r,[m,d,(0,t._)("div",{class:"d-flex mb-3",onClick:s[2]||(s[2]=(...e)=>T.goTop&&T.goTop(...e))},[(0,t._)("div",{class:(0,o.C_)([{active:z.isShowNowOrder},"choose"]),onClick:s[0]||(s[0]=e=>{z.isShowNowOrder=!0,T.getMemberReseveList()})},"即將用餐",2),(0,t._)("div",{class:(0,o.C_)([{active:!z.isShowNowOrder},"choose"]),onClick:s[1]||(s[1]=e=>{z.isShowNowOrder=!1,T.getMemberReseveList()})},"歷史紀錄",2)]),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(z.newMemberReseveData,((e,s)=>((0,t.wg)(),(0,t.iD)("div",{key:s,class:"order"},[(0,t._)("div",l,[(0,t._)("p",n,"茶六燒肉堂 - "+(0,o.zw)(e.shopName),1),(0,t._)("p",c,(0,o.zw)(T.shopAddress(e.shopName)),1)]),(0,t._)("div",p,[(0,t._)("p",h,[(0,t._)("span",{class:(0,o.C_)([{"main-brow-text":z.isShowNowOrder},"mr-1 icon-ok"])},null,2),w,(0,t.Uk)("預定時間:")]),(0,t._)("p",g,[(0,t._)("span",f,(0,o.zw)(e.date),1),(0,t._)("span",u,(0,o.zw)(e.time),1)])]),(0,t._)("p",b,[(0,t._)("span",{class:(0,o.C_)([{"main-brow-text":z.isShowNowOrder},"mr-1 icon-ok"])},null,2),v,(0,t._)("span",null,(0,o.zw)(e.people)+"人",1)]),(0,t._)("p",_,[(0,t._)("span",{class:(0,o.C_)([{"main-brow-text":z.isShowNowOrder},"mr-1 icon-ok"])},null,2),k,(0,t._)("span",null,(0,o.zw)(e.memberName),1)]),(0,t._)("p",x,[(0,t._)("span",{class:(0,o.C_)([{"main-brow-text":z.isShowNowOrder},"mr-1 icon-ok"])},null,2),S,(0,t._)("span",null,(0,o.zw)(e.cellphone),1)]),(0,t._)("div",{class:(0,o.C_)([[{orderStatus:!z.isShowNowOrder},{"mt-2":z.isShowNowOrder}],"d-flex justify-content-bewteen"])},[(0,t._)("p",C,"於 "+(0,o.zw)(e.bookDate)+" 預約",1),z.isShowNowOrder?((0,t.wg)(),(0,t.iD)("a",{key:0,class:"borderBtn",onClick:s=>T.clickCancelBtn(e.OID)},"取消預約",8,O)):(0,t.kq)("",!0),z.isShowNowOrder?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("p",N,(0,o.zw)(e.status),1))],2)])))),128)),(0,t._)("div",D,[z.newMemberReseveData.length>1?((0,t.wg)(),(0,t.iD)("div",{key:0,class:"goTop transition-0-3 icon-left-open",onClick:s[3]||(s[3]=(...e)=>T.goTopScroll&&T.goTopScroll(...e))})):(0,t.kq)("",!0)]),0===z.newMemberReseveData.length?((0,t.wg)(),(0,t.iD)("div",I,W)):(0,t.kq)("",!0)])}a(7658);var y=a(1991),L={data(){return{maxDataCount:10,isShowNowOrder:!0,memberReseveData:[],newMemberReseveData:[],shopPointData:y.R,isLoadingOver:!1}},computed:{memberId(){return this.$store.state.memberId},shopAddress(){const e=this;return function(s){let a="";return e.shopPointData.forEach((e=>{s===e.shopName&&(a=e.address)})),a}}},mounted(){this.getMemberReseveList()},methods:{clickCancelBtn(e){this.$store.dispatch("updateIsShowLoading",0);const s="/chaliu/UpdateOrderStatus";this.axios.post(s,{OID:e,newStatus:"已取消"}).then((e=>{this.$store.dispatch("updateIsShowLoading",1),this.isLoadingOver=!0,this.$store.dispatch("updateIsShowNotice",!0),this.$store.dispatch("updateNoticeText","取消預約成功"),this.getMemberReseveList()})).catch((function(e){console.log("error",e)}))},goTop(){$("html,body").scrollTop(0,0)},goTopScroll(){$("html,body").animate({scrollTop:0},"slow")},getMemberReseveList(){this.isLoadingOver||this.$store.dispatch("updateIsShowLoading",0);const e="/chaliu/QueryMemberOrderInfo2";this.axios.post(e,{MID:this.memberId}).then((e=>{this.$store.dispatch("updateIsShowLoading",3),this.isLoadingOver=!1,"success"===e.data.status?this.memberReseveData=e.data.result:this.memberReseveData=[],this.orders()})).catch((function(e){console.log("error",e)}))},orders(){const e=[];this.memberReseveData.forEach((s=>{this.isShowNowOrder&&"訂位中"===s.status&&e.push(s),this.isShowNowOrder||"訂位中"===s.status||e.push(s)})),this.isShowNowOrder&&e.sort(((e,s)=>e.date.localeCompare(s.date)||e.time.localeCompare(s.time))),this.isShowNowOrder||e.sort(((e,s)=>s.date.localeCompare(e.date)||s.time.localeCompare(e.time))),e.length>this.maxDataCount&&(e.length=this.maxDataCount),this.newMemberReseveData=e}}},M=a(89);const A=(0,M.Z)(L,[["render",R],["__scopeId","data-v-80c34a6a"]]);var K=A},1991:function(e){e.exports=JSON.parse('{"R":[{"id":0,"shopName":"台中中清店","address":"台中市北屯區中清路二段1037號","phone":"04-2425-1138","img":"./static/images/point/01.jpg","mapUrl":"https://goo.gl/maps/8EbkeXnRYWrXgHqGA","mapIframe":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.4690367316184!2d120.65891531494152!3d24.19034728437427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34691702e42a5169%3A0x460036a9f9dc10f7!2z6Iy25YWt54eS6IKJ5aCCKOS4rea4heW6lyk!5e0!3m2!1szh-TW!2stw!4v1644389873270!5m2!1szh-TW!2stw"},{"id":1,"shopName":"台中朝富店","address":"台中市西屯區朝富路258號","phone":"04-2258-7126","img":"./static/images/point/02.jpg","mapUrl":"https://goo.gl/maps/1UFa9DETffvibN5d9","mapIframe":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.2446789498863!2d120.63302601494105!3d24.16315028438757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693df1c46ae6e1%3A0xc1644740de8180d!2z6Iy25YWt54eS6IKJ5aCCKOacneWvjOW6lyk!5e0!3m2!1szh-TW!2stw!4v1644393145354!5m2!1szh-TW!2stw"},{"id":2,"shopName":"台中公益店","address":"台中市西區公益路268號","phone":"04-2328-1167","img":"./static/images/point/03.jpg","mapUrl":"https://goo.gl/maps/L8Bn64HWePWfRt2u8","mapIframe":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.5905257819572!2d120.65218801494088!3d24.15101428439345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693dd8423caa27%3A0x8641159ba314f374!2z6Iy25YWt54eS6IKJ5aCC5YWs55uK5bqX!5e0!3m2!1szh-TW!2stw!4v1644393211214!5m2!1szh-TW!2stw"},{"id":3,"shopName":"高雄博愛店","address":"高雄市左營區博愛二路238號","phone":"07-5566657","img":"./static/images/point/04.jpg","mapUrl":"https://goo.gl/maps/AwCfzMePdKwmQmsa9","mapIframe":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.807993328034!2d120.30115371491242!3d22.660946385137358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e05022a8011d5%3A0xa563d2828127f1c2!2z6Iy25YWt!5e0!3m2!1szh-TW!2stw!4v1644393260072!5m2!1szh-TW!2stw"}]}')}}]);
//# sourceMappingURL=3.7e722762.js.map
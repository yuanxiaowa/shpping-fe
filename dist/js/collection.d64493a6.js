(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["collection"],{1399:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",[a("el-form-item",{attrs:{label:"平台"}},[a("el-radio-group",{model:{value:t.platform,callback:function(e){t.platform=e},expression:"platform"}},[a("el-radio",{attrs:{label:"taobao"}},[t._v("淘宝")]),a("el-radio",{attrs:{label:"jingdong"}},[t._v("京东")])],1)],1),a("el-form-item",{attrs:{label:"类型"}},[a("el-radio-group",{model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[a("el-radio",{attrs:{label:"store"}},[t._v("店铺")]),a("el-radio",{attrs:{label:"goods"}},[t._v("商品")])],1)],1),a("el-form-item",[a("el-button",{on:{click:t.onClick}},[t._v("获取")])],1)],1),a("el-button",{attrs:{type:"error",disabled:0===t.multipleSelection.length},on:{click:function(e){return t.del(t.multipleSelection)}}},[t._v("删除选中")]),a("el-table",{ref:"tb",attrs:{data:t.tableData},on:{"selection-change":function(e){t.multipleSelection=e}}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:"名称"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("a",{attrs:{href:l.url,target:"_blank"}},[t._v(t._s(l.title))])]}}])})],1),a("div",[a("el-button",{attrs:{disabled:t.page<=1},on:{click:function(e){return t.go(-1)}}},[t._v("上一页")]),t.more?a("el-button",{on:{click:function(e){return t.go(1)}}},[t._v("下一页")]):t._e()],1)],1)},n=[],o=(a("96cf"),a("3b8d")),r=a("d225"),i=a("b0b4"),c=a("308d"),s=a("6bb5"),u=a("4e2b"),b=a("9ab4"),p=a("60a3"),f=a("7f5d"),m=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.platform="taobao",t.type="store",t.page=1,t.tableData=[],t.more=!1,t.multipleSelection=[],t}return Object(u["a"])(e,t),Object(i["a"])(e,[{key:"onClick",value:function(){this.page=1,this.getList()}},{key:"del",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(f["n"])({type:this.type,items:e},this.platform);case 2:this.getList();case 3:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"getList",value:function(){var t=this;this.tableData=[],Object(f["o"])({platform:this.platform,type:this.type,page:this.page}).then(function(e){var a=e.more,l=e.items;t.tableData=l,t.more=a,t.$nextTick(function(){t.$refs.tb.toggleAllSelection()})})}},{key:"go",value:function(t){this.page+=t,this.getList()}}]),e}(p["c"]);m=b["a"]([Object(p["a"])({components:{}})],m);var d=m,h=d,v=a("2877"),g=Object(v["a"])(h,l,n,!1,null,null,null);e["default"]=g.exports}}]);
//# sourceMappingURL=collection.d64493a6.js.map
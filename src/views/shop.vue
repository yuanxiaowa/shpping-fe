<!--
 * @Author: oudingyin
 * @Date: 2019-07-01 09:12:05
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-26 14:30:11
 -->
<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="状态" name="0">
        <el-row>
          <el-col :span="12">
            <status-comp />
          </el-col>
          <el-col :span="12">
            <config></config>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="领券下单" name="1">
        <buy></buy>
      </el-collapse-item>
      <el-collapse-item title="购物车" name="2">
        <cart></cart>
      </el-collapse-item>
      <el-collapse-item title="搜索" name="3">
        <search></search>
      </el-collapse-item>
      <el-collapse-item title="秒杀列表" name="4">
        <seckill-list></seckill-list>
      </el-collapse-item>
      <el-collapse-item title="评论" name="5">
        <comment></comment>
      </el-collapse-item>
      <el-collapse-item title="京东优惠券" name="6">
        <jingdong-coupon></jingdong-coupon>
      </el-collapse-item>
      <el-collapse-item title="天猫60s课堂" name="7">
        <sixty-course></sixty-course>
      </el-collapse-item>
    </el-collapse>
    <div>
      <el-input v-model="filename"></el-input>
      <el-button @click="evalFile">执行文件</el-button>
    </div>
    <div>
      <el-input v-model="code" type="textarea"></el-input>
      <el-button @click="evalCode">运行代码</el-button>
    </div>
  </div>
</template>
<route-meta>
{
  "title": "购物"
}
</route-meta>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartTable from "../components/CartTable.vue";
import Comment from "../components/Comment.vue";
import SixtyCourse from "../components/SixtyCourse.vue";
import Buy from "../components/Buy.vue";
import Cart from "../components/Cart.vue";
import JingdongCoupon from "../components/JingdongCoupon.vue";
import StatusComp from "../components/StatusComp.vue";
import Search from "../components/Search.vue";
import SeckillList from "../components/SeckillList.vue";
import Config from "../components/Config.vue";
import { Platform } from "../handlers";
import {
  resolveUrls,
  buyDirect,
  qiangquan,
  coudan,
  cartList,
  cartToggle,
  cartBuy
} from "../api";

@Component({
  components: {
    CartTable,
    Comment,
    Buy,
    Cart,
    SixtyCourse,
    StatusComp,
    JingdongCoupon,
    Config,
    Search,
    SeckillList
  }
})
export default class HomePage extends Vue {
  filename = "../taobao/index.js";
  code = "";
  activeNames = ["2"];

  evalFile() {
    // @ts-ignore
    evalFile(this.filename, true);
  }

  evalCode() {
    // @ts-ignore
    evalFunction(this.code);
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

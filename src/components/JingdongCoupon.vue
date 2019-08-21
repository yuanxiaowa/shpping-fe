<template>
  <div>
    <el-button @click="getCouponList">优惠券列表</el-button>
    <el-button>领取京豆兑换优惠券</el-button>
    <ul>
      <li
        v-for="item of items"
        :key="item.batchId"
      >满{{item.quota}}减{{item.discount}}
        <el-button @click="getCoupon(item)">领取</el-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getPlusQuanpinList, getPlusQuanpin } from "../api";
@Component
export default class JingdongCoupon extends Vue {
  items = [];
  getCouponList() {
    getPlusQuanpinList().then(item => {
      this.items = item;
      this.$notify.success("列表获取成功");
    });
  }

  getCoupon(data) {
    getPlusQuanpin(data).then(({ resultCode }) => {
      if (resultCode === "1000") {
        this.$notify.success("领取成功");
      } else {
        this.$notify.error("领取失败");
      }
    });
  }
}
</script>

<style>
</style>

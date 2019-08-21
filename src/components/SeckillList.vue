<!--
 * @Author: oudingyin
 * @Date: 2019-08-21 17:44:34
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-21 18:35:11
 -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-radio-group v-model="platform">
          <el-radio label="taobao">淘宝</el-radio>
          <el-radio label="jingdong">京东</el-radio>
        </el-radio-group>
        <el-button style="margin-left:2em" type="primary" @click="pullData()">拉取</el-button>
      </el-form-item>
      <el-form-item>
        <el-input title="url" v-model="url" />
      </el-form-item>
    </el-form>
    <el-table :data="list" row-key="time">
      <el-table-column prop="time" width="200"></el-table-column>
      <el-table-column>
        <template slot-scope="{row}">
          <div v-for="item of row.items" :key="item.id">
            <a :href="item.url" target="_blank">{{item.title}}</a>
            <i style="text-decoration:">￥{{item.price}}</i>
            <el-tag type="danger" size="small">￥{{item.seckillPrice}}</el-tag>
            数量：{{item.quantity}}
            <el-button type="danger" @click="seckill(item)">秒杀</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DatePicker from "./DatePicker.vue";
import { getSeckillList } from "../api";
import bus from "../bus";

@Component({
  components: {
    DatePicker
  }
})
export default class SeckillList extends Vue {
  platform = "taobao";
  list = [];
  url =
    "https://pages.tmall.com/wow/heihe/act/0820try?wh_biz=tm&ali_trackid=&ttid=700407%40taobao_android_8.8.0&e=sAsX_E3tJPiE5IjwFinSo3L6giCjJea-weShZufnUyzEva656Um3Ys7jbpc07vXg_piy-bl83AJfnG9gZa3lEIRqxKSGsgCT8sviUM61dt2gxEj7ajbEb4gLMZYNRhg2HXKHH0u77i-I6M_vqqSeLITsM14S2xgD1l7GcW5FttZw2qH-L52L1aTWVSTo88aB5YQ_egZY-KdaQJhxUPUeEtKYMBXg69krrlYyo_QbwE_DG_1N5hlzNg&type=2&tk_cps_param=127911237&tkFlag=0&tk_cps_ut=2&sourceType=other&suid=97d48507-afd2-4516-aa0a-69ca4f3deafe&ut_sk=1.XK%2BQ06Gx8KwDAHyGAUJXIrJu_21646297_1566366482399.Copy.ushare1103&un=04ec1ab5583d2c369eedd86203cf18d8&share_crt_v=1&sp_tk=77+ldGxJUFk5VFdLM2Hvv6U=&ali_trackid=2:mm_130931909_605300319_109124700033:1566374448_118_919207070";
  pullData() {
    getSeckillList({
      platform: this.platform,
      url: this.url
    }).then(data => {
      this.list = data;
    });
  }
  seckill(item) {
    bus.$emit("qiangdan", {
      text: item.url,
      quantity: 1,
      expectedPrice: +item.seckillPrice,
      forcePrice: true,
      platform: this.platform,
      t: item.time,
      from_pc: true
    });
  }
}
</script>

<style>
</style>
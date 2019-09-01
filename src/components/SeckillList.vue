<!--
 * @Author: oudingyin
 * @Date: 2019-08-21 17:44:34
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-22 11:53:40
 -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-radio-group v-model="platform">
          <el-radio label="taobao">淘宝</el-radio>
          <el-radio label="jingdong">京东</el-radio>
        </el-radio-group>
        <el-button
          style="margin-left:2em"
          type="primary"
          @click="pullData()"
        >拉取</el-button>
      </el-form-item>
      <el-form-item>
        <el-input
          title="url"
          v-model="url"
        />
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      row-key="time"
    >
      <el-table-column
        prop="time"
        width="200"
      ></el-table-column>
      <el-table-column>
        <template slot-scope="{row}">
          <el-checkbox
            v-model="row.checked"
            @change="selectGroupAll(row,$event)"
          >全选</el-checkbox>
          <el-button @click="seckill(row.items)">秒杀</el-button>
          <div
            v-for="item of row.items"
            :key="item.id"
          >
            <el-checkbox v-model="item.checked"></el-checkbox>
            <a
              :href="item.url"
              target="_blank"
            >{{item.title}}</a>
            <i style="text-decoration:">￥{{item.price}}</i>
            <el-tag
              type="danger"
              size="small"
            >￥{{item.seckillPrice}}</el-tag>
            数量：{{item.quantity}}
            <el-button @click="seckill([item])">秒杀</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import DatePicker from "./DatePicker.vue";
import { getSeckillList, buyDirect } from "../api";
import bus from "../bus";
import { storage } from "../decorators";

@Component({
  components: {
    DatePicker
  }
})
export default class SeckillList extends Vue {
  platform = "taobao";
  list = [];
  // @storage("seckill-url")
  url = localStorage.getItem("seckill-url");
  @Watch("url")
  onUrlChange(url: string) {
    localStorage.setItem("seckill-url", url);
  }
  pullData() {
    getSeckillList({
      platform: this.platform,
      url: this.url
    }).then(data => {
      data.forEach(group => {
        group.checked = false;
        group.items.forEach(item => {
          item.checked = false;
        });
      });
      this.list = data;
    });
  }
  seckill(items) {
    items.forEach(item => {
      if (!item.checked) {
        return;
      }
      buyDirect(
        {
          url: item.url,
          quantity: 1,
          expectedPrice: +item.seckillPrice,
          forcePrice: true,
          from_pc: true,
          other: {}
        },
        item.time,
        this.platform
      );
    });
  }

  selectGroupAll(item, checked) {
    item.items.forEach(item => {
      item.checked = checked;
    });
  }
}
</script>

<style>
</style>
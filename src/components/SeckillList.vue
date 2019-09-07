<!--
 * @Author: oudingyin
 * @Date: 2019-08-21 17:44:34
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-09-03 09:54:48
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
        <suggestion-input
          title="url"
          v-model="url"
          id="seckill-list"
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
          <el-button @click="seckill(row.items,true)">秒杀</el-button>
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
import SuggestionInput from "./SuggestionInput.vue";

import { getSeckillList, buyDirect } from "../api";
import bus from "../bus";
import { storage } from "../decorators";
import { setTimeout } from "timers";
import { sendMsg } from "../msg";

@Component({
  components: {
    DatePicker,
    SuggestionInput
  }
})
export default class SeckillList extends Vue {
  platform = "taobao";
  list = [];
  url = "";
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
  seckill(items, isChecked = false) {
    items.forEach(item => {
      if (isChecked) {
        if (!item.checked) {
          return;
        }
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

  mounted() {
    bus.$on("seckill", () => {
      getSeckillList({
        platform: this.platform,
        url: this.url
      }).then(([{ items, time }]) => {
        var t = new Date(time).getTime();
        items = items.sort((a, b) => a.quantity - b.quantity);
        setTimeout(() => {
          bus.$emit("sys-time");
          setTimeout(() => {
            this.seckill(items);
          }, 1000 * 60);
        }, t - 8 * 1000 * 60 - Date.now());
        sendMsg(time + "开始秒杀");
      });
    });
  }
  beforeDestroy() {
    bus.$off("seckill");
  }
}
</script>

<style>
</style>
<!--
 * @Author: oudingyin
 * @Date: 2019-07-17 14:14:39
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-07-17 14:14:39
 -->
<template>
  <div>
    <el-radio-group v-model="platform">
      <el-radio label="taobao">淘宝</el-radio>
      <el-radio label="jingdong">京东</el-radio>
    </el-radio-group>
    <el-button @click="checkStatus">获取状态</el-button>
    <el-button @click="sysTime">同步时间</el-button>
    <el-button @click="show_task=true">任务列表</el-button>
    <task v-model="show_task"></task>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { checkStatus, sysTime } from "../api";
import { sendMsg } from "../msg";
import bus from "../bus";
import Task from "./Task.vue";

@Component({
  components: {
    Task
  }
})
export default class Status extends Vue {
  platform = "taobao";
  status_text = "";
  show_task = false;
  checkStatus() {
    checkStatus("taobao").then(url => {
      if (!url) {
        this.$notify.success("状态正常");
        sendMsg("登录状态正常");
      } else {
        sendMsg(url);
        // @ts-ignore
        this.$msgbox(<img src={url} />);
      }
    });
  }
  sysTime() {
    sysTime(this.platform);
  }
  mounted() {
    bus.$on("check-status", this.checkStatus);
  }
}
</script>

<style>
</style>

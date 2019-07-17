<template>
  <div>
    <el-button @click="checkStatus">获取状态</el-button>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { checkStatus } from "../api";
import { sendMsg } from "../msg";
import bus from "../bus";

@Component
export default class Status extends Vue {
  status_text = "";
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
  mounted() {
    bus.$on("check-status", this.checkStatus);
  }
}
</script>

<style>
</style>

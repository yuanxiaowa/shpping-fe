<template>
  <div>
    <el-checkbox
      v-model="config.isSubmitOrder"
      @input="setConfig"
      label="自动提交订单"
    ></el-checkbox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getConfig, setConfig } from "../api";

@Component
export default class Config extends Vue {
  config = {};
  mounted() {
    getConfig().then(c => {
      this.config = c;
    });
  }

  setConfig() {
    setConfig(this.config);
  }
}
</script>

<style>
</style>

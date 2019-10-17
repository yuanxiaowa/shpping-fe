<template>
  <el-form size="small">
    <el-form-item>
      <el-button @click="drawer=true">配置</el-button>
      <el-button @click="show_task=true">任务列表</el-button>
    </el-form-item>

    <el-drawer title="配置" :visible.sync="drawer" direction="ltr">
      <el-form-item>
        <el-input-number v-model="port" @change="onPortChange" :min="80" :max="35000" label="端口号"></el-input-number>
      </el-form-item>
      <el-checkbox v-model="config.isSubmitOrder" @input="setConfig" label="自动提交订单"></el-checkbox>
    </el-drawer>

    <task v-model="show_task"></task>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getConfig, setConfig } from "../api";
import bus from "../bus";
import Task from "./Task.vue";

@Component({
  components: {
    Task
  }
})
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

  drawer = false;
  port = Number(localStorage.getItem("server-port")) || 7001;
  onPortChange() {
    bus.$emit("change-port", this.port);
  }
  show_task = false;
}
</script>

<style>
</style>

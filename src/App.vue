<!--
 * @Author: oudingyin
 * @Date: 2019-07-01 09:12:05
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-21 17:53:09
 -->
<template>
  <div class="page-component__scroll">
    <config />
    <router-view />
    <el-backtop target=".page-component__scroll"></el-backtop>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import bus from "./bus";
import Config from "./components/Config.vue";

@Component({
  components: {
    Config
  }
})
export default class App extends Vue {}
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

<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        title="领券下单"
        name="1"
      >
        <buy></buy>
      </el-collapse-item>
      <el-collapse-item
        title="购物车"
        name="2"
      >
        <cart></cart>
      </el-collapse-item>
      <el-collapse-item
        title="评论"
        name="3"
      >
        <comment></comment>
      </el-collapse-item>
      <el-collapse-item
        title="天猫60s课堂"
        name="4"
      >
        <sixty-course></sixty-course>
      </el-collapse-item>
    </el-collapse>
    <div>
      <el-input v-model="filename"></el-input>
      <el-button @click="evalFile">执行文件</el-button>
    </div>
    <div>
      <el-input
        v-model="code"
        type="textarea"
      ></el-input>
      <el-button @click="evalCode">运行代码</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartTable from "./components/CartTable.vue";
import Comment from "./components/Comment.vue";
import SixtyCourse from "./components/SixtyCourse.vue";
import Buy from "./components/Buy.vue";
import Cart from "./components/Cart.vue";
import { Platform } from "./handlers";
import {
  resolveUrls,
  buyDirect,
  qiangquan,
  coudan,
  cartList,
  cartToggle,
  cartBuy
} from "./api";

@Component({
  components: {
    CartTable,
    Comment,
    Buy,
    Cart,
    SixtyCourse
  }
})
export default class App extends Vue {
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

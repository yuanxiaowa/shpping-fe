<template>
  <el-dialog :visible="value" @update:visible="$emit('input',$event)">
    <div>{{title}}</div>
    <el-cascader
      v-model="data"
      :options="options"
      filterable
      :props="{ expandTrigger: 'hover' }"
      @change="onChange"
    ></el-cascader>
    <el-button v-if="data.length>0" @click="onChange(data)">确定</el-button>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { goodsDetail } from "../api";

@Component({
  components: {}
})
export default class SkuPicker extends Vue {
  @Prop() url!: string;
  @Prop(Boolean) value!: boolean;

  title = "";
  data = [];

  options = [];

  @Watch("url")
  onUrlChange(url: string) {
    this.title = "";
    this.data = [];
    if (url) {
      this.fetchData();
    }
  }

  onChange(arr: string[]) {
    this.$emit("change", arr[arr.length - 1]);
  }

  async fetchData() {
    var { skus, title } = await goodsDetail({
      url: this.url,
      platform: "taobao"
    });
    this.title = title;
    this.options = (skus && skus.children) || [];
  }
}
</script>

<style lang="scss">
</style>
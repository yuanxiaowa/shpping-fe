<!--
 * @Author: oudingyin
 * @Date: 2019-07-15 08:54:29
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-31 15:25:15
 -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-col :span="8">
          <el-radio-group v-model="platform">
            <el-radio label="taobao">淘宝</el-radio>
            <el-radio label="jingdong">京东</el-radio>
          </el-radio-group>
          <el-button style="margin-left:2em" type="primary" @click="pullCartData()">拉取</el-button>
        </el-col>
        <el-col :span="8" label="日期">
          <date-picker v-model="datetime"></date-picker>
        </el-col>
        <el-col :span="8">
          <el-form-item label="pc购买">
            <el-checkbox v-model="from_pc"></el-checkbox>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item label="存在失效商品不提交">
            <el-checkbox v-model="noinvalid"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="期望价格">
            <el-input v-model="expectedPrice" :disabled="!forcePrice">
              <el-checkbox v-model="forcePrice" slot="prepend"></el-checkbox>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" :disabled="checkedLength===0" @click="submit">提交订单</el-button>
      </el-form-item>
    </el-form>
    <cart-table
      :value="tableData"
      @select-item="selectItem"
      @select-vendor="selectVendor"
      @select-all="selectAll"
      @update-quantity="updateQuantity"
      @del-item="delItem"
    ></cart-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartTable from "./CartTable.vue";
import DatePicker from "./DatePicker.vue";
import { Platform } from "../handlers";
import {
  cartList,
  cartToggle,
  cartBuy,
  cartUpdateQuantity,
  cartDel,
  cartToggleAll
} from "../api";
import bus from "../bus";

@Component({
  components: {
    CartTable,
    DatePicker
  }
})
export default class App extends Vue {
  platform: Platform = "taobao";
  datetime = "";
  tableData: any[] = [];
  other!: any;
  from_pc = false;
  noinvalid = false;
  expectedPrice = 0;
  forcePrice = false;

  async pullCartData(data: any) {
    if (!data) {
      data = await cartList(this.platform, this.from_pc);
    }
    this.tableData = data.items;
    this.other = data.other;
  }

  async delItem(item, parent) {
    await cartDel(
      {
        items: [item],
        ...this.other
      },
      this.platform
    );
    if (parent.items.length === 1) {
      let i = this.tableData.indexOf(parent);
      this.tableData.splice(i, 1);
      return;
    }
    let i = parent.items.indexOf(item);
    parent.items.splice(i, 1);
  }

  async updateQuantity(item) {
    await cartUpdateQuantity(
      {
        items: [item],
        ...this.other
      },
      this.platform
    );
  }

  async updateChecked(items, checked) {
    if (this.platform === "taobao") {
      return;
    }
    await cartToggle(
      {
        items,
        ...this.other,
        checked
      },
      this.platform
    );
  }
  async selectItem(item: any) {
    return this.updateChecked([item], item.checked);
  }

  selectVendor({ items, checked }) {
    items.forEach(item => {
      item.checked = checked;
    });
    return this.updateChecked(items, checked);
  }
  selectAll(checked: boolean) {
    this.tableData.forEach(parent => {
      parent.checked = checked;
      parent.items.forEach(item => {
        item.checked = checked;
      });
    });
    bus.$emit("unselect-all");
  }

  get checkedLength() {
    return this.tableData.reduce(
      (sum, item) =>
        sum +
        item.items.reduce(
          (state: number, item: any) => state + Number(item.checked),
          0
        ),
      0
    );
  }
  submit() {
    var items: any[] = [];
    if (this.platform === "taobao") {
      this.tableData.forEach(item => {
        item.items.forEach((subitem: any) => {
          if (subitem.checked) {
            items.push(subitem);
          }
        });
      });
    }
    var data: any = { items, from_pc: this.from_pc, noinvalid: this.noinvalid };
    if (this.forcePrice) {
      data.expectedPrice = this.expectedPrice;
    }
    cartBuy(data, this.datetime, this.platform);
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

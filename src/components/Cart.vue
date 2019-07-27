<template>
  <div>
    <el-form>
      <el-form-item>
        <el-col :span="8">
          <el-radio-group v-model="platform">
            <el-radio label="taobao">淘宝</el-radio>
            <el-radio label="jingdong">京东</el-radio>
          </el-radio-group>
          <el-button
            style="margin-left:2em"
            type="primary"
            @click="pullCartData()"
          >拉取</el-button>
        </el-col>
        <el-col
          :span="8"
          label="日期"
        >
          <date-picker v-model="datetime"></date-picker>
          <el-button
            type="danger"
            :disabled="checkedLength===0"
            @click="submit"
          >提交订单</el-button>
        </el-col>
        <el-col :span="8">
          <el-form-item label="pc购买">
            <el-checkbox v-model="from_pc"></el-checkbox>
          </el-form-item>
        </el-col>
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
    return cartToggleAll(
      {
        ...this.other,
        checked
      },
      this.platform
    );
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
    cartBuy({ items, from_pc: this.from_pc }, this.datetime, this.platform);
  }

  mounted() {
    bus.$on("unselect-all", () => this.selectAll(false));
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

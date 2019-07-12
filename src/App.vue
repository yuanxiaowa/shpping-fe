<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="领券下单" name="1">
        <el-form>
          <el-form-item label="平台">
            <el-radio-group v-model="platform">
              <el-radio label="auto">自动选择</el-radio>
              <el-radio label="taobao">淘宝</el-radio>
              <el-radio label="jingdong">京东</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文本">
            <el-input type="textarea" v-model="text"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数量">
                <el-input-number v-model="num"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期">
                <el-date-picker type="datetime" v-model="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="qiangdan">抢单</el-button>
            <el-button type="warning" @click="qiangquan">抢券</el-button>
            <el-button type="danger" @click="coudan">凑单</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="购物车" name="2">
        <el-form>
          <el-form-item>
            <el-radio-group v-model="platform2">
              <el-radio label="taobao">淘宝</el-radio>
              <el-radio label="jingdong">京东</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pullCartData()">拉取</el-button>
            <el-form-item label="日期">
              <el-date-picker type="datetime" v-model="datetime2" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-button type="danger" :disabled="checkedLength===0" @click="submit">提交订单</el-button>
          </el-form-item>
        </el-form>
        <cart-table :value="tableData" @update-checked="updateChecked"></cart-table>
      </el-collapse-item>
    </el-collapse>
    <div>
      <el-input v-model="filename"></el-input>
      <el-button @click="evalFile">执行文件</el-button>
    </div>
    <div>
      <el-input v-model="code" type="textarea"></el-input>
      <el-button @click="evalCode">运行代码</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartTable from "./components/CartTable.vue";
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
    CartTable
  }
})
export default class App extends Vue {
  /* text = `领券21点拍2份 预计5元
迪彩舒爽嫩肤香薰沐浴露
￥XguhYgbyPC2￥`; */
  // text = 'https://u.jd.com/xCgA3q';
  text = ``;
  datetime = "";
  activeNames = ["2"];
  num = 1;
  filename = "../taobao/index.js";
  code = "";
  platform: "auto" | Platform = "auto";
  async getUrls() {
    if (!this.text) {
      return [];
    }
    var urls = await resolveUrls(
      {
        text: this.text
      },
      this.realPlatform
    );
    console.log(urls);
    return urls;
  }

  async qiangdan() {
    var urls = await this.getUrls();
    urls.forEach(url =>
      buyDirect(
        {
          url,
          quantity: this.num
        },
        this.datetime,
        this.realPlatform
      )
    );
  }

  async qiangquan() {
    var urls = await this.getUrls();
    urls.forEach(url => qiangquan({ data: url }, this.realPlatform));
  }

  async coudan() {
    // var urls = await this.getUrls();
    return coudan({ data: [this.text] }, this.realPlatform);
  }

  get realPlatform() {
    if (this.platform === "auto") {
      if (/\.jd\.com\//.test(this.text)) {
        return "jingdong";
      }
      return "taobao";
    }
    return this.platform;
  }

  platform2: Platform = "taobao";
  datetime2 = "";
  tableData: any[] = [];
  root!: any;
  async pullCartData(data: any) {
    if (!data) {
      data = await cartList(this.realPlatform);
    }
    var items: any = [];
    if (this.platform2 === "taobao") {
      items = data;
    } else {
      this.root = {
        areaId: data.areaId,
        traceId: data.traceId
      };
      items = data.cart.venderCart.map((item: any) => {
        var vendor: any = {
          id: item.popInfo.vid,
          title: item.popInfo.vname,
          items: []
        };
        item.sortedItems.forEach(({ polyItem, itemId, polyType }: any) => {
          polyItem.products.forEach((product: any) => {
            var sku = product.mainSku;
            return vendor.items.push({
              id: sku.id,
              itemId: itemId,
              title: sku.name,
              cid: sku.cid,
              img: "//img10.360buyimg.com/cms/s80x80_" + sku.image,
              url: `https://item.jd.com/${sku.id}.html`,
              price: product.price / 100,
              amount: product.num,
              polyType,
              checked: product.checkType === "1"
            });
          });
        });
        return vendor;
      });
    }
    this.tableData = items;
  }
  async updateChecked(item: any) {
    if (this.platform2 === "taobao") {
      return;
    }
    var data = Object.assign(
      {
        items: []
      },
      this.root
    );
    data.items.push([
      item.id,
      item.polyType === "1" ? "" : item.itemId,
      item.polyType
    ]);
    var r = await cartToggle(
      {
        items: data,
        checked: item.checked
      },
      this.realPlatform
    );
    if (r.errId === "0") {
      this.pullCartData(r);
    } else {
      console.log(r, data.items);
    }
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
    if (this.platform2 === "taobao") {
      this.tableData.forEach(item => {
        item.items.forEach((subitem: any) => {
          if (subitem.checked) {
            items.push(subitem);
          }
        });
      });
    }
    cartBuy({ data: items }, this.datetime2, this.platform2);
  }

  evalFile() {
    evalFile(this.filename, true);
  }

  evalCode() {
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

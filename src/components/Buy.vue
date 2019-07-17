<template>
  <el-form label-width="80px">
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
    <el-form-item>
      <el-col :span="8">
        <el-form-item label="数量">
          <el-input-number v-model="num"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="日期">
          <date-picker v-model="datetime"></date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="规格">
          <el-input v-model="skus"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="memo"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="execAction(qiangdan)">抢单</el-button>
      <el-button type="warning" @click="execAction(handleCoupon)">抢券</el-button>
      <el-button @click="execAction(addCart)" type="warning">加入购物车</el-button>
      <el-button type="danger" @click="coudan">凑单</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import DatePicker from "./DatePicker.vue";
import { Platform } from "../handlers";
import {
  resolveUrls,
  buyDirect,
  qiangquan,
  coudan,
  cartAdd,
  getQrcode
} from "../api";
import bus from "../bus";

@Component({
  components: {
    DatePicker
  }
})
export default class Buy extends Vue {
  text = ``;
  datetime = "";
  num = 1;
  platform: "auto" | Platform = "auto";
  skus = "";
  memo = "";
  async getUrls(data = this.text) {
    data = data.trim();
    if (!data) {
      return [];
    }
    var urls: string[] = await resolveUrls(
      {
        data
      },
      this.realPlatform
    );
    return urls.filter(Boolean);
  }

  async execAction(fn: (url: string) => any) {
    var urls = await this.getUrls();
    urls.forEach(fn);
  }

  async handleCoupon(url: string) {
    var res = await this.qiangquan(url);
    if (res) {
      if (!res.success) {
        let msg;
        if (res.manual) {
          var qurl = await getQrcode(url);
          msg = (
            <div style="text-align:center">
              <p>手动扫描领取优惠券</p>
              <img src={qurl} />
            </div>
          );
        } else {
          msg = "领券失败，要继续吗？";
        }
        let b = await this.$confirm(msg, {
          title: "提示"
        });
        if (!b) {
          throw new Error("领券失败");
        }
      }
      url = res.url;
    }
    return url;
  }

  getSkus() {
    var skus = this.skus.trim();
    if (skus) {
      return skus.split(/,|\s+/).map(Number);
    }
  }

  async addCart(url: string) {
    url = await this.handleCoupon(url);
    return cartAdd(
      {
        url,
        quantity: this.num,
        skus: this.getSkus()
      },
      this.realPlatform
    );
  }

  async qiangdan(url: string) {
    this.$notify.success("执行直接购买");
    url = await this.handleCoupon(url);
    await buyDirect(
      {
        url,
        quantity: this.num,
        skus: this.getSkus(),
        other: {
          memo: this.memo
        }
      },
      this.datetime,
      this.realPlatform
    );
  }

  async qiangquan(url: string) {
    this.$notify.success("开始抢券");
    return qiangquan({ data: url }, this.realPlatform);
  }

  async coudan() {
    bus.$emit("unselect-all");
    this.$notify.success("开始凑单");
    var urls = await this.getUrls();
    var ids = await Promise.all(urls.map(this.addCart));
    // var urls = await this.getUrls();
    return coudan({ data: ids }, this.realPlatform);
  }

  mounted() {
    bus.$on("qiangdan", (text: string) => {
      this.platform = "auto";
      this.text = text;
      this.$nextTick(() => {
        this.execAction(this.qiangdan);
      });
    });
    bus.$on("coudan", (text: string) => {
      this.platform = "auto";
      this.text = text;
      this.$nextTick(() => {
        this.coudan();
      });
    });
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
}
</script>

<style>
</style>

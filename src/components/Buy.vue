<template>
  <el-form label-width="80px">
    <el-form-item>
      <el-col :span="12">
        <el-form-item label="平台">
          <el-radio-group v-model="platform">
            <el-radio label="auto">自动选择</el-radio>
            <el-radio label="taobao">淘宝</el-radio>
            <el-radio label="jingdong">京东</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col
        :span="12"
        v-if="realPlatform==='taobao'"
      >
        <el-form-item label="">
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="12">
        <el-form-item label="文本">
          <el-input
            type="textarea"
            v-model="text"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="memo"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="12">
        <el-form-item label="期望价格">
          <el-input
            :disabled="!forcePrice"
            v-model.number="expectedPrice"
          >
            <el-checkbox
              slot="prepend"
              v-model="forcePrice"
              label=""
            ></el-checkbox>
            <el-checkbox
              v-if="realPlatform==='taobao'"
              slot="append"
              label="猫超凑0.01"
              v-model="mc_dot1"
            ></el-checkbox>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="规格">
          <el-input v-model="skus"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8">
        <el-form-item label="数量">
          <el-input-number v-model.number="num"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="日期">
          <date-picker v-model="datetime"></date-picker>
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        v-if="realPlatform==='taobao'"
      >
        <el-form-item label="猫超凑单">
          <el-input v-model.number="price_coudan">
            <span slot="append">元</span>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="execAction(qiangdan)"
      >抢单</el-button>
      <el-button
        type="warning"
        @click="execAction(qiangquan)"
      >抢券</el-button>
      <el-button
        @click="execAction(addCart)"
        type="warning"
      >加入购物车</el-button>
      <el-button
        type="danger"
        @click="coudan"
      >凑单</el-button>
      <el-button @click="reset">充值</el-button>
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
  getQrcode,
  goodsList
} from "../api";
import bus from "../bus";
import { sendMsg } from "../msg";

interface InfoItem {
  url: string;
  platform: Platform;
  quantity: number;
  skus?: number[];
  expectedPrice?: number;
  datetime?: string;
  mc_dot1?: boolean;
  price_coudan?: number;
}

type InfoItemNoUrl = Pick<
  InfoItem,
  | "platform"
  | "quantity"
  | "skus"
  | "expectedPrice"
  | "datetime"
  | "mc_dot1"
  | "price_coudan"
>;

function getPlatform(text: string) {
  if (/\.jd\.com\//.test(text)) {
    return "jingdong";
  }
  return "taobao";
}

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
  expectedPrice = 0;
  forcePrice = false;
  mc_dot1 = false;
  price_coudan = 0;

  async getUrls(data: string, platform: Platform) {
    data = data.trim();
    if (!data) {
      return [];
    }
    var urls: string[] = await resolveUrls(
      {
        data
      },
      platform
    );
    return urls.filter(Boolean);
  }

  async execAction(
    fn: (url: string, item: InfoItemNoUrl) => any,
    text = this.text,
    item: InfoItemNoUrl = {
      platform: this.realPlatform,
      quantity: this.num,
      skus: this.getSkus(),
      expectedPrice: this.forcePrice ? this.expectedPrice : undefined,
      datetime: this.datetime,
      mc_dot1: this.mc_dot1
    }
  ) {
    var urls = await this.getUrls(text, item.platform);
    urls.forEach(url => {
      fn(url, item);
    });
  }

  getSkus() {
    var skus = this.skus.trim();
    if (skus) {
      return skus.split(/,|\s+/).map(Number);
    }
  }

  async addCart(url: string, arg: InfoItemNoUrl) {
    url = await this.qiangquan(url, arg);
    return cartAdd(
      {
        url,
        quantity: arg.quantity,
        skus: arg.skus
      },
      arg.platform
    );
  }

  async qiangdan(url: string, arg: InfoItemNoUrl) {
    this.$notify.success("执行直接购买");
    url = await this.qiangquan(url, arg);
    await buyDirect(
      {
        url,
        quantity: arg.quantity,
        skus: arg.skus,
        expectedPrice: arg.expectedPrice,
        mc_dot1: arg.mc_dot1,
        other: {
          memo: this.memo
        }
      },
      arg.datetime!,
      arg.platform
    );
  }

  prevUrl!: string;

  async qiangquan(url: string, arg: InfoItemNoUrl) {
    if (this.prevUrl === url) {
      if (!(await this.$confirm("与上次链接相同，要继续操作吗？"))) {
        throw new Error("重复领取");
      }
    }
    this.prevUrl = url;
    this.$notify.success("开始抢券");
    var res = await qiangquan({ data: url }, arg.platform);
    if (res) {
      if (!res.success) {
        let msg;
        if (res.manual) {
          var qurl = await getQrcode(url);
          sendMsg("手动领取优惠券\n" + qurl);
          msg = (
            <div style="text-align:center">
              <p>手动扫描领取优惠券</p>
              <img src={qurl} />
              <el-input value={url} />
            </div>
          );
        } else {
          msg = "领券失败，要继续吗？";
        }
        let b = await this.$confirm(msg, {
          title: "提示",
          closeOnClickModal: false
        });
        if (!b) {
          throw new Error("领券失败");
        }
      }
      url = res.url;
    }
    return url;
  }

  async coudan(
    text: string = this.text,
    item: InfoItemNoUrl = {
      platform: this.realPlatform,
      quantity: 1,
      price_coudan: this.price_coudan
    }
  ) {
    bus.$emit("unselect-all");
    this.$notify.success("开始凑单");
    var urls = await this.getUrls(text, item.platform);
    var quantities: any = text.match(/(?<=拍)\d/g);
    if (item.price_coudan) {
      let [{ url }] = await goodsList({
        platform: item.platform,
        start_price: item.price_coudan
      });
      urls.push(url);
    }
    if (!quantities) {
      quantities = [];
    } else {
      quantities = quantities.map(Number);
    }
    var ids = await Promise.all(
      urls.map((url, i) =>
        this.addCart(url, {
          platform: item.platform,
          quantity: quantities[i] || 1
        })
      )
    );
    // var urls = await this.getUrls();
    return coudan({ data: ids }, item.platform);
  }

  mounted() {
    bus.$on("qiangquan", (text: string) => {
      this.execAction(this.qiangquan, text, {
        platform: getPlatform(text),
        quantity: 1
      });
    });
    bus.$on("qiangdan", (arg: InfoItemNoUrl & { text: string }) => {
      this.execAction(this.qiangdan, arg.text, {
        platform: getPlatform(arg.text),
        quantity: arg.quantity,
        expectedPrice: arg.expectedPrice
      });
    });
    bus.$on("coudan", (text: string) => {
      this.coudan(text, {
        platform: getPlatform(text),
        quantity: 1
      });
    });
  }

  reset() {
    this.num = 1;
    this.forcePrice = false;
    this.text = "";
    this.expectedPrice = 0;
    this.mc_dot1 = false;
    this.price_coudan = 0;
  }

  get realPlatform() {
    if (this.platform === "auto") {
      return getPlatform(this.text);
    }
    return this.platform;
  }
}
</script>

<style>
</style>

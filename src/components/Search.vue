<!--
 * @Author: oudingyin
 * @Date: 2019-08-09 14:04:57
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-09 17:36:10
 -->
<template>
  <div>
    <el-form>
      <el-form-item label="平台">
        <el-radio-group v-model="form_data.platform">
          <el-radio label="taobao">淘宝</el-radio>
          <el-radio label="jingdong">京东</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form_data.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12" v-if="form_data.platform==='taobao'">
          <el-form-item label="津贴">
            <el-input v-model="form_data.coupon_tag_id"></el-input>
          </el-form-item>
        </el-col>
        <template v-else>
          <el-col :span="6">
            <el-form-item label="优惠券id">
              <el-input v-model="form_data.couponbatch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="店铺id">
              <el-input v-model="form_data.coupon_shopid"></el-input>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="6">
          <el-form-item label="最低价格">
            <el-input v-model="form_data.start_price" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最高价格">
            <el-input v-model="form_data.end_price" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="onClick">获取</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="tb" :data="tableData" @selection-change="onSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="{row}">
          <img :src="row.img" width="50" />
          <a :href="row.url" target="_blank">{{row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="{row}">￥{{row.price}}</template>
      </el-table-column>
      <!-- <el-table-column width="120">
        <template slot-scope="{row}">
          <el-button>评价</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div>
      <el-button :disabled="form_data.page<=1" @click="go(-1)">上一页</el-button>
      <el-button v-if="more" @click="go(1)">下一页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { goodsList } from "../api";

@Component
export default class Search extends Vue {
  @Prop() value!: any[];
  tableData: any[] = [];
  multipleSelection: any[] = [];
  more = false;
  pending = false;

  form_data = {
    platform: "jingdong",
    keyword: "",
    start_price: 0,
    end_price: 9999,
    page: 1,
    coupon_tag_id: "117700001",
    coupon_shopid: 0,
    couponbatch: ""
  };
  onClick() {
    this.form_data.page = 1;
    this.refresh();
  }
  async refresh() {
    var ret = await goodsList(this.form_data);
    this.tableData = ret.items;
    this.more = ret.more;
  }

  go(num: number) {
    this.form_data.page += num;
    this.refresh();
  }

  onSelectionChange(val: any) {
    this.multipleSelection = val;
  }
}
</script>

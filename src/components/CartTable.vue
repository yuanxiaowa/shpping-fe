<template>
  <div>
    <el-table
      :data="value"
      style="width: 100%"
      default-expand-all
      size="mini"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.items"
            size="mini"
          >
            <el-table-column width="55">
              <template slot-scope="{row}">
                <el-checkbox
                  @input="$emit('update-checked',row)"
                  v-model="row.checked"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="商品图片">
              <template slot-scope="{row}">
                <img
                  :src="row.img"
                  alt=""
                >
              </template>
            </el-table-column>
            <el-table-column
              label="商品名称"
              width="300"
            >
              <template slot-scope="{row}">
                <a
                  :href="row.url"
                  target="_blank"
                >{{row.title}}</a>
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              prop="price"
            ></el-table-column>
            <el-table-column
              label="数量"
              prop="amount"
            ></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!-- <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column> -->
      <el-table-column
        label="店铺名称"
        prop="title"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CartTable extends Vue {
  @Prop() value!: any[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

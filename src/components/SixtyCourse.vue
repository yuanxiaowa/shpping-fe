<template>
  <div>
    <el-form>
      <template v-for="item of items">
        <el-form-item
          :key="item.actId"
          :label="item.title"
          v-if="!item.finished||item.lotteryCount>0"
        >
          <el-radio-group
            v-if="!item.todayAnswered"
            v-model="item.option"
          >
            <el-radio
              v-for="(v,k) of item.options"
              :label="v"
              :key="k"
            ></el-radio>
          </el-radio-group>
          <el-button
            v-if="!item.todayAnswered||item.lotteryCount>0"
            @click="reply(item)"
            style="margin-left:1em"
          >提交</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getSixtyCourseList, replyixtyCourse } from "../api";

@Component
export default class SixtyCourse extends Vue {
  items: any[] = [];
  async mounted() {
    this.items = await getSixtyCourseList();
  }
  reply(item) {
    replyixtyCourse(item);
  }
}
</script>
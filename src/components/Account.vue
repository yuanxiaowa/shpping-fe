<template>
  <div>
    <el-button @click="showList" size="small">账号列表</el-button>
    <el-button size="small" @click="show_edit=true">添加账号</el-button>
    <el-dialog :visible.sync="show_list" :modal="false">
      <ul>
        <li v-for="item of list" :key="item.id">
          {{item.name}}
          <el-button size="small" @click="setUserId(item.id)">选择</el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delUser(item)"></el-button>
        </li>
      </ul>
    </el-dialog>
    <el-dialog :visible.sync="show_edit" :modal="false">
      <el-form size="small">
        <el-form-item label="用户名">
          <el-input v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item label="qq">
          <el-input v-model="user.qq"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import {
  getUsers,
  setUserId,
  authorize,
  pushServer,
  popServer,
  delUser
} from "../api";

@Component({
  components: {}
})
export default class Account extends Vue {
  show_list = false;
  show_edit = false;
  list: any[] = [];
  user = {
    id: "",
    qq: ""
  };
  showList() {
    this.show_list = true;
    getUsers().then(list => {
      this.list = list;
    });
  }
  setUserId(id) {
    setUserId(id);
    this.show_list = false;
  }
  async add() {
    if (!this.user.id || !this.user.qq) {
      return this.$alert("请填写完信息");
    }
    pushServer(this.user.id);
    this.$nextTick(() => {
      popServer();
    });
    await authorize(this.user);
    this.show_edit = false;
  }
  async delUser(item) {
    await delUser({ id: item.id });
    var i = this.list.indexOf(item);
    this.list.splice(i, 1);
    this.$notify.success("删除成功");
  }
}
</script>

<style lang="scss">
</style>
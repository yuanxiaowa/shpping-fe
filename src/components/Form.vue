<!--
 * @Author: oudingyin
 * @Date: 2019-08-21 16:38:25
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-21 17:44:56
 -->
<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import DatePicker from "./DatePicker.vue";

@Component({
  components: {
    DatePicker
  }
})
export default class Form extends Vue {
  render() {
    return <el-form></el-form>;
  }
}
</script>

<style>
</style>
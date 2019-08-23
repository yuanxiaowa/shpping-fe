/*
 * @Author: oudingyin
 * @Date: 2019-08-22 09:21:48
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-23 14:21:06
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "vue-auto-routing";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

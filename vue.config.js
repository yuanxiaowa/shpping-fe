/*
 * @Author: oudingyin
 * @Date: 2019-08-23 14:17:53
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-23 14:28:23
 */
const VueAutoRoutingPlugin = require("vue-auto-routing/lib/webpack-plugin");

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          resourceQuery: /blockType=route-meta/,
          loader: require.resolve("./config/route-meta.js")
        }
      ]
    }
  },
  chainWebpack(config) {
    config.plugin("vue-auto-routing").use(VueAutoRoutingPlugin, [
      {
        pages: "src/views",
        importPrefix: "@/views/"
      }
    ]);
  }
};

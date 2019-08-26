/*
 * @Author: oudingyin
 * @Date: 2019-08-26 09:17:50
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-26 21:33:05
 */
const blacklist = require("./text/blacklist.json");
export function resolveText(text: string) {
  var type: string;
  var items: string[] | null;
  var nums: number[] | null;
  items = text.match(/(?<![^a-zA-Z0-9])[a-zA-Z0-9]{11}(?![^a-zA-Z0-9])/g);
  if (items) {
    type = "taokouling";
  } else {
    items = text.match(
      /https?:\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?/g
    );
    if (items) {
      type = "url";
    }
  }
  if (items) {
    if (
      /拼购(券|日)|领券|新券|领全品|白条券|吱付券|支付券|可领|领取优惠券|无门槛|抢券|快领|速度领|(\d+)?-\d+券|领(标题)?下方|领\d+折?券|防身|福利|(\d|一二三四五六七八九)(毛|分)/.test(
        text
      )
    ) {
      if (type! === "taokouling" && blacklist.find(t => text.includes(t))) {
        return;
      }
      return {
        type: type!,
        action: "qiangquan",
        items
      };
    }
    let nums_arr = text.match(/(?<=(?<!拍)下|拍|买)\d+/g)!;
    if (nums_arr) {
      nums = items.map((_, i) => Number(nums_arr[i]) || 1);
    } else {
      nums = Array(items.length).fill(1);
    }
    let price = 10;
    let action: string = "";
    if (
      /(?<!\d|件|份|条)0元|0撸|零撸|免单|不是(0|零)不要买|实付0|直接(够)买就是0|到手0/.test(
        text
      )
    ) {
      price = 0;
      action = "coudan";
    } else if (
      /([\d.]+)元/.test(text) ||
      /付([\d.]+)/.test(text) ||
      /【([\d.]+)】/.test(text) ||
      /[([\d.]+)]/.test(text) ||
      /(?:[\s：:，,]|半价|折合|折后)([\d.]+)(?!\w)/.test(text)
    ) {
      price = Number(RegExp.$1);
      action = "notice";
    }
    return {
      type: type!,
      items,
      nums,
      price,
      action
    };
  }
  return /速度|锁单|试试|双叠加/.test(text);
}

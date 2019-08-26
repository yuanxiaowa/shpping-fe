/*
 * @Author: oudingyin
 * @Date: 2019-07-16 14:02:05
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-26 21:01:54
 */
import bus from "./bus";
import { groups } from "./config";
import { sendPrivateMsg } from "./api";

const suser = 870092104;

// http://doc.cleverqq.cn/479462
// https://cqhttp.cc/docs/4.10/#/Post?id=%E4%B8%8A%E6%8A%A5%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F

var ws = new WebSocket("ws://localhost:6700/event/");
ws.onmessage = e => {
  var { message_type, raw_message, group_id, user_id } = JSON.parse(e.data);
  var text = raw_message; // .replace(/\[CQ:[^\]]+/g, "").trim();
  if (message_type === "group") {
    if (groups.includes(group_id)) {
      if (handler(raw_message)) {
        sendMsg(text);
      }
    }
  } else if (message_type === "private" && user_id === suser) {
    if (raw_message === "cs") {
      return bus.$emit("check-status");
    }
    handler(raw_message);
  }
};

const r_taobao = /(?<!\w)\w{11}(?!\w)/g;
const r_url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
const r_symbol = /[&%【】,，，\s￥(（¢)）]/g;
const blacklist = require("./text/blacklist.json");

function getTidyText(text: string) {
  return text
    .replace(r_taobao, "")
    .replace(r_symbol, "")
    .replace(/[-—]*复制本消息，打开淘宝即可[-—]*/, "")
    .replace(r_url, "")
    .replace(r_symbol, "")
    .replace(/\[CQ:imagefile=[^\]]+\]/g, "")
    .trim();
}

class Recorder {
  max = 20;
  items: string[] = [];
  add(str: string) {
    if (this.items.length >= this.max) {
      this.items.shift();
    }
    this.items.push(getTidyText(str));
  }
  has(str: string) {
    var text = getTidyText(str);
    return this.items.includes(text);
  }
}

var recorder = new Recorder();
// @ts-ignore
window.recorder = recorder;

function handler(text: string) {
  if (text.includes("【苏宁】") || text.includes("【盒马】")) {
    return;
  }
  text = text
    .replace(/\s+/, " ")
    .replace(/&amp;/g, "&")
    .replace(/💰/g, "元")
    .trim();
  if (recorder.has(text)) {
    return;
  }
  recorder.add(text);
  var texts = (<string[]>[]).concat(
    text.match(r_url) || [],
    text.match(r_taobao) || []
  );
  if (texts.length === 0) {
    return /速度|锁单|试试|双叠加/.test(text);
  }
  var isTaobao = r_taobao.test(text);
  if (
    /(?<!\d|第\d+件|第\d+份|第\d+条)0元|0撸|零撸|免单|不是(0|零)不要买|实付0|直接(够)买就是0|到手0/.test(
      text
    )
  ) {
    let quantity = 1;
    // resolveGoods(text);
    if (/(\d+)件|(?:拍|下)(\d+)/.test(text)) {
      quantity = Number(RegExp.$1 || RegExp.$2);
    }
    bus.$emit("qiangdan", {
      text,
      quantity,
      expectedPrice: 0,
      forcePrice: true,
      platform: isTaobao ? "taobao" : "jingdong"
    });
    return true;
  }
  if (
    /拼购(券|日)|领券|新券|领全品|白条券|吱付券|支付券|可领|领取优惠券|无门槛|抢券|快领|速度领|(\d+)?-\d+券|领(标题)?下方|领\d+折?券|防身|福利|(\d|一二三四五六七八九)(毛|分)/.test(
      text
    )
  ) {
    if (isTaobao && blacklist.includes(text)) {
      return;
    }
    bus.$emit("qiangquan", text);
    return true;
  }
  if (text.includes("锁单")) {
    bus.$emit("coudan", text);
    return true;
  }
  if (text.includes("1元包邮")) {
    return !/钢化膜|手机膜|数据线/.test(text);
  }
  if (text.includes("双叠加")) {
    if (/(拍|下)(\d+)/) {
      bus.$emit("qiangdan", {
        text,
        quantity: Number(RegExp.$1),
        expectedPrice: 10,
        forcePrice: true,
        platform: isTaobao ? "taobao" : "jingdong"
      });
    }
    return true;
  }
  if (text.includes("试试")) {
    if (/(\d+).?试试/.test(text)) {
      bus.$emit("qiangdan", {
        text,
        quantity: Number(RegExp.$1),
        expectedPrice: 10,
        forcePrice: true,
        platform: isTaobao ? "taobao" : "jingdong"
      });
    }
    return true;
  }
  if (
    /前\d+(?!分钟)|(?<!\d)0\.\d+|速度|抽奖|领金豆|淘宝搜|红包|虹包|神价|秒杀|神车|手慢无|手快有|好价|神价/.test(
      text
    )
  ) {
    if (text.includes("0.1")) {
      bus.$emit("qiangdan", {
        text,
        quantity: 1,
        expectedPrice: 0.1,
        forcePrice: true,
        platform: isTaobao ? "taobao" : "jingdong"
      });
    } else {
      bus.$emit("qiangquan", text);
    }
    // if (/\w/.test(text)) {
    return !(isTaobao && blacklist.includes(text));
    // }
  }
  return /大米|盐|猫超/.test(text);
}

export function sendMsg(msg: string) {
  sendPrivateMsg(msg, suser);
}

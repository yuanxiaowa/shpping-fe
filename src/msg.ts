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
const blacklist = [
  "大闸蟹",
  "螃蟹",
  "龙虾",
  "护发素",
  "面膜",
  "婴",
  "冰袖",
  "卷发棒",
  "面膜",
  "腮红",
  "充电宝",
  "孕妇",
  "童装",
  "宝宝",
  "卫生巾",
  "耳机",
  "名人",
  "纸尿裤",
  "试卷",
  "真题",
  "素描",
  "眉笔",
  "女款",
  "冈本",
  "套套",
  "避孕套",
  "防晒",
  "洗面奶",
  "眼罩",
  "蟑螂药",
  "儿童"
];

function getTidyText(text: string) {
  return text
    .replace(r_taobao, "")
    .replace(r_symbol, "")
    .replace(/[-—]*复制本消息，打开淘宝即可[-—]*/, "")
    .replace(r_url, "")
    .replace(r_symbol, "")
    .trim();
}

class Recorder {
  max = 10;
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

function handler(text: string) {
  text = text
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
  if (/(?<!\d|件|份|条)0元|0撸|零撸|免单/.test(text)) {
    let quantity = 1;
    if (/(\d+)件|拍(\d+)/.test(text)) {
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
    /领券|新券|领全品|领取优惠券|抢券|(\d+)?-\d+券|领(标题)?下方|领\d+折?券|防身|福利|(\d|一二三四五六七八九)(毛|分)/.test(
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
  if (text.includes("试试")) {
    return true;
  }
  if (
    /前\d+(?!分钟)|(?<!\d)0\.\d+|速度|抽奖|领金豆|无门槛|淘宝搜|红包|虹包|神价|双叠加|秒杀|神车/.test(
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

import bus from "./bus";
import { groups } from "./config";
import { sendPrivateMsg } from "./api";

const suser = 870092104;

// http://doc.cleverqq.cn/479462
// https://cqhttp.cc/docs/4.10/#/Post?id=%E4%B8%8A%E6%8A%A5%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F

var ws = new WebSocket("ws://localhost:6700/event/");
ws.onmessage = e => {
  var { message_type, raw_message, group_id, user_id } = JSON.parse(e.data);
  const text = raw_message.trim(); // .replace(/\[CQ:[^\]]+/g, "").trim();
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

var prevText: string;
function handler(text: string) {
  if (prevText === text) {
    return;
  }
  if (/(?<!\d|件)0元|0撸|零撸|免单/.test(text)) {
    let quantity = 1;
    if (/(\d+)件|拍(\d+)/.test(text)) {
      quantity = Number(RegExp.$1 || RegExp.$2);
    }
    bus.$emit("qiangdan", {
      text,
      quantity
    });
    return true;
  }
  if (/领券|领取优惠券|抢券|防身|福利|\d毛/.test(text)) {
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
  if (
    /前\d+(?!分钟)|(?<!\d)0\.\d+|速度|抽奖|领金豆|无门槛|淘宝搜|试试|红包|虹包|神价|双叠加/.test(
      text
    )
  ) {
    // if (/\w/.test(text)) {
    return !/面膜|婴/.test(text);
    // }
  }
  return /大米|盐/.test(text);
}

export function sendMsg(msg: string) {
  sendPrivateMsg(msg, suser);
}

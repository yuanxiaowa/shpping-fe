/*
 * @Author: oudingyin
 * @Date: 2019-07-16 14:02:05
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-27 19:42:32
 */
import bus from "./bus";
import { groups } from "./config";
import { sendPrivateMsg } from "./api";
import { resolveText } from "./tools";

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
  if (
    text.includes("【苏宁】") ||
    text.includes("【盒马】" || text.includes("美团"))
  ) {
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
  var data = resolveText(text);
  if (data && data.action) {
    if (data.action === "notice") {
      return true;
    }
    bus.$emit(data.action, data);
    return true;
  }
}

export function sendMsg(msg: string) {
  sendPrivateMsg(msg, suser);
}

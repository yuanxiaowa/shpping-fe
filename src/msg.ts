import bus from "./bus";

// http://doc.cleverqq.cn/479462
// https://cqhttp.cc/docs/4.10/#/Post?id=%E4%B8%8A%E6%8A%A5%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F

var ws = new WebSocket("ws://localhost:6700/event/");
ws.onmessage = e => {
  var { message_type, raw_message, group_id } = JSON.parse(e.data);
  if (message_type === "group") {
    let text = raw_message.replace(/\[CQ:[^\]]+/g, "").trim();
    if (text) {
      bus.$emit("msg-group", {
        group_id,
        text
      });
    }
  }
};

import bus from "./bus";

var ws = new WebSocket("ws://localhost:6700/event/");
ws.onmessage = e => {
  var { message_type, raw_message, group_id } = JSON.parse(e.data);
  if (message_type === "group") {
    let text = raw_message.replace(/\[CQ:[^]]/g, "").trim();
    if (text) {
      bus.$emit("msg-group", {
        group_id,
        text
      });
    }
  }
};

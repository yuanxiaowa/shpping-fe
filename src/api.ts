/*
 * @Author: oudingyin
 * @Date: 2019-07-12 17:17:39
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-09-06 17:12:55
 */
import axios from "axios";
import { Notification, MessageBox } from "element-ui";
import bus from "./bus";
import { sendMsg } from "./msg";
import { super_user } from "./config";

var host = location.hostname;
var instance = axios.create({
  baseURL: `http://${host}:${7001}`
});

var user: any = localStorage.getItem("user");
if (!user) {
  user = {};
} else {
  user = JSON.parse(user);
}

var stacks: any[] = [user];
instance.interceptors.request.use(v => {
  if (!v.params) {
    v.params = {};
  }
  v.params._id = stacks[stacks.length - 1].id;
  return v;
});
instance.interceptors.response.use(res => {
  if (res.status !== 200) {
    Notification.error(res.data.message);
    throw new Error(res.data.message);
  }
  var { code, msg, data } = res.data;
  if (code !== 0) {
    Notification.error(msg);
    if (code === 2) {
      let { params } = res.config;
      let id = params && params._id;
      if (id) {
        pushServer(id);
      }
      authorize(
        params && {
          qq: params.qq
        }
      );
      if (id) {
        popServer();
      }
    } else if (code === 3) {
      fillInfo();
    } else if (msg === "令牌过期") {
      bus.$emit("check-status");
      sendMsg(msg);
    }
    throw new Error(msg);
  } else if (msg) {
    Notification.success(msg);
  }
  return data;
});
export function pushServer(id) {
  stacks.push({
    id,
    qq: id
  });
}
export function popServer() {
  setTimeout(() => {
    stacks.pop();
  });
}

export function setUserId(id) {
  user.id = id;
}

function fillInfo() {
  MessageBox.prompt("请输入用户名").then((arg: any) => {
    var id = arg.value;
    MessageBox.prompt("请输入QQ号码").then(({ value }) => {
      Object.assign(user, {
        id,
        qq: value
      });
      localStorage.setItem("user", JSON.stringify(user));
      authorize({
        id: user.id,
        qq: value
      });
    });
  });
}

if (!user.id) {
  fillInfo();
} else {
  authorize();
}

export function getUsers(params?: any) {
  return instance.get("/user", {
    params
  });
}

export function delUser(params?: any) {
  return instance.get("/user/del", {
    params
  });
}

export function authorize(params?: any) {
  return instance.get("/authorize", {
    params
  });
}

export function cartList(platform: string, from_pc = false): Promise<any> {
  return instance.get("/cart", {
    params: {
      platform,
      from_pc: from_pc ? 1 : ""
    }
  });
}
export function cartBuy(data: any, t: string, platform: string): Promise<any> {
  return instance.post("/cart/buy", data, {
    params: {
      platform,
      t
    }
  });
}
export function cartToggle(data: any, platform: string): Promise<any> {
  return instance.post("/cart/toggle", data, {
    params: {
      platform
    }
  });
}
export function cartToggleAll(data: any, platform: string): Promise<any> {
  return instance.post("/cart/toggle-all", data, {
    params: {
      platform
    }
  });
}
export function cartAdd(data: any, platform: string): Promise<any> {
  return instance.post("/cart/add", data, {
    params: {
      platform
    }
  });
}
export function cartDel(data: any, platform: string): Promise<any> {
  return instance.post("/cart/del", data, {
    params: {
      platform
    }
  });
}
export function cartUpdateQuantity(data: any, platform: string): Promise<any> {
  return instance.post("/cart/quantity", data, {
    params: {
      platform
    }
  });
}
export function buyDirect(
  data: any,
  t: string,
  platform: string
): Promise<any> {
  return instance.post("/buy/direct", data, {
    params: {
      platform,
      t
    }
  });
}
export function coudan(data: any, platform: string): Promise<any> {
  return instance.post("/coudan", data, {
    params: {
      platform
    }
  });
}
export function qiangquan(
  data: any,
  t: string,
  platform: string
): Promise<any> {
  return instance.post("/qiangquan", data, {
    params: {
      platform,
      t
    }
  });
}
export function commentList(data: any, platform: string): Promise<any> {
  return instance.get("/comment", {
    params: {
      platform,
      ...data
    }
  });
}
export function comment(data: any, platform: string): Promise<any> {
  return instance.post("/comment/add", data, {
    params: {
      platform
    }
  });
}
export function resolveUrl(data: any, platform: string): Promise<any> {
  return instance.post("/resolve/url", data, {
    params: {
      platform
    }
  });
}

export function getQrcode(url: string) {
  return instance.get("/qrcode/generate", {
    params: {
      url
    }
  });
}

export function sendGroupMsg(message: string, group_id = 124866249) {
  return axios.get("http://localhost:5700/send_group_msg", {
    params: {
      group_id,
      message
    }
  });
}

export function sendPrivateMsg(message: string, user_id: number) {
  return axios.get("http://localhost:5700/send_private_msg", {
    params: {
      user_id,
      message
    }
  });
}
export function getSixtyCourseList() {
  return instance.get("/sixty-course/list");
}

export function replyixtyCourse(params: any) {
  return instance.get("/sixty-course/reply", {
    params
  });
}

export function checkStatus(platform: string, qq = super_user) {
  return instance.get("/check/status", {
    params: {
      platform,
      qq
    }
  });
}

export function sysTime(platform: string) {
  return instance.get("/sys/time", {
    params: {
      platform
    }
  });
}

export function goodsList(params: any) {
  return instance.get("/goods/list", {
    params
  });
}

export function getConfig() {
  return instance.get("/config");
}

export function setConfig(data: any) {
  return instance.post("/config", data);
}

export function getTasks() {
  return instance.get("/task/list");
}

export function cancelTask(id: string) {
  return instance.get("/task/cancel", {
    params: {
      id
    }
  });
}

export function getCollection(params: any) {
  return instance.get("/collection", {
    params
  });
}

export function delCollection(data: any, platform: string) {
  return instance.post("/collection/del", data, {
    params: {
      platform
    }
  });
}

export function getSeckillList(params) {
  return instance.get("/seckill/list", {
    params
  });
}

export function getMyCoupons(params) {
  return instance.get("/my/coupons", {
    params
  });
}

export function getPlusQuanpinList() {
  return instance.get("/quanpin/plus");
}

export function getPlusQuanpin(data) {
  return instance.post("/quanpin/plus/get", data);
}

export function testOrder(params: any) {
  return instance.get("/test/order", {
    params
  });
}

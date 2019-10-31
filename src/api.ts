/*
 * @Author: oudingyin
 * @Date: 2019-07-12 17:17:39
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-09-06 17:12:55
 */
import axios, { AxiosResponse, AxiosInstance } from "axios";
import { Notification } from "element-ui";
import bus from "./bus";
import { sendMsg } from "./msg";
import { super_user } from "./config";

var instance: AxiosInstance;

bus.$on("change-port", port => {
  localStorage.setItem("server-port", port);
  instance = axios.create({
    baseURL: `http://172.16.40.38:${port}`
  });
  stacks[0] = instance;
});

var stacks: any[] = [];
export function pushServer(port) {
  instance = axios.create({
    baseURL: `http://172.16.40.38:${port}`
  });
  stacks.push(instance);
}
export function popServer() {
  stacks.shift();
  instance = stacks[stacks.length - 1];
}

pushServer(localStorage.getItem("server-port") || 7001);

function handleResponse({ data: { code, data, msg } }: AxiosResponse<any>) {
  if (code !== 0) {
    if (msg === "令牌过期") {
      bus.$emit("check-status");
      sendMsg(msg);
    }
    throw new Error(msg);
  }
  if (msg) {
    Notification.success(msg);
  }
  return data;
}

function handleError(e: Error) {
  Notification.error(e.message);
  throw new Error(e.message);
}

export function cartList(platform: string, from_pc = false): Promise<any> {
  return instance
    .get("/cart", {
      params: {
        platform,
        from_pc: from_pc ? 1 : ""
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function cartBuy(data: any, t: string, platform: string): Promise<any> {
  return instance
    .post("/cart/buy", data, {
      params: {
        platform,
        t
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function cartToggle(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/toggle", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function cartToggleAll(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/toggle-all", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function cartAdd(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/add", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function cartDel(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/del", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function cartUpdateQuantity(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/quantity", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function buyDirect(
  data: any,
  t: string,
  platform: string
): Promise<any> {
  return instance
    .post("/buy/direct", data, {
      params: {
        platform,
        t
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function coudan(data: any, platform: string): Promise<any> {
  return instance
    .post("/coudan", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function qiangquan(
  data: any,
  t: string,
  platform: string
): Promise<any> {
  return instance
    .post("/qiangquan", data, {
      params: {
        platform,
        t
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function commentList(data: any, platform: string): Promise<any> {
  return instance
    .get("/comment", {
      params: {
        platform,
        ...data
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function comment(data: any, platform: string): Promise<any> {
  return instance
    .post("/comment/add", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}
export function resolveUrl(data: any, platform: string): Promise<any> {
  return instance
    .post("/resolve/url", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}

export function getQrcode(url: string) {
  return instance
    .get("/qrcode/generate", {
      params: {
        url
      }
    })
    .then(handleResponse)
    .catch(handleError);
}

export function sendPrivateMsg(message: string, user_id: number) {
  if (user_id === super_user) {
    axios.get("http://localhost:5700/send_private_msg", {
      params: {
        user_id: 279557608,
        message
      }
    });
  }
  return axios.get("http://localhost:5700/send_private_msg", {
    params: {
      user_id,
      message
    }
  });
}
export function getSixtyCourseList() {
  return instance
    .get("/sixty-course/list")
    .then(handleResponse)
    .catch(handleError);
}

export function replyixtyCourse(params: any) {
  return instance
    .get("/sixty-course/reply", {
      params
    })
    .then(handleResponse)
    .catch(handleError);
}

export function checkStatus(platform: string) {
  return instance
    .get("/check/status", {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}

export function sysTime(platform: string) {
  return instance
    .get("/sys/time", {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}

export function goodsList(params: any) {
  return instance
    .get("/goods/list", {
      params
    })
    .then(handleResponse)
    .catch(handleError);
}

export function getConfig() {
  return instance
    .get("/config")
    .then(handleResponse)
    .catch(handleError);
}

export function setConfig(data: any) {
  return instance
    .post("/config", data)
    .then(handleResponse)
    .catch(handleError);
}

export function getTasks() {
  return instance
    .get("/task/list")
    .then(handleResponse)
    .catch(handleError);
}

export function cancelTask(id: string) {
  return instance
    .get("/task/cancel", {
      params: {
        id
      }
    })
    .then(handleResponse)
    .catch(handleError);
}

export function getCollection(params: any) {
  return instance
    .get("/collection", {
      params
    })
    .then(handleResponse)
    .catch(handleError);
}

export function delCollection(data: any, platform: string) {
  return instance
    .post("/collection/del", data, {
      params: {
        platform
      }
    })
    .then(handleResponse)
    .catch(handleError);
}

export function getSeckillList(params) {
  return instance
    .get("/seckill/list", {
      params
    })
    .then(handleResponse)
    .catch(handleError);
}

export function getMyCoupons(params) {
  return instance
    .get("/my/coupons", {
      params
    })
    .then(handleResponse)
    .catch(handleError);
}

export function getPlusQuanpinList() {
  return instance
    .get("/quanpin/plus")
    .then(handleResponse)
    .catch(handleError);
}

export function getPlusQuanpin(data) {
  return instance
    .post("/quanpin/plus/get", data)
    .then(handleResponse)
    .catch(handleError);
}

export function testOrder(params: any) {
  return instance
    .get("/test/order", {
      params
    })
    .then(handleResponse)
    .catch(handleError);
}

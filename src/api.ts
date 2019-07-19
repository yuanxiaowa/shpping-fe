import axios, { AxiosResponse } from "axios";
import { Notification } from "element-ui";

var instance = axios.create({
  baseURL: "http://localhost:7001"
});

function handleResponse({ data: { code, data, msg } }: AxiosResponse<any>) {
  if (code !== 0) {
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

export function cartList(platform: string): Promise<any> {
  return instance
    .get("/cart", {
      params: {
        platform
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
export function qiangquan(data: any, platform: string): Promise<any> {
  return instance
    .post("/qiangquan", data, {
      params: {
        platform
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
export function resolveUrls(data: any, platform: string): Promise<any> {
  return instance
    .post("/resolve/urls", data, {
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

export function goodsList(params: any) {
  return instance
    .get("/goods/list", {
      params
    })
    .then(handleResponse)
    .catch(handleError);
}

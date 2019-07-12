import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:7001"
});

export function cartList(platform: string): Promise<any> {
  return instance
    .get("/cart", {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function cartBuy(data: any, t: string, platform: string): Promise<any> {
  return instance
    .post("/cart/buy", data, {
      params: {
        platform,
        t
      }
    })
    .then(({ data }) => data);
}
export function cartToggle(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/toggle", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function cartAdd(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/add", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function cartDel(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/del", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function cartUpdateQuantity(data: any, platform: string): Promise<any> {
  return instance
    .post("/cart/quantity", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
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
    .then(({ data }) => data);
}
export function coudan(data: any, platform: string): Promise<any> {
  return instance
    .post("/coudan", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function qiangquan(data: any, platform: string): Promise<any> {
  return instance
    .post("/qiangquan", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function commentList(platform: string): Promise<any> {
  return instance
    .get("/comment", {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function comment(data: any, platform: string): Promise<any> {
  return instance
    .post("/comment/add", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function resolveUrl(data: any, platform: string): Promise<any> {
  return instance
    .post("/resolve/url", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}
export function resolveUrls(data: any, platform: string): Promise<any> {
  return instance
    .post("/resolve/urls", data, {
      params: {
        platform
      }
    })
    .then(({ data }) => data);
}

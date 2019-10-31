/*
 * @Author: oudingyin
 * @Date: 2019-08-26 20:35:40
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-09-07 11:38:11
 */
import { getDealedData } from "./tools";
import bus from "./bus";
import {
  qiangquan as qiangquan_api,
  buyDirect,
  coudan,
  cartToggleAll,
  sysTime,
  getTasks,
  cancelTask,
  checkStatus,
  pushServer,
  popServer
} from "./api";
import { Notification, MessageBox } from "element-ui";
import { Platform } from "./handlers";
import { sendMsg } from "./msg";

export async function qiangquan(
  urls: string[],
  t: string | undefined,
  platform: string
) {
  var couponResult = await Promise.all(
    urls.map(url => qiangquan_api({ data: url }, t!, platform))
  );
  return couponResult.filter(Boolean);
}
bus.$on("qiangquan", async (data: any) => {
  /* this.execAction(this.qiangquan, text, {
        platform: getPlatform(text),
        quantity: 1
      }); */
  data = await getDealedData(data);
  await qiangquan(data.urls, data.datetime, data.platform);
});
bus.$on("coudan", async (data: any) => {
  data = await getDealedData(data);
  var urls = await qiangquan(data.urls, undefined, data.platform);
  data.urls = urls.map(({ url }) => url).filter(Boolean);
  if (data.urls.length === 0) {
    throw new Error("无链接");
  }
  if (data.urls.length === 1) {
    buyDirect(
      {
        url: data.urls[0],
        quantity: data.quantities[0],
        skus: data.skus,
        expectedPrice: data.expectedPrice,
        from_pc: true,
        other: {},
        diejia: data.diejia,
        jianlou: data.jianlou
      },
      data.datetime!,
      data.platform
    );
  } else {
    Notification.success("开始凑单");
    bus.$emit("unselect-all", data.platform);
    setTimeout(() => {
      coudan(
        Object.assign(
          {
            from_pc: true,
            other: {}
          },
          data
        ),
        data.platform
      );
    });
  }
});
bus.$on("unselect-all", (platform: Platform) => {
  return cartToggleAll(
    {
      checked: false
    },
    platform
  );
});
bus.$on("sys-time", (text: string) => {
  var platform = text.includes("京东") ? "jingdong" : "taobao";
  sysTime(platform);
});
bus.$on("tasks", (data?: { port: number; qq: number }) => {
  if (data) {
    pushServer(data.port);
  }
  getTasks().then(items => {
    sendMsg(
      items
        .map(item => [item.platform, item.type, item.text, item.time].join("-"))
        .join("\n") || "暂无",
      data && data.qq
    );
  });
  if (data) {
    popServer();
  }
});
bus.$on("tasks-kill", (data?: { port: number; qq: number }) => {
  if (data) {
    pushServer(data.port);
  }
  getTasks().then(items => {
    Promise.all(items.map(item => cancelTask(item.id))).then(
      () => {
        sendMsg("已取消", data && data.qq);
        if (data) {
          popServer();
        }
      },
      () => {
        sendMsg("取消失败", data && data.qq);
        if (data) {
          popServer();
        }
      }
    );
  });
});
bus.$on("check-status", (data?: { port: number; qq: number }) => {
  if (data) {
    pushServer(data.port);
  }
  checkStatus("taobao", data && data.qq).then(url => {
    console.log(data);
    if (!url || !url.startsWith("http")) {
      Notification.success("状态正常");
      sendMsg(`(${url})登录状态正常`, data && data.qq);
    } else {
      sendMsg(url, data && data.qq);
      MessageBox.alert(`<img src=${url} />`, {
        dangerouslyUseHTMLString: true,
        center: true
      });
    }
  });
  if (data) {
    popServer();
  }
});

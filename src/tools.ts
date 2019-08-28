import { resolveUrl } from "./api";

/*
 * @Author: oudingyin
 * @Date: 2019-08-26 09:17:50
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-28 21:00:24
 */
interface Ret {
  action: string;
  expectedPrice: number;
  type: string;
  urls: string[];
  quantities: number[];
  forcePrice: boolean;
}

const blacklist = require("./text/blacklist.json");
// @ts-ignore
window.resolveText = resolveText;
export function resolveText(text: string) {
  var type: string;
  var urls: string[] | null;
  var quantities: number[] | null;
  var forcePrice = false;
  urls = text.match(/(?<![a-zA-Z0-9&=])[a-zA-Z0-9]{11}(?![a-zA-Z0-9&=])/g);
  if (urls) {
    type = "taokouling";
  } else {
    urls = text.match(
      /https?:\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?/g
    );
    if (urls) {
      type = "url";
    }
  }
  if (urls) {
    let quantities_arr = text.match(/(?<=(?<!拍)下|拍|买|加车|选)\d+/g)!;
    if (quantities_arr) {
      quantities = urls.map((_, i) => Number(quantities_arr[i]) || 1);
    } else {
      quantities_arr = text.match(/\d+(?=件|份)/g)!;
    }
    if (!quantities_arr) {
      quantities = Array(urls.length).fill(1);
    }
    let expectedPrice = 10;
    let action: string = "";
    if (
      /([\d.]+)元/.test(text) ||
      /付([\d.]+)/.test(text) ||
      /【([\d.]+)(包邮)?】/.test(text) ||
      /\[([\d.]+)\]/.test(text) ||
      /(?:[\s：:，,]|半价|折合|折后)([\d.]+)(?!\w)/.test(text) ||
      /([\d\.]+)包邮/.test(text) ||
      /件([\d\.]+)/.test(text) ||
      /到手([\d\.]+)/.test(text) ||
      /([\d\.]+)到手/.test(text)
    ) {
      forcePrice = true;
      expectedPrice = Number(RegExp.$1);
    }
    if (
      /拼购(券|日)|领券|新券|领全品|白条券|吱付券|支付券|可领|领取优惠券|无门槛|抢券|快领|速度领|(\d+)?-\d+券|领(标题)?下方|领\d+折?券|防身|福利|(\d|一二三四五六七八九)(毛|分)/.test(
        text
      )
    ) {
      if (type! === "taokouling" && blacklist.find(t => text.includes(t))) {
        return;
      }
      return <Ret>{
        type: type!,
        action: "qiangquan",
        urls,
        quantities,
        expectedPrice: expectedPrice
      };
    }
    if (
      /(?<!\d|件|份|条)0元|0撸|零撸|免单|不是(0|零)不要买|实付0|直接(够)买就是0|到手0/.test(
        text
      )
    ) {
      expectedPrice = 0;
      forcePrice = true;
      action = "coudan";
    } else if (text.includes("一分")) {
      expectedPrice = 0.01;
      action = "coudan";
      forcePrice = true;
    } else if (text.includes("0.1")) {
      expectedPrice = 0.1;
      action = "coudan";
      forcePrice = true;
    } else if (
      text.includes("试试") ||
      text.includes("锁单") ||
      text.includes("先锁")
    ) {
      expectedPrice = 10;
      action = "coudan";
    } else if (text.includes("双叠加")) {
      expectedPrice = 10;
      action = "coudan";
    } else if (
      /前\d+(?!分钟)|(?<!\d)0\.\d+|速度|抽奖|领金豆|淘宝搜|红包|虹包|神价|秒杀|神车|手慢无|手快有|好价|神价/.test(
        text
      )
    ) {
      action = "qiangquan";
    } else if (text.includes("1元包邮")) {
      if (!/钢化膜|手机膜|数据线/.test(text)) {
        action = "notice";
      }
    } else if (/大米|盐|猫超/.test(text)) {
      action = "notice";
    }
    return <Ret>{
      type: type!,
      urls,
      quantities,
      expectedPrice: expectedPrice,
      action,
      forcePrice
    };
  }
  if (/速度|锁单|试试|双叠加/.test(text)) {
    return <Ret>{
      action: "notice"
    };
  }
}

export async function getUrls({ urls, platform }: any): Promise<string[]> {
  return Promise.all(urls.map(url => resolveUrl({ data: url }, platform)));
}

export async function getDealedData(data: any) {
  var platform = "taobao";
  if (data.urls[0].includes(".jd.com")) {
    platform = "jingdong";
  }
  data.platform = platform;
  var urls = await getUrls(data);
  data.urls = urls;
  return data;
}

export async function getDealedDataFromText(text: string) {
  var data = resolveText(text);
  data = await getDealedData(data);
  if (!data) {
    throw new Error("无链接");
  }
  return getDealedData(data);
}

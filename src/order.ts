/*
 * @Author: oudingyin
 * @Date: 2019-08-26 20:35:40
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-26 23:14:44
 */
import { resolveUrl, qiangquan } from "./api";
import { Platform } from "./handlers";

interface InfoItem {
  url: string;
  platform: Platform;
  quantity: number;
  skus?: number[];
  expectedPrice?: number;
  datetime?: string;
  mc_dot1?: boolean;
  price_coudan?: number;
  jianlou?: number;
  from_cart?: boolean;
  from_pc?: boolean;
  t?: string;
}

export async function goQiangquan(args: {
  url: string;
  platform: string;
  t: string;
}) {
  var url = await resolveUrl({ data: args.url }, args.platform);
  return qiangquan(
    {
      data: url
    },
    args.t,
    args.platform
  );
  /* url = await resolveUrl({
    data:url
  }, platform) */
}

export async function goQiandan(url: string) {}

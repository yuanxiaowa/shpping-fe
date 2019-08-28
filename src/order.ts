import { getDealedData } from "./tools";
import bus from "./bus";
import { qiangquan as qiangquan_api, buyDirect, coudan } from "./api";
import { Notification } from "element-ui";

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
  await qiangquan(data.urls, undefined, data.platform);
});
bus.$on("coudan", async (data: any) => {
  data = await getDealedData(data);
  var urls = await qiangquan(data.urls, undefined, data.platform);
  data.urls = urls.map(({ url }) => url).filter(Boolean);
  if (data.urls.length === 1) {
    buyDirect(
      {
        url: data.urls[0],
        quantity: data.quantities[0],
        skus: data.skus,
        expectedPrice: data.expectedPrice,
        from_pc: true,
        other: {}
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

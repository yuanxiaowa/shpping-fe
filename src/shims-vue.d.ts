import Vue from "vue";

declare module "*.vue" {
  export default Vue;
}

declare global {
  function taobaoResolveUrls(text: string): Promise<string[]>;
  function taobaoQiangdan(
    url: string,
    num: number,
    datetime?: string
  ): Promise<any>;
  function taobaoQiangquan(url: string): Promise<any>;
  function taobaoCoudan(url: string[]): Promise<any>;
  function taobaoGetCartInfo(): Promise<any>;
  function taobaoCartBuy(time: string, data?: any): Promise<any>;
  function taobaoDirectBuy(time: string, url: string): Promise<any>;
  function taobaoToggleCart(data: any, checked: boolean): Promise<any>;

  function jingdongResolveUrls(text: string): Promise<string[]>;
  function jingdongQiangdan(
    url: string,
    num: number,
    datetime?: string
  ): Promise<any>;
  function jingdongQiangquan(url: string): Promise<any>;
  function jingdongCoudan(url: string[]): Promise<any>;
  function jingdongGetCartInfo(): Promise<any>;
  function jingdongCartBuy(time: string, data?: any): Promise<any>;
  function jingdongDirectBuy(time: string, url: string): Promise<any>;
  function jingdongToggleCart(data: any, checked: boolean): Promise<any>;

  function evalFile(filename: string, reload?: boolean): Promise<any>;
  function evalFunction(code: string): Promise<any>;
}

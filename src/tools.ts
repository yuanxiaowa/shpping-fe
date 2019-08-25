export function resolveGoods(text: string) {
  var type: string;
  var items: string[] | null;
  var nums: number[] | null;
  items = text.match(/(?<![^a-zA-Z0-9])[a-zA-Z0-9]{11}(?![^a-zA-Z0-9])/g);
  if (items) {
    type = "taokouling";
  } else {
    items = text.match(
      /https?:\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?/g
    );
    if (items) {
      type = "url";
    }
  }
  if (items) {
    let nums_arr = text.match(/(?<=(?<!拍)下|拍)\d+/g)!;
    if (nums_arr) {
      nums = items.map((_, i) => Number(nums_arr[i]) || 1);
    } else {
      nums = Array(items.length).fill(1);
    }
    return {
      type: type!,
      items,
      nums
    };
  }
}

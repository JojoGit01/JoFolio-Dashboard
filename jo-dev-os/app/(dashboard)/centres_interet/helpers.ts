import type { BalanceItem } from "./types";

export function buildDonutGradient(balance: BalanceItem[]) {
  const donutGap = 1.2;
  return `conic-gradient(${balance
    .map((item) => {
      const start = balance.slice(0, balance.findIndex((x) => x.label === item.label)).reduce((acc, x) => acc + x.value, 0);
      const end = start + item.value;
      const colorEnd = Math.max(start, end - donutGap);
      return `${item.color} ${start}% ${colorEnd}%, rgba(7,18,37,1) ${colorEnd}% ${end}%`;
    })
    .join(", ")})`;
}

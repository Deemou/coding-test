function solution(users, emoticons) {
  const discountRates = [10, 20, 30, 40];
  const discounts = [];
  let maxSubscribers = 0;
  let maxSales = 0;

  dfs(0);

  return [maxSubscribers, Math.floor(maxSales)];

  function dfs(depth) {
    if (depth === emoticons.length) {
      let subscribers = 0;
      let totalSales = 0;

      users.forEach(([minDiscount, minPrice]) => {
        let totalPurchase = 0;

        emoticons.forEach((price, i) => {
          if (discounts[i] >= minDiscount)
            totalPurchase += price * (1 - discounts[i] / 100);
        });

        if (totalPurchase >= minPrice) subscribers++;
        else totalSales += totalPurchase;
      });

      if (
        subscribers > maxSubscribers ||
        (subscribers === maxSubscribers && totalSales > maxSales)
      ) {
        maxSubscribers = subscribers;
        maxSales = totalSales;
      }

      return;
    }

    for (const rate of discountRates) {
      discounts.push(rate);
      dfs(depth + 1);
      discounts.pop();
    }
  }
}

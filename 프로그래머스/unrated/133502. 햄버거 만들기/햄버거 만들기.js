function solution(ingredient) {
  const RIGHT_ORDER = "1231";
  const ORDER_LENGTH = 4;
  let count = 0;

  for (let i = 0; i < ingredient.length; i++) {
    if (ingredient.slice(i, i + ORDER_LENGTH).join("") === RIGHT_ORDER) {
      count++;
      ingredient.splice(i, ORDER_LENGTH);
      i -= ORDER_LENGTH - 1;
    }
  }

  return count;
}

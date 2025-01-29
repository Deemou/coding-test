function solution(expression) {
  const operators = ["+", "-", "*"];
  const operatorPermutations = getPermutations(operators);
  let maxResult = 0;

  for (const order of operatorPermutations) {
    const result = calculateExpression(expression, order);
    maxResult = Math.max(maxResult, Math.abs(result));
  }

  return maxResult;
}

function getPermutations(arr) {
  const result = [];
  const subArray = [];

  function permute(remaining) {
    if (subArray.length === arr.length) {
      result.push([...subArray]);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      subArray.push(remaining[i]);
      const newRemaining = remaining.filter((_, index) => index !== i);
      permute(newRemaining);
      subArray.pop();
    }
  }

  permute(arr);
  return result;
}

function calculateExpression(expression, order) {
  let tokens = expression
    .match(/\d+|[+\-*]/g)
    .map((token) => (isNaN(token) ? token : Number(token)));

  for (const op of order) {
    const newTokens = [];
    let i = 0;

    while (i < tokens.length) {
      if (tokens[i] === op) {
        const num1 = newTokens.pop();
        const num2 = tokens[i + 1];
        let result = 0;

        if (op === "+") result = num1 + num2;
        else if (op === "-") result = num1 - num2;
        else if (op === "*") result = num1 * num2;

        newTokens.push(result);
        i += 2;
      } else {
        newTokens.push(tokens[i]);
        i++;
      }
    }

    tokens = newTokens;
  }

  return tokens[0];
}

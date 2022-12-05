function solution(food) {
  const deployments = [];
  for (let i = 1; i < food.length; i++) {
    const number = Math.floor(food[i] / 2);
    const deployment = i.toString().repeat(number);
    deployments.push(deployment);
  }
  return [...deployments, 0, ...deployments.reverse()].join('');
}

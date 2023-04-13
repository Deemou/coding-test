function solution(N, roads, K) {
  const deliveryTime = Array(N + 1).fill(0);
  const visit = Array(N + 1).fill(false);
  visit[1] = true;

  const roadmap = roads.reduce((map, road) => {
    const [t1, t2, distance] = road;
    const arr1 = map.get(t1) || [];
    arr1.push([t2, distance]);
    map.set(t1, arr1);
    const arr2 = map.get(t2) || [];
    arr2.push([t1, distance]);
    map.set(t2, arr2);

    return map;
  }, new Map());

  const queue = [[1, 0]];

  while (queue.length > 0) {
    const [current, totalTime] = queue.shift();
    visit[current] = true;
    deliveryTime[current] =
      deliveryTime[current] > 0 ? Math.min(deliveryTime[current], totalTime) : totalTime;
    for (let road of roadmap.get(current)) {
      const [next, distance] = road;
      if (visit[next] === true && deliveryTime[next] <= totalTime + distance) continue;
      queue.push([next, totalTime + distance]);
    }
  }
  return deliveryTime.filter((x) => x <= K && x > 0).length + 1;
}
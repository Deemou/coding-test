function solution(info, edges) {
  const SHEEP = 0;

  const tree = Array.from({ length: info.length }, () => []);
  const visited = Array(info.length).fill(false);
  visited[0] = true;

  edges.forEach(([from, to]) => {
    tree[from].push(to);
  });

  return countMaxSheep(0, 0, 0, []);

  function countMaxSheep(node, sheepCount, wolfCount, accessibleNodes) {
    if (info[node] === SHEEP) sheepCount++;
    else wolfCount++;

    if (wolfCount >= sheepCount) return sheepCount;
    let currentMaxSheep = sheepCount;

    for (const child of tree[node]) {
      accessibleNodes.push(child);
    }

    for (let nextNode of accessibleNodes) {
      if (visited[nextNode]) continue;
      visited[nextNode] = true;
      currentMaxSheep = Math.max(
        currentMaxSheep,
        countMaxSheep(nextNode, sheepCount, wolfCount, [...accessibleNodes])
      );
      visited[nextNode] = false;
    }

    return currentMaxSheep;
  }
}
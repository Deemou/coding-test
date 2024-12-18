function solution(info, edges) {
  const SHEEP = 0;

  const tree = Array.from({ length: info.length }, () => ({
    parent: null,
    children: new Set(),
  }));
  // 인접한 양들을 하나의 그룹으로 만든 트리
  const groupedTree = Array.from({ length: info.length }, () => ({
    parent: null,
    children: new Set(),
    sheepCount: 0,
  }));
  const visited = Array(info.length).fill(false);
  visited[0] = true;

  // 트리 구성
  edges.forEach(([parent, child]) => {
    tree[parent].children.add(child);
    tree[child].parent = parent;
  });

  // 그룹 트리 구성
  for (let i = 0; i < info.length; i++) {
    const parent = tree[i].parent;
    // 양일 때 부모가 양이 아닌 경우에만 그룹화
    if (info[i] === SHEEP && info[parent] !== SHEEP) {
      if (parent !== null) groupedTree[parent].children.add(i);
      groupedTree[i].parent = parent;
      groupedTree[i].sheepCount = 1;
      groupSheep(i, i);
    } else if (info[i] !== SHEEP && groupedTree[i].parent === null) {
      groupedTree[parent].children.add(i);
      groupedTree[i].parent = parent;
    }
  }

  return countMaxSheep(0, 0, 0, []);

  function groupSheep(startNode, currentNode) {
    if (startNode !== currentNode) groupedTree[currentNode] = null;

    for (const child of tree[currentNode].children) {
      if (info[child] === SHEEP) {
        groupedTree[startNode].sheepCount++;
        groupSheep(startNode, child);
      } else {
        groupedTree[startNode].children.add(child);
        groupedTree[child].parent = startNode;
      }
    }
  }

  function countMaxSheep(node, sheepCount, wolfCount, accessibleNodes) {
    if (info[node] === SHEEP) sheepCount += groupedTree[node].sheepCount;
    else wolfCount++;

    if (wolfCount >= sheepCount) return sheepCount;

    let currentMaxSheep = sheepCount;

    for (const child of groupedTree[node].children) {
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
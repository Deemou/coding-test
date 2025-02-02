function solution(nodeinfo) {
  const nodes = nodeinfo.map((info, index) => ({
    x: info[0],
    y: info[1],
    index: index + 1,
  }));

  nodes.sort((a, b) => b.y - a.y || a.x - b.x);

  const preOrder = [];
  const postOrder = [];

  const root = buildTree(nodes[0], -Infinity, Infinity);
  traverse(root);

  return [preOrder, postOrder];

  function buildTree(node, leftBound, rightBound) {
    if (!node) return null;

    const leftNode = nodes.find(
      (n) => n.x < node.x && n.y < node.y && n.x > leftBound && n.x < rightBound
    );
    const rightNode = nodes.find(
      (n) => n.x > node.x && n.y < node.y && n.x > leftBound && n.x < rightBound
    );

    return {
      node: node,
      left: buildTree(leftNode, leftBound, node.x),
      right: buildTree(rightNode, node.x, rightBound),
    };
  }

  function traverse(node) {
    if (!node) return;

    preOrder.push(node.node.index);
    traverse(node.left);
    traverse(node.right);
    postOrder.push(node.node.index);
  }
}

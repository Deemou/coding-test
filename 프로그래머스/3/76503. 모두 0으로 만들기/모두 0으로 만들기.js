function solution(a, edges) {
    const n = a.length;
    const graph = Array.from({ length: n }, () => []);
    let totalWeight = a.reduce((sum, val) => sum + BigInt(val), BigInt(0));
    let totalMoves = BigInt(0);

    if (totalWeight !== BigInt(0)) return -1;

    edges.forEach(([u, v]) => {
        graph[u].push(v);
        graph[v].push(u);
    });

    const stack = [];
    const parents = Array(n).fill(-1);
    const order = [];
    stack.push(0);

    while (stack.length) {
        const node = stack.pop();
        order.push(node);

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (parents[node] === neighbor) continue;
            parents[neighbor] = node;
            stack.push(neighbor);
        }
    }

    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];
        let excess = BigInt(a[node]);

        for (const neighbor of graph[node]) {
            if (parents[node] === neighbor) continue;
            excess += BigInt(a[neighbor]);
        }

        totalMoves += BigInt(Math.abs(Number(excess)));
        a[node] = Number(excess);
    }

    return totalMoves;
}

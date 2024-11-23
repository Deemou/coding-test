class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority });
    this.heapUp();
  }

  dequeue() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown();

    return max;
  }

  heapUp() {
    let child = this.size() - 1;

    while (child > 0) {
      const parent = this.getParent(child);
      if (this.heap[child].priority <= this.heap[parent].priority) break;

      this.swap(child, parent);
      child = parent;
    }
  }

  heapDown() {
    let parent = 0;

    while (true) {
      const left = this.getLeftChild(parent);
      const right = this.getRightChild(parent);
      let biggest = parent;

      if (
        this.isValidChild(left) &&
        this.heap[left].priority > this.heap[biggest].priority
      ) {
        biggest = left;
      }
      if (
        this.isValidChild(right) &&
        this.heap[right].priority > this.heap[biggest].priority
      ) {
        biggest = right;
      }

      if (biggest === parent) break;

      this.swap(parent, biggest);
      parent = biggest;
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getParent(child) {
    return Math.floor((child - 1) / 2);
  }
  getLeftChild(parent) {
    return parent * 2 + 1;
  }
  getRightChild(parent) {
    return parent * 2 + 2;
  }
  isValidChild(index) {
    return index < this.size();
  }
}

function solution(picks, minerals) {
  const DIAMOND = "diamond";
  const IRON = "iron";
  const STONE = "stone";
  const MAX_MINERALS_PER_PICK = 5;

  const fatigueCost = {
    diamond: [1, 1, 1],
    iron: [5, 1, 1],
    stone: [25, 5, 1],
  };

  const MINERAL_LIST = [DIAMOND, IRON, STONE];

  const REQUIRED_PICKS = Math.ceil(minerals.length / MAX_MINERALS_PER_PICK);
  const TOTAL_PICKS = picks.reduce((acc, cur) => acc + cur, 0);
  const PICKS_TO_BE_USED = Math.min(REQUIRED_PICKS, TOTAL_PICKS);
  const remainingPicks = [...picks];
  const pq = new PriorityQueue();
  let minFatigueSum = 0;

  for (let i = 0; i < PICKS_TO_BE_USED; i++) {
    const startIdx = i * MAX_MINERALS_PER_PICK;
    const endIdx = startIdx + MAX_MINERALS_PER_PICK;
    const mineralGroup = minerals.slice(startIdx, endIdx);

    const fatigueSumWithDimondPick = mineralGroup.length;
    let fatigueSumWithIronPick = 0;
    let fatigueSumWithStonePick = 0;

    for (const mineral of mineralGroup) {
      fatigueSumWithIronPick +=
        fatigueCost[IRON][MINERAL_LIST.indexOf(mineral)];
      fatigueSumWithStonePick +=
        fatigueCost[STONE][MINERAL_LIST.indexOf(mineral)];
    }

    pq.enqueue(
      [
        fatigueSumWithDimondPick,
        fatigueSumWithIronPick,
        fatigueSumWithStonePick,
      ],
      fatigueSumWithStonePick
    );
  }

  for (let i = 0; i < PICKS_TO_BE_USED; i++) {
    const [
      fatigueSumWithDimondPick,
      fatigueSumWithIronPick,
      fatigueSumWithStonePick,
    ] = pq.dequeue().value;

    let fatigueSum = 0;
    if (remainingPicks[0]) {
      fatigueSum = fatigueSumWithDimondPick;
      remainingPicks[0]--;
    } else if (remainingPicks[1]) {
      fatigueSum = fatigueSumWithIronPick;
      remainingPicks[1]--;
    } else {
      fatigueSum = fatigueSumWithStonePick;
      remainingPicks[2]--;
    }

    minFatigueSum += fatigueSum;
  }

  return minFatigueSum;
}
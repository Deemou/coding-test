class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(value) {
    this.heap.push(value);
    this.heapUp();
  }

  dequeue() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown();

    return min;
  }

  heapUp() {
    let child = this.size() - 1;

    while (child > 0) {
      const parent = this.getParent(child);
      if (this.isLowerPriorityThan(child, parent)) break;

      this.swap(child, parent);
      child = parent;
    }
  }

  heapDown() {
    let parent = 0;

    while (true) {
      const left = this.getLeftChild(parent);
      const right = this.getRightChild(parent);
      let highest = parent;

      if (this.isValidChild(left) && this.isLowerPriorityThan(highest, left))
        highest = left;

      if (this.isValidChild(right) && this.isLowerPriorityThan(highest, right))
        highest = right;

      if (highest === parent) break;

      this.swap(parent, highest);
      parent = highest;
    }
  }

  isLowerPriorityThan(a, b) {
    if (this.heap[a].requiredTime > this.heap[b].requiredTime) return true;

    if (
      this.heap[a].requiredTime === this.heap[b].requiredTime &&
      this.heap[a].requestTime > this.heap[b].requestTime
    )
      return true;

    if (
      this.heap[a].requiredTime === this.heap[b].requiredTime &&
      this.heap[a].requestTime === this.heap[b].requestTime &&
      this.heap[a].jobNumber > this.heap[b].jobNumber
    )
      return true;

    return false;
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

function solution(jobs) {
  const pq = new PriorityQueue();
  let currentTime = 0;
  let totalReturnTime = 0;
  let completedJobs = 0;

  jobs.sort((a, b) => a[0] - b[0]);

  let jobIndexToBeEnqueued = 0;
  while (completedJobs < jobs.length) {
    while (
      jobIndexToBeEnqueued < jobs.length &&
      jobs[jobIndexToBeEnqueued][0] <= currentTime
    ) {
      const job = {
        jobNumber: jobIndexToBeEnqueued,
        requestTime: jobs[jobIndexToBeEnqueued][0],
        requiredTime: jobs[jobIndexToBeEnqueued][1],
      };

      pq.enqueue(job);
      jobIndexToBeEnqueued++;
    }

    if (!pq.isEmpty()) {
      const job = pq.dequeue();
      currentTime += job.requiredTime;
      totalReturnTime += currentTime - job.requestTime;
      completedJobs++;
    } else currentTime = jobs[jobIndexToBeEnqueued][0];
  }

  return Math.floor(totalReturnTime / jobs.length);
}

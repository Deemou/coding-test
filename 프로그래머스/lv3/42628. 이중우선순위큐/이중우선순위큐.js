function solution(operations) {
  const pQueue = new PriorityQueue();

  for (let i = 0; i < operations.length; i++) {
    let [command, num] = operations[i].split(' ');
    num = +num;
    console.log(command, num);

    switch (command) {
      case 'I':
        pQueue.enqueue(num, num);
        break;
      case 'D':
        if (num === 1) pQueue.dequeueRear();
        else if (num === -1) pQueue.dequeueFront();
        break;
    }
  }

  if (pQueue.isEmpty()) return [0, 0];
  return [pQueue.rear().element, pQueue.front().element];
}

class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  front() {
    return this.items[0];
  }

  rear() {
    return this.items.at(-1);
  }

  enqueue(element, priority) {
    const qElement = new QElement(element, priority);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }

  dequeueFront() {
    if (this.isEmpty()) return;
    this.items.shift();
  }

  dequeueRear() {
    if (this.isEmpty()) return;
    this.items.pop();
  }
}
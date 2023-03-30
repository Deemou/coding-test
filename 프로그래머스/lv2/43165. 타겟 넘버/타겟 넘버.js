class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(elem) {
    return this.items.push(elem);
  }
  dequeue() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

function bfs(numbers, target) {
  const queue = new Queue();
  queue.enqueue([numbers[0], -numbers[0]]);
  let index = 1;
  let answer = 0;

  while (!queue.isEmpty()) {
    let list = queue.dequeue();

    if (index !== numbers.length) {
      let newList = [];

      for (let num of list) {
        newList.push(num + numbers[index]);
        newList.push(num - numbers[index]);
      }

      index++;
      queue.enqueue(newList);
    } else {
      for (let num of list) {
        if (num === target) {
          answer++;
        }
      }
    }
  }

  return answer;
}

function solution(numbers, target) {
  let answer = bfs(numbers, target);

  return answer;
}
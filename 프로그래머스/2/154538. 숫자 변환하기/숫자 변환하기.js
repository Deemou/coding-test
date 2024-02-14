class Queue {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }

  enqueue(data) {
    this.inbox.push(data);
  }

  dequeue() {
    if (!this.outbox.length) {
      while (this.inbox.length) {
        this.outbox.push(this.inbox.pop());
      }
    }

    return this.outbox.pop();
  }

  size() {
    return this.inbox.length + this.outbox.length;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

function solution(x, y, n) {
    const MAX = 1000000;
    const queue = new Queue();
    queue.enqueue([x, 0]);
    const visited = Array(MAX+1).fill(false);
    visited[x] = true;
    
    while(!queue.isEmpty()) {
        const [cx, cnt] = queue.dequeue();
        if(cx === y) return cnt;
        
        const nx = [cx + n, cx * 2, cx * 3];
        for (let i = 0; i < 3; i++) {
            if (nx[i] > MAX || visited[nx[i]]) continue;
            visited[nx[i]] = true;
            queue.enqueue([nx[i], cnt + 1]);
        }
    }
    
    return -1;
}
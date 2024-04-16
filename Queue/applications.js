const Queue = require("./queue-list");

function reverseQueue(queue) {
  if (queue.empty()) return;
  const frontVal = queue.front();
  queue.pop();
  reverseQueue(queue);
  queue.push(frontVal);
}

// Queue using Stack - enqueue operation costly

// Queue using Stack - dequeue operation costly

// // Queue using Stack - only one stack

class StackPopCostly {
  constructor() {
    this.queue1 = new Queue();
    this.queue2 = new Queue();
  }
  push(x) {
    this.queue1.push(x);
  }
  pop() {
    while (this.queue1.size > 1) {
      const val = this.queue1.front();
      this.queue1.pop();
      this.queue2.push(val);
    }
    const val = this.queue1.front();
    this.queue1.pop();
    let temp = this.queue1;
    this.queue1 = this.queue2;
    this.queue2 = temp;
    return val;
  }
}

class Stack {
  constructor() {
    this.queue1 = new Queue();
    this.queue2 = new Queue();
  }

  push(x) {
    this.queue2.push(x);
    while (!this.queue1.empty()) {
      const val = this.queue1.front();
      this.queue1.pop();
      this.queue2.push(val);
    }
    let temp = this.queue1;
    this.queue1 = this.queue2;
    this.queue2 = temp;
  }

  pop() {
    const val = this.queue1.front();
    this.queue1.pop();
    return val;
  }
}

class StackUsingASingleQueue {
  constructor() {
    this.queue = new Queue();
  }

  push(x) {
    if (this.queue.empty()) {
      this.queue.push(x);
      return;
    }
    const val = this.queue.front();
    this.queue.pop();
    this.push(x);
    this.queue.push(val);
  }

  pop() {
    const val = this.queue.front();
    this.queue.pop();
    return val;
  }
}

function main() {
  const queue = new Queue();
  queue.push(10);
  queue.push(20);
  queue.push(30);
  queue.print();
  reverseQueue(queue);
  queue.print();
  const stack = new Stack();
  stack.push(20);
  stack.push(30);
  console.log(stack.pop());

  const stack2 = new StackUsingASingleQueue();
  stack2.push(20);
  stack2.push(30);
  stack2.push(40);
  console.log(stack2.pop());
  console.log(stack2.pop());

  const stack3 = new StackPopCostly();
  stack3.push(20);
  stack3.push(30);
  stack3.push(40);
  console.log(stack3.pop());
  console.log(stack3.pop());
}

main();

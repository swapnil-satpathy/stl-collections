class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
  }

  push(x) {
    const newNode = new Node(x);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    newNode.next = this.head;
    this.head = newNode;
  }

  top() {
    if (!this.head) return null;
    return this.head.val;
  }

  pop() {
    if (!this.head) return;
    this.head = this.head.next;
  }

  empty() {
    return !this.head;
  }
}

module.exports = Stack;

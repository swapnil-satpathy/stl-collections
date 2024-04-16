// A Doubly Linked List Node
class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}


class Deque {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  pushFront(val) {
    const node = new Node(val);
    if(!this.front) {
      this.front = node;
      this.rear = node;
      return;
    }
    this.front.prev = node;
    node.next = this.front;
    this.front = node;
  }
  popFront() {
    if(!this.empty()) {
      const val = this.front.val;
      this.front = this.front.next;
      if(this.front) {
        this.front.prev = null;
      } else {
        this.rear = null;
      }
      return val;
    } else {
      return null;
    }
  }

  pushBack(val) {
    const node = new Node(val);
    if(!this.front) {
      this.front = node;
      this.rear = node;
      return;
    }
    node.prev = this.rear;
    this.rear.next = node;
    this.rear = node;
  }

  popBack() {
    if(!this.empty()) {
      const val = this.rear.val;
      this.rear = this.rear.prev;
      if(this.rear) {
        this.rear.next = null;
      } else {
        this.front = null;
      }
      return val;
    } else {
      return null;
    }
  }

  empty() {
    return !this.front;
  }

  print() {
    const result = [];
    for(let curr = this.front; curr !== null; curr = curr.next) {
      result.push(curr.val);
    }
    console.log(result.join('-->'));
  }
  tail() {
    if(this.rear) {
      return this.rear.val;
    }
    return null;
  }

  head() {
    if(this.front) {
      return this.front.val;
    }
    return null;
  }
}

module.exports = Deque;

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class QueueList {
  constructor() {
    this.frontNode = null;
    this.size = 0;
    this.rearNode = null;
  }
  /*
  enqueue(val) --> Add element val into the front of the linked list.
  Time Complexity --> 0(1)
  */
  push(val) {
    const newNode = new Node(val);
    this.size += 1;
    if (!this.frontNode) {
      this.frontNode = newNode;
      this.rearNode = newNode;
    } else {
      this.rearNode.next = newNode;
      this.rearNode = newNode;
    }
  }

  /*
  dequeue() --> Remove the element from the front of the linked list.
  Time Complexity --> 0(1)
  */
  pop() {
    if (!this.frontNode) return;
    this.size -= 1;
    this.frontNode = this.frontNode.next;
  }

  empty() {
    return !this.frontNode;
  }

  front() {
    return this.frontNode.val;
  }

  print() {
    const result = [];
    let curr = this.frontNode;
    while (curr) {
      result.push(curr.val);
      curr = curr.next;
    }
    console.log(result.join(" "));
  }
}

module.exports = QueueList;

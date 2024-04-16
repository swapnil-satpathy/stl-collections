class Queue {
  constructor(cap = Number.MAX_SAFE_INTEGER) {
    this.frontIndx = 0;
    this.arr = new Array(cap);
    this.size = 0;
    this.capacity = cap;
  }

  /*
    enqueue(val) --> Add element val into the front of the arr.
    Time Complexity --> 0(1)
    */

  push(val) {
    if (this.full()) return;
    let rear = this.rearIndx();
    rear = (rear + 1) % this.capacity;
    this.arr[rear] = val;
    this.size += 1;
  }

  /*
    dequeue() --> Remove the element from the front of the arr.
    Time Complexity --> 0(1)
    */
  pop() {
    if (this.empty()) return;
    this.size -= 1;
    this.frontIndx = (this.frontIndx + 1) % this.capacity;
  }

  /*
    rearIndx() --> Get the rear index of the arr.
    Time Complexity --> 0(1)
    */

  rearIndx() {
    if (this.empty()) {
      return -1;
    }
    return (this.frontIndx + this.size - 1) % this.capacity;
  }

  full() {
    return this.size === this.capacity;
  }

  empty() {
    return this.size === 0;
  }

  /*
    front() --> Get the front of the arr.
    Time Complexity --> 0(1)
    */
  front() {
    if (this.empty()) {
      return null;
    }
    return this.arr[this.frontIndx];
  }

  print() {
    const result = [];
    let len = this.size;
    for (let i = this.frontIndx; len > 0; i = (i + 1) % this.capacity) {
      len -= 1;
      result.push(this.arr[i]);
    }

    console.log(result.join(" "));
  }
}

module.exports = Queue;

class SimpleStack {
  constructor() {
    this.top = -1;
    this.arr = [];
  }

  push(x) {
    this.top += 1;
    this.arr[this.top] = val;
  }

  pop() {
    const val = this.arr[this.top];
    this.top -= 1;
    return val;
  }

  empty() {
    return this.top === -1;
  }

  size() {
    return this.top + 1;
  }
}

module.exports = SimpleStack;

class TwoStacks {
  constructor(n) {
    this.arr = new Array(n);
    this.top1 = -1;
    this.top2 = n;
  }

  pushToFirst(val) {
    if (this.top1 + 1 === this.top2) {
      throw new Error("Space Full");
    }
    this.top1 += 1;
    this.arr[this.top1] = val;
  }

  pushToSecond(val) {
    if (this.top1 + 1 === this.top2) {
      throw new Error("Space Full");
    }
    this.top2 -= 1;
    this.arr[this.top2] = val;
  }

  popFromFirst() {
    if (this.top1 === -1) {
      throw new Error("Stack 1 is empty");
    }

    const ele = this.arr[this.top1];
    this.top1 -= 1;
    return ele;
  }

  popFromSecond() {
    if (this.top2 === this.arr.length) {
      throw new Error("Stack 2 is empty");
    }
    const ele = this.arr[this.top2];
    this.top2 += 1;
    return ele;
  }

  printFirstStack() {
    let curr = this.top1;
    while (curr >= 0) {
      console.log(this.arr[curr]);
      curr -= 1;
    }
  }

  printSecondStack() {
    let curr = this.top2;
    while (curr < this.arr.length) {
      console.log(this.arr[curr]);
      curr += 1;
    }
  }
}

const twoStacks = new TwoStacks(5);
twoStacks.pushToFirst(1);
twoStacks.pushToSecond(2);
twoStacks.pushToFirst(3);
twoStacks.pushToSecond(4);
twoStacks.pushToSecond(5);
twoStacks.popFromSecond();

twoStacks.printFirstStack();
twoStacks.printSecondStack();

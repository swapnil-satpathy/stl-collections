class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  insert(val) {
    const node = new Node(val);
    this.size += 1;
    if(!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
  }

  deleteFirst() {
    if(!this.head) return;
    this.size -= 1;
    this.head = this.head.next;
  }
  middleNode() {
    let slow = this.head;
    let fast = this.head;
    while(fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    while(curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  recursiveReverse(curr, prev) {
    if(!curr) return prev;
    const next = curr.next;
    curr.next = prev;
    this.recursiveReverse(next, curr);
  }

  removeDuplicates() {
    let curr = this.head;
    while(curr && curr.next) {
      if(curr.val === curr.next.val) {
        curr = curr.next.next;
      } else {
        curr = curr.next;
      }
    }
  }

   /*
   Points to be noted for Loop (Floyd's Cycle Detection Algorithm)
   -----------------------------------------------------------------------------

   1. Fast Pointer will enter the loop before or at the same time as slow pointer
   2. The distance between these two pointers increase by 1 in every movement/iteration.
   3. When distance between them becomes length of the cycle, they meet.

   Proof for this is required
   -----------------------------------------



   */
  isLoopPresent() {
    if(!this.head || !this.head.next) {
      return false;
    }
    let slow = this.head;
    let fast = this.head.next;
    while(fast && fast.next && slow !== fast) {
      slow = slow.next;
      fast = fast.next.next;
    }
    if(slow === fast) {
      return true;
    }
    return false;
  }


  kthNodefromEnd(k) {
    if(k > this.size) return null;
    let ahead = this.head;
    let i = 0;
    while(i < k && ahead) {
      ahead = ahead.next;
      i += 1;
    }
    let behind = this.head;
    while(ahead) {
      ahead = ahead.next;
      behind = behind.next;
    }
    return behind;
  }

  print() {
    let curr = this.head;
    const result = [];
    while(curr) {
      result.push(curr.val);
      curr = curr.next;
    }
    console.log(result.join('-->'));
  }

  isPalindrome() {
    const mid = this.middleNode();
    let rev = this.recursiveReverse(mid.next, null);
    let curr = this.head;
    while(rev) {
      if(curr.val !== rev.val) return false;
      curr = curr.next;
      rev = rev.next;
    }
    return true;
  }

  countNodes() {
    let curr = this.head;
    let count = 0;
    while(curr) {
      curr = curr.next;
      count += 1;
    }
    return count;
  }
}

module.exports = LinkedList;

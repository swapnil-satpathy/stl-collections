const LinkedList = require('./linked-list');
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function mergeTwoSortedLists(list1, list2) {
  let curr1 = list1.head;
  let curr2 = list2.head;
  const list = new LinkedList();
  while(curr1 && curr2) {
    if(curr1.val <= curr2.val) {
      if(!list.head) {
        list.head = curr1;
        list.tail = curr1;
      } else {
        list.tail.next = curr1;
        list.tail = curr1;
      }
    } else {
      if(!list.head) {
        list.head = curr2;
        list.tail = curr2;
      } else {
        list.tail.next = curr2;
        list.tail = curr2;
      }
    }
  }
  while(curr1) {
    if(!list.head) {
      list.head = curr1;
      list.tail = curr1;
    } else {
      list.tail.next = curr1;
      list.tail = curr1;
    }
  }
  while(curr2) {
    if(!list.head) {
      list.head = curr2;
      list.tail = curr2;
    } else {
      list.tail.next = curr2;
      list.tail = curr2;
    }
  }
  return list;
}

// Assumption is that curr is not the last node
function deleteNode(curr) {
  curr.val = curr.next.val;
  curr = curr.next.next;
}

function segregateEvenOddNodes(head) {
  const evenList = new LinkedList();
  const oddList = new LinkedList();
  let curr = head;
  while(curr) {
    if(curr.val % 2 === 0) {
      if(!evenList.head) {
        evenList.head = curr;
        evenList.tail = curr;
      } else {
        evenList.tail.next = curr;
        evenList.tail = curr;
      }
    } else {
      if(!oddList.head) {
        oddList.head = curr;
        oddList.tail = curr;
      } else {
        oddList.tail.next = curr;
        oddList.tail = curr;
      }
    }
    curr = curr.next;
  }
  evenList.tail.next = oddList;
  oddList.tail.next = null;
  return evenList;
}

function instersectionPoint(list1, list2) {
  const numberOfNodes1 = list1.countNodes();
  const numberOfNodes2 = list2.countNodes();
  let curr1 = list1.head;
  let k = 0;
  if (numberOfNodes1 < numberOfNodes2) {
    const temp = list1;
    list1 = list2;
    list2 = temp;
  }
  while(curr1 && k < Math.abs(numberOfNodes1 - numberOfNodes2)) {
    curr1 = curr1.next;
    k += 1;
  }
  let curr2 = list2.head;
  while(curr1 && curr2) {
    if(curr1 === curr2 || curr1.val === curr2.val) {
      return true;
    }
    curr1 = curr1.next;
    curr2 = curr2.next;
  }
  return false;
}

/*
Create a map
Do this for every node
m[curr] = new Node(curr.data)

Traverse the list again do this for every node curr
m[curr].next = m[curr.next]
m[curr].random = m[curr.random]

*/
function clone(head) {
  let curr = head;
  while(curr) {
    const next = curr.next;
    curr.next = new Node(curr.val);
    curr.next.next = next;
    curr = next;
  }
  curr = head;
  while(curr) {
    curr.next.random = curr.random ? curr.random.next : null;
    curr = curr.next.next;
  }
  const cloneList = new LinkedList();
  curr = head;
  while(curr) {
    const next = curr.next;
    curr.next = curr.next.next;
    if(!cloneList.head) {
      cloneList.head = next;
      cloneList.tail = next;
    } else {
      cloneList.tail.next = next;
      cloneList.tail = next;
    }
    curr = curr.next;
  }
  cloneList.tail.next = null;
  return cloneList;
}

function reverseInGroupOfSizeK(head, k) {
  let curr = head;
  let prev = null;
  let next = null;
  let count = 0;
  while(curr && count < k) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    count += 1;
  }
  if(next) {
    const rev = reverseInGroupOfSizeK(next, k);
    head.next = rev;
  }
  return prev;
}

function main() {
  const list = new LinkedList();
  list.insert(1);
  list.insert(2);
  list.insert(3);
  list.insert(4);
  list.head = reverseInGroupOfSizeK(list.head, 2);
  list.print();
}

main();

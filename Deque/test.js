const Deque = require('./deque');

function main() {
  const deque = new Deque();
  deque.pushFront(1);
  deque.pushFront(2);
  deque.pushFront(3);
  deque.popBack();
  deque.pushBack(5);
  deque.pushBack(6);
  deque.popFront();
  deque.print();
}

main();

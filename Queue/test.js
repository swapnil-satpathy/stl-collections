const Queue = require("./queue");
const QueueList = require("./queue-list");

const queue = new Queue(3);
queue.push(10);
queue.push(20);
queue.push(30);
queue.print();

queue.pop();
queue.pop();
queue.print();

queue.push(40);
queue.print();

const queueLinked = new QueueList(3);
queueLinked.push(10);
queueLinked.push(20);
queueLinked.push(30);
queueLinked.print();

queueLinked.pop();
queueLinked.pop();
queueLinked.print();

queueLinked.push(40);
queueLinked.print();

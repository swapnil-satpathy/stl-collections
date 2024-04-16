const Deque = require('./deque');


function printMaxOfAllSubarrays(arr, n, k) {
    const deque = new Deque();
    for (let i = 0; i < k; i += 1) {
        while (!deque.empty() && arr[i] >= arr[deque.tail()]) {
            deque.popBack();
        }
        deque.pushBack(i);
    }
    for (let i = k; i < n; i += 1) {
        console.log(arr[deque.head()]);
        while (!deque.empty() && deque.head() <= (i - k)) {
            deque.popFront();
        }
        while (!deque.empty() && arr[i] >= arr[deque.tail()]) {
            deque.popBack();
        }
        deque.pushBack(i);
    }
    console.log(arr[deque.head()]);
}

function firstCircularTour(petrol, distance, n) {
    let start = 0;
    let curr_petrol = 0;
    let prev_petrol = 0;
    for (let i = 0; i < n; i += 1) {
        curr_petrol += (petrol[i] - distance[i]);
        if (curr_petrol < 0) {
            start = i + 1;
            prev_petrol += curr_petrol;
            curr_petrol = 0;
        }
    }
    return ((curr_petrol + prev_petrol) >= 0) ? start + 1 : -1;
}


function main() {
  const N = 9;
  const K = 3
  const arr = [1,2,3,1,4,5,2,3,6];
  printMaxOfAllSubarrays(arr, N, K);
}

main();

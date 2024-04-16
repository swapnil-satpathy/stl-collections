/*
 0(n ^ 2)
 Stable
 In-Place
 The largest element is bubbling to the end of the array in every pass
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

/*
O(n ^ 2)
Best Case -> 0(n)
Stable
In-Place
*/
function bubbleSortOptimized(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (swapped === false) {
      break;
    }
  }
}

/*
0(n * n)
Not Stable
In-PLace
Basic Idea is we find out the minimum element and we put it in the first position
Less memory writes
Why is it not stable ?
90 80 90 25

After first pass
25 80 90 90

So here only we can see the order changes
*/

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    let min_index = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[min_index] > arr[j]) {
        min_index = j;
      }
    }
    const temp = arr[min_index];
    arr[min_index] = arr[i];
    arr[i] = temp;
  }
}

/*
 O(n ^ 2) in worst case. O(n) in best case.
 Used in practice for small arrays
 In-place and Stable

Array is divided into two parts => Left half sorted and right half unsorted
*/

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = key;
  }
}

/*
Stable
0(n * logn) and O(n) space
Well suited for linked lists as works in O(1) space
Used in external sorting
In general for arrays, Quicksort outperforms merge sort
*/
function merge(arr, low, mid, high) {
  const lowArr = arr.slice(low, mid + 1);
  const highArr = arr.slice(mid + 1, high + 1);
  let lowPtr = 0;
  let highPtr = 0;
  for (let i = low; i <= high; i += 1) {
    if (arr[lowPtr] < arr[highPtr]) {
      arr[i] = lowArr[lowPtr];
      lowPtr += 1;
    } else {
      arr[i] = highArr[highPtr];
      highPtr += 1;
    }
    if (lowPtr === lowArr.length) {
      while (highPtr < highArr.length) {
        arr[i] = highArr[highPtr];
        highPtr += 1;
        i += 1;
      }
    }
    if (highPtr === highArr.length) {
      while (lowPtr < lowArr.length) {
        arr[i] = lowArr[lowPtr];
        lowPtr += 1;
        i += 1;
      }
    }
  }
}

/*
We are doing 0(n) work at every level of the recursion tree
*/
function mergeSort(arr) {
  let low = 0;
  let high = arr.length - 1;
  function mergesort(arr, low, high) {
    if (high >= low) return;
    let mid = low + Math.floor((high - low) / 2);
    mergesort(arr, low, mid);
    mergesort(arr, mid + 1, high);
    merge(arr, low, mid, high);
  }
  mergesort(arr, low, high);
}

/*
0(n) time and 0(n) space
Stable
*/
function partition(arr, left, right, partitionIndex) {
  const temp = [];
  for (let i = left; i <= right; i += 1) {
    if (arr[i] <= arr[partitionIndex]) {
      temp.push(arr[i]);
    }
  }
  for (let i = left; i <= right; i += 1) {
    if (arr[i] > arr[partitionIndex]) {
      temp.push(arr[i]);
    }
  }
  for (let i = left; i <= right; i += 1) {
    arr[i] = temp[i - left];
  }
}

function swap(arr, index1, index2) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

/*
 We assume last element as pivot.
 Not stable
*/
function lomutoParition(arr, left, right) {
  const partition = arr[right];
  let partitionIndex = left - 1;
  for (let i = left; i <= right; i += 1) {
    if (arr[i] < partition) {
      partitionIndex += 1;
      swap(arr, partitionIndex, i);
    }
  }
  swap(arr, partitionIndex + 1, right);
  return partitionIndex + 1;
}

/*
Not stable
*/
function hoarePartition(arr, left, right) {
  const partition = arr[right];
  let i = left - 1;
  let j = right + 1;
  while (true) {
    // do while is needed if arr[i] and arr[j] are same value, then it will result in infinite loop
    do {
      i += 1;
    } while (arr[i] < partition);
    do {
      j -= 1;
    } while (arr[j] > partition);
    if (i >= j) return j;
    swap(arr, i, j);
  }
}

const arr = [12, 12, 12, 12];
console.log(hoarePartition(arr, 0, arr.length - 1));
console.log(arr);

/*
Quick Sort
-----------------------
Divide and Conquer
Worst case is 0(n * n)
in-place
Cache friendly
Avg Case is 0(n logn)
Tail Recursive
*/

function quickSortLomuto(arr, left, right) {
  if (left < right) {
    const partition = lomutoParition(arr, left, right);
    quickSortLomuto(arr, left, partition - 1);
    quickSortLomuto(arr, partition + 1, right);
  }
}

function quickSort(arr, left, right) {
  if (left < right) {
    const partition = hoarePartition(arr, left, right);
    quickSort(arr, left, partition);
    quickSort(arr, partition + 1, right);
  }
}

// Here k is the range
// 0(n + k)
// 0(n + k) space
// Stable
// Not comparison based
function countingSort(arr, k) {
  const length = arr.length;
  const count = new Array(k).fill(0);
  for (const ele of arr) {
    count[ele] += 1;
  }
  for (let i = 1; i < k; i += 1) {
    count[i] = count[i] + count[i - 1];
  }
  const output = new Array(length);
  for (let i = length - 1; i >= 0; i -= 1) {
    // This will give me how many elements are smaller or equal to the curr value i.e arr[i]
    const countValue = count[arr[i]];
    output[countValue - 1] = arr[i];
    count[arr[i]] -= 1;
  }
  for (let i = 0; i < length; i += 1) {
    arr[i] = output[i];
  }
}
// 0(no of digits * (length of array + base))
// 0((length of array + base)) space
function radixSort(arr) {
  const length = arr.length;
  const max = arr.reduce((acc, ele) => {
    acc = Math.max(acc, ele);
    return acc;
  }, Number.MIN_SAFE_INTEGER);
  const countingSort = (arr, length, exp) => {
    const count = new Array(10).fill(0);
    const output = new Array(length);
    for (let i = 0; i < length; i += 1) {
      count[Math.floor(arr[i] / exp) % 10] += 1;
    }
    for (let i = 1; i < length; i += 1) {
      count[i] = count[i] + count[i - 1];
    }
    for (let i = length - 1; i >= 0; i -= 1) {
      // This will give me how many elements are smaller or equal to the curr value i.e arr[i]
      const countValue = count[Math.floor(arr[i] / exp) % 10];
      output[countValue - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10] -= 1;
    }
    for (let i = 0; i < length; i += 1) {
      arr[i] = output[i];
    }
  };
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, length, exp);
  }
}

// k is the number of buckets
function bucketSort(arr, k) {
  const max = arr.reduce((acc, ele) => {
    acc = Math.max(acc, ele);
    return acc;
  }, Number.MIN_SAFE_INTEGER);
  const min = arr.reduce((acc, ele) => {
    acc = Math.min(acc, ele);
    return acc;
  }, Number.MAX_SAFE_INTEGER);
  const buckets = new Array(k);
  for (const ele of arr) {
    const bucketIndex = Math.floor((k * ele) / (max - min)) % k;
    buckets[bucketIndex].push(ele);
  }
  for (const bucket of buckets) {
    insertionSort(bucket);
  }
  let index = 0;
  for (const bucket of buckets) {
    for (let j = 0; j < bucket.length; j += 1) {
      arr[index] = bucket[j];
      index += 1;
    }
  }
}

module.exports = { hoarePartition };

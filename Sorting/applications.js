const { hoarePartition } = require("./sorts");

/*
params --> Two Sorted Arrays
Return --> Intersection of Two Sorted Arrays
*/
function intersection(arr1, arr2) {
  const result = [];
  let firstArrIndex = 0;
  let secondArrIndex = 0;
  while (firstArrIndex < arr1.length && secondArrIndex < arr2.length) {
    if (arr1[firstArrIndex] === arr2[secondArrIndex]) {
      result.push(arr1[firstArrIndex]);
      firstArrIndex += 1;
      secondArrIndex += 1;
    } else if (arr1[firstArrIndex] < arr2[secondArrIndex]) {
      firstArrIndex += 1;
    } else {
      secondArrIndex += 1;
    }
  }
  return result;
}

/*
params --> Two Sorted Arrays
Return --> Union of Two Sorted Arrays
*/
function union(arr1, arr2) {
  const result = [];
  let firstArrIndex = 0;
  let secondArrIndex = 0;
  while (firstArrIndex < arr1.length || secondArrIndex < arr2.length) {
    if (firstArrIndex === arr1.length) {
      while (secondArrIndex < arr2.length) {
        result.push(arr2[secondArrIndex]);
        secondArrIndex += 1;
      }
      return result;
    }
    if (secondArrIndex === arr2.length) {
      while (firstArrIndex < arr1.length) {
        result.push(arr1[firstArrIndex]);
        firstArrIndex += 1;
      }
      return result;
    }
    if (arr1[firstArrIndex] <= arr2[secondArrIndex]) {
      result.push(arr1[firstArrIndex]);
      firstArrIndex += 1;
    } else {
      result.push(arr2[secondArrIndex]);
      secondArrIndex += 1;
    }
  }
  return result;
}

/*
 A pair arr[i] and arr[j] is called an inversion if for i < j arr[i] > arr[j]
 O(n * logn)
*/
function countInversions(arr) {
  const left = 0;
  const right = arr.length - 1;
  function countInvAndMerge(arr, left, mid, right) {}
  function countInv(arr, left, right) {
    let inversions = 0;
    if (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      inversions += countInv(arr, left, mid);
      inversions += countInv(arr, mid + 1, right);
      inversions += countInvAndMerge(arr, left, mid, right);
    }
    return inversions;
  }
  return countInv(arr, left, right);
}

function swap(arr, index1, index2) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

/*

 Segregate +ve and -ve

 Segregate even and odd

 Sort a binary array

 0(n)

*/

function sortArrayWithTwoTypesOfElements(arr) {
  let i = -1;
  let j = arr.length;
  while (true) {
    do {
      i += 1;
    } while (arr[i] < 0);
    do {
      j -= 1;
    } while (arr[j] >= 0);
    if (i >= j) return;
    swap(arr, i, j);
  }
}

function kthSmallestElement(arr, k) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const partition = hoarePartition(arr, low, high);
    if (partition === k - 1) {
      return arr[partition];
    } else if (partition > k - 1) {
      high = partition - 1;
    } else {
      low = partition + 1;
    }
  }
  return -1;
}

function mergeOverlappingIntervals(arr) {
  arr.sort((a, b) => a.start < b.start);
  const result = [arr[0]];
  let res = 0;
  for (let i = 1; i < arr.length; i += 1) {
    if (result[res].end >= arr[i].start) {
      result[res].end = Math.max(result[res].end, arr[i].end);
      result[res].start = Math.min(result[res].start, arr[i].start);
    } else {
      res += 1;
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(intersection([10, 20, 20, 40, 60], [2, 20, 20, 20]));

class SortedArrayUtils {
  /**
   * @param {number[]} arr
   * @param {number} element
   * @return {number} index of the element. -1 if not found
   */
  static binarySearch(arr, element) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === element) {
        return mid;
      } else if (arr[mid] > element) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }

  /**
   * @param {number[]} arr
   * @param {number} element
   * @return {number} floor of the element.
   */
  static findFloor(arr, element) {
    let left = 0;
    let right = arr.length - 1;
    let floor;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === element) {
        return arr[mid];
      } else if (arr[mid] > element) {
        right = mid - 1;
      } else {
        floor = arr[mid];
        left = mid + 1;
      }
    }
    return floor;
  }

  /**
   * @param {number[]} arr
   * @param {number} element
   * @return {number} index of the element. -1 if not found
   */
  static firstOccurrence(arr, element) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === element) {
        if (mid !== 0 && arr[mid - 1] === arr[mid]) {
          right = mid - 1;
        } else {
          return mid;
        }
      } else if (arr[mid] > element) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }

  /**
   * @param {number[]} arr
   * @param {number} element
   * @return {number} index of the element. -1 if not found
   */
  static lastOccurrence(arr, element) {
    const len = arr.length;
    let left = 0;
    let right = len - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === element) {
        if (mid !== len && arr[mid + 1] === arr[mid]) {
          left = mid + 1;
        } else {
          return mid;
        }
      } else if (arr[mid] > element) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }

  /**
   * @param {number[]} arr
   * @param {number} element
   * @return {number} count of occurrences of the element.
   */

  static countOccurrences(arr, element) {
    const firstIndex = SortedArrayUtils.firstOccurrence(arr, element);
    if (firstIndex !== -1) {
      const secondIndex = SortedArrayUtils.lastOccurrence(arr, element);
      return secondIndex - firstIndex + 1;
    } else {
      return 0;
    }
  }

  /**
   * @param {number} number
   * @return {number} square root of the number.
   */
  static sqaureRoot(number) {
    let left = 1;
    let right = number;
    let res;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      const square = mid * mid;
      if (square === number) {
        return mid;
      } else if (square < number) {
        res = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return res;
  }

  /**
   * @param {number[]} arr
   * @param {number} element
   * @return {number} index of the element in arr. -1 if not found
   */

  /*
   The trick to the solution is that one half of the input array will always be sorted.
   Now, we compare the middle element with the leftmost element of that half. If it is greater, then left half is sorted;
   otherwise right half is sorted.
   */
  static searchInSortedRotatedArray(arr, element) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === element) {
        return mid;
      } else if (arr[left] <= arr[mid]) {
        // Left Half Sorted
        if (element >= arr[left] && element < arr[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        // Right Half Sorted
        if (element > arr[mid] && element <= arr[right]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
    return -1;
  }
  /**
   * @param {number[]} Unsorted arr
   * @return {number} peak element, the element whose neighbours have value smaller than that of the element.
   */
  // If mid - 1 > mid , then peak will be on the left side, else right side
  static peakElement(arr) {
    const len = arr.length;
    let left = 0;
    let right = len - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (
        (mid === 0 || arr[mid] >= arr[mid - 1]) &&
        (mid === len - 1 || arr[mid] >= arr[mid + 1])
      ) {
        return arr[mid];
      } else if (mid !== 0 && arr[mid - 1] > arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }

  static repeatingElements(arr) {
    let slow = arr[0] + 1;
    let fast = arr[0] + 1;
    do {
      slow = arr[slow] + 1;
      fast = arr[arr[fast] + 1] + 1;
    } while (slow !== fast);
    slow = arr[0] + 1;
    while (slow !== fast) {
      fast = arr[fast] + 1;
      slow = arr[slow] + 1;
    }
    return slow - 1;
  }

  isFeasible(arr, element, k) {
    let currSum = 0;
    let totalPartitions = 1;
    for (const ele of arr) {
      currSum += ele;
      if (currSum > element) {
        totalPartitions += 1;
        currSum = ele;
      }
    }
    return totalPartitions <= k;
  }

  /*
  Max Result is upper bounded by sum of all elements and min result is Max element in the arr.
  O(n * log(sum - max))
  This is better if sum is not very huge
  */
  static allocateMinPages(arr, k) {
    let sum = 0;
    let maxi = Number.MIN_SAFE_INTEGER;
    let res;
    for (const ele of arr) {
      sum += ele;
      maxi = Math.max(ele, maxi);
    }
    const sortedArrayUtil = new SortedArrayUtils();
    let left = maxi;
    let right = sum;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (sortedArrayUtil.isFeasible(arr, mid, k)) {
        res = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return res;
  }
}

module.exports = SortedArrayUtils;

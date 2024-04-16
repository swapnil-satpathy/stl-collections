class ArrayUtils {
  static subArrayWithZeroSum(arr) {
    let preSum = 0;
    const map = new Map();
    for (const ele of arr) {
      preSum += ele;
      if (map.has(preSum)) {
        return true;
      }
      if (preSum === 0) {
        return true;
      }
      map.set(preSum, true);
    }
    return false;
  }

  static longestSubArrayWithGivenSum(arr, targetSum) {
    let preSum = 0;
    const map = new Map();
    let res = 0;
    for (let i = 0; i < arr.length; i += 1) {
      const ele = arr[i];
      preSum += ele;
      if (map.has(preSum - targetSum)) {
        res = Math.max(res, i - map.get(preSum - targetSum) + 1);
      }
      if (preSum === targetSum) {
        res = Math.max(res, i + 1);
      }
      map.set(preSum, i);
    }
    return res;
  }

  static countDistinctWindow(arr, k) {
    if (k <= arr.length) {
      const map = new Map();
      for (let i = 0; i < k; i += 1) {
        map.set(arr[i], (map.get(arr[i]) || 0) + 1);
      }
      const result = [];
      result.push(map.size);
      for (let i = k; i < arr.length; i += 1) {
        map.set(arr[i - k], map.get(arr[i - k]) - 1);
        if (map.get(arr[i - k]) === 0) {
          map.delete(arr[i - k]);
        }
        map.set(arr[i], (map.get(arr[i]) || 0) + 1);
        result.push(map.size);
      }
      return result;
    }
  }

  // No of lookups is twice the size of the hash table
  static longestConsecutiveSubsequence(arr) {
    const map = new Map();
    let res = 1;
    for (const ele of arr) {
      map.set(ele, (map.get(ele) || 0) + 1);
    }
    for (const [ele, _] of map) {
      if (!map.has(ele - 1)) {
        let curr = 1;
        while (map.has(ele + curr)) {
          curr += 1;
        }
        res = Math.max(res, curr);
      }
    }
    return res;
  }

  // Kadane's Algorithm
  // For every element, we will find the Max Subarray Sum ending with this element
  static maxSubarraySum(arr) {
    let maxEnding = arr[0];
    let maxSum = maxEnding;
    for (let i = 1; i < arr.length; i += 1) {
      maxEnding = Math.max(maxEnding, arr[i] + maxEnding);
      maxSum = Math.max(maxSum, maxEnding);
    }
    return maxSum;
  }

  static minSubarraySum(arr) {
    let minEnding = arr[0];
    let minSum = minEnding;
    for (let i = 1; i < arr.length; i += 1) {
      minEnding = Math.min(minEnding, arr[i] + minEnding);
      minSum = Math.min(minSum, minEnding);
    }
    return minSum;
  }

  static maxCircularSubarraySum(arr) {
    const maxSum = maxSubarraySum(arr);
    const minSum = minSubarraySum(arr);
    const totalSum = arr.reduce(
      acc,
      (ele) => {
        acc += ele;
      },
      0,
    );
    return Math.max(maxSum, totalSum - minSum);
  }
}

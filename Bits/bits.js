// We have to find out if the kth bit is set in the binary representation of n or not
function kthBitSet(n, k) {
  return checkLastBitIs1(n >> (k - 1));
}

function checkLastBitIs1(n) {
  return (n & 1) != 0;
}

// Count Set Bits -> Brain Kerningham Algorithm

//  0(set bits)
function countSetBits(n) {
  let res = 0;
  while (n > 0) {
    n = n & (n - 1);
    res += 1;
  }
  return res;
}

// Using LookUp Table
function countSetBitsEfficient(n) {

}


// You are given a number N. Find the total count of set bits for all numbers from 1 to N(both inclusive).
function totalSetBits(N) {
  if (N === 0) {
    return 0;
  }
  const x = Math.floor(Math.log2(N));
  const btill2x = x * (1 << (x - 1));
  const msb2xton = N - (1 << x) + 1;
  const rest = N - (1 << x);
  const ans = btill2x + msb2xton + totalSetBits(rest);
  return ans;

}

// Also a number which is a power of 4 is also a perfect square
function isPowerOfFour(n) {
  return n != 0 && ((n & (n - 1)) == 0) && !(n & 0xAAAAAAAA);
}


// 100
// 011 -> 4 & 3 === 0

// It is working because powers of 2 have only 1 set bit and according to Brain kerningham algo, n & n-1 unsets the least significant bit 1.
function checkIfPoweroOfTwo(n) {
  if (n === 0) {
    return 0;
  }
  return (n & (n - 1)) === 0;
}

function twoOddOccurring(arr) {
  let xor = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    xor = xor ^ arr[i];
  }
  const lastBitSet = xor & ~(xor - 1);
  let res1 = 0;
  let res2 = 0;
  for (let ele of arr) {
    if (ele & lastBitSet != 0) {
      res1 = res1 ^ 0;
    } else {
      res2 = res2 ^ 0;
    }
  }
  return [res1, res2];
}

function printPowerSet(str) {
  const n = s.length;
  const pSize = 1 << n;
  for (let i = 0; i < pSize; i += 1) {
        string res = "";
    for (let j = 0; j < n; j += 1) {
      if (i & (1 << j) !== 0) {
        res += s[j];
      }
    }
    console.log(res);
  }
}

// Given a number N. Find the length of the longest consecutive 1s in its binary representation.
/*
Input: N = 14
Output: 3
Explanation:
Binary representation of 14 is
1110, in which 111 is the longest
consecutive set bits of length is 3.
*/
function largestConsecutiveOnes(n) {
  let count = 0;
  let maxCount = 0;
  while (N) {
    if (N & 1 !== 0) {
      count += 1;
      maxCount = Math.max(maxCount, count);
    } else {
      count = 0;
    }
    N = N >> 1;
  }
  return maxCount;

}

//Given an array arr[] of N positive elements. The task is to find the Maximum AND Value generated by any pair(arri, arrj) from the array such that i != j
function checkBit(pattern, arr, n) {
  let count = 0;
  for (let i = 0; i < n; i++)
    if ((pattern & arr[i]) == pattern)
      count++;
  return count;
}

// Function for finding maximum
// and value pair
function maxAND(arr, n) {
  let res = 0,
    count;

  // iterate over total of 32bits
  // from msb to lsb
  for (let bit = 31; bit >= 0; bit--) {

    // find the count of element
    // having set msb
    count = checkBit(res | (1 << bit), arr, n);

    // if count >= 2 set particular
    // bit in result
    if (count >= 2)
      res |= (1 << bit);
  }

  return res;
}

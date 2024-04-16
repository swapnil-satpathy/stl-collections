const countDigits = (number) => {
  // let count = 0;
  // while (number > 0) {
  //   count += 1;
  //   number = Math.floor(number / 10);
  // }
  // return count;
  return Math.floor(Math.log10(number)) + 1;
};

const isAPalindromeNumber = (number) => {
  const tempNumber = number;
  let reverse = 0;
  while (number > 0) {
    reverse = reverse * 10 + (number % 10);
    number = Math.floor(number / 10);
  }
  return tempNumber === reverse;
};

const factorial = (number) => {
  if (number === 0) {
    return 1;
  }
  return number * factorial(number - 1);
};

// For efficient computation, we check how many 2's and 5's are there in the prime factorization of the number
// And the number of fives will be less than or equal to the number of twos. So we can just check the number of fives
//
// O(log5n)
const trailingZerosInFactorial = (number) => {
  let res = 0;
  for (let i = 5; i <= number; i *= 5) {
    res += Math.floor(number / i);
  }
  return res;
};

// Euclid's Algorithm
/*
  if b is smaller than a
  gcd(a, b)  = gcd(a - b, b)

  Let g be the gcd(a, b)
  a = gx and b = gy and gcd(x, y) = 1
  a - b = g(x - y)

*/

// log(min(a, b))
const gcd = (a, b) => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

const isPrime = (number) => {
  if (number === 1) {
    return false;
  }
  if (number === 2 || number === 3) {
    return true;
  }
  if (number % 2 === 0 || number % 3 === 0) {
    return false;
  }
  for (let i = 5; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
  }
  return true;
};

const divisors = (number) => {
  const result = [];
  let i;
  for (i = 1; i * i <= n; i += 1) {
    if (number % i === 0) {
      result.push(number);
    }
  }
  for (; i >= 1; i -= 1) {
    if (number % i === 0) {
      result.push(number / i);
    }
  }
  return result;
};

// 0(log2power)
const power = (number, power) => {
  if (number === 0) {
    return 0;
  }
  if (power === 0) {
    return 1;
  }
  let temp = power(number, Math.floor(power / 2));
  temp = temp * temp;
  if (power % 2 === 0) {
    return temp;
  } else {
    return number * temp;
  }
};

/*
Every number can be written as a power of 2(Set Bits in Binary Representation)
We can traverse through all bits of a number in O(log n) time
*/
const powerIterative = (number, power) => {
  let res = 1;
  while (power > 0) {
    if (power % 2 !== 0) {
      res = res * number;
    }
    number = number * number;
    power = Math.floor(power / 2);
  }
  return res;
};

// Sieve of Eratosthenes
// O(n loglogn)
const primesLessThanOrEqualToNumber = (number) => {
  const sieve = new Array(number + 1).fill(true);
  const result = [];
  for (let i = 2; i * i <= number; i += 1) {
    if (sieve[i]) {
      for (let j = i * i; j <= number; j += i) {
        sieve[j] = false;
      }
    }
  }
  for (let i = 2; i <= number; i += 1) {
    if (sieve[i]) {
      result.push(i);
    }
  }
  return result;
};

const noOfDigitsInFactorial = (number) => {
  if (number < 0) return 0;

  // base case
  if (number <= 1) return 1;

  let digits = 0;
  for (let i = 2; i <= number; i += 1) digits += Math.log10(i);

  return Math.floor(digits) + 1;
};

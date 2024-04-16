function maxCuts(n, a, b, c) {
  if (n < 0) {
    return -1;
  }
  if (n === 0) {
    return 0;
  }
  const aCuts = maxCuts(n - a, a, b, c);
  const bCuts = maxCuts(n - b, a, b, c);
  const cCuts = maxCuts(n - c, a, b, c);
  const res = Math.max(aCuts, Math.max(bCuts, cCuts));
  if (res === -1) {
    return -1;
  }
  return 1 + res;
}

function generateSubsets(str, curr) {
  if (str.length <= 0) {
    console.log(curr);
    return;
  }
  const lastChar = str[str.length - 1];
  const subStr = str.slice(0, str.length - 1);
  generateSubsets(subStr, lastChar + curr);
  generateSubsets(subStr, curr);
}

function swap(str, i, j) {
  const temp = str[i];
  str[i] = str[j];
  str[j] = temp;
}

function permute(str, i = 0) {
  if (i === str.length - 1) {
    console.log(str);
    return;
  }
  for (let j = i; j < str.length; j += 1) {
    swap(str, i, j);
    permute(str, i + 1);
    swap(str, i, j);
  }
}

// 0(n) time and space
function jos(n, k) {
  if (n === 1) {
    return 0;
  }
  return (jos(n - 1, k) + k) % n;
}

generateSubsets("ABC", "");

// O((n - m + 1) * m) time and O(1) space
function naivePatternMatching(text, pattern) {
  const textLength = text.length;
  const patternLength = pattern.length;
  for (let i = 0; i <= textLength - patternLength; i += 1) {
    let j = 0;
    for (; j < patternLength; j += 1) {
      if (pattern[j] !== text[i + j]) {
        break;
      }
    }
    if (j === patternLength) {
      console.log(i);
    }
  }
}

// O(Text length)
function patternMatchingForDistinctPattern(text, pattern) {
  const textLength = text.length;
  const patternLength = pattern.length;
  for (let i = 0; i <= textLength - patternLength; ) {
    let j = 0;
    for (; j < patternLength; j += 1) {
      if (pattern[j] !== text[i + j]) {
        break;
      }
    }
    if (j === patternLength) {
      console.log(i);
    }
    if (j === 0) {
      i += 1;
    } else {
      i = i + j;
    }
  }
}
function naiveComputeLongest(pattern, n) {
  for (let j = n - 1; j >= 0; j -= 1) {
    let flag = true;
    for (let i = 0; i < j; i += 1) {
      if (pattern[i] !== pattern[n - j + 1]) {
        flag = false;
      }
    }
    if (flag === true) {
      return j;
    }
  }
  return 0;
}
// LPS => Longest Proper Prefix Suffix Array
// O(n * 3)
function naiveConstructLPSArray(pattern) {
  const lps = [];
  for (let i = 0; i < str.length; i += 1) {
    lps.push(naiveComputeLongest(pattern, i + 1));
  }
}

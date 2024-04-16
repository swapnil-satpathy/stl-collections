const Stack = require("./stack-list");

const stockSpan = (arr) => {
  const stack = new Stack();
  stack.push(0);
  const result = [];
  result.push(1);
  for (let i = 1; i < arr.length; i += 1) {
    const ele = arr[i];
    while (!stack.empty() && ele > arr[stack.top()]) {
      stack.pop();
    }
    result.push(stack.empty() ? i + 1 : i - stack.top());
    stack.push(i);
  }
  return result;
};

const precedence = (char) => {
  if (char === "^") {
    return 3;
  } else if (char === "*" || char === "/") {
    return 2;
  } else if (char === "+" || char === "-") {
    return 1;
  } else {
    return 0;
  }
};

const infixToPostFix = (string) => {
  let postfix = "";
  const stack = new Stack();
  for (const char of string) {
    if (char.match(/[a-z]/i) || char.match(/[0-9]/)) {
      postfix += char;
    } else if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      while (!stack.empty() && stack.top() !== "(") {
        postfix += stack.top();
        stack.pop();
      }
      stack.pop();
    } else {
      while (!stack.empty() && precedence(char) <= precedence(stack.top())) {
        postfix += stack.top();
        stack.pop();
      }
      stack.push(char);
    }
  }
  while (!stack.empty()) {
    postfix += stack.top();
    stack.pop();
  }
  return postfix;
};

const maxAreaInHistogram = (arr) => {
  const stack = new Stack();
  let res = 0;
  for (let i = 0; i < arr.length; i += 1) {
    while (!stack.empty() && arr[i] <= arr[stack.top()]) {
      const ele = stack.top();
      stack.pop();
      const area = ele * (stack.empty() ? i : i - st.top() - 1);
      res = Math.max(res, area);
    }
  }
  while (!stack.empty()) {
    const ele = stack.top();
    stack.pop();
    const area = ele * (stack.empty() ? arr.length : arr.length - st.top() - 1);
    res = Math.max(res, area);
  }
  return res;
};

const result = stockSpan([10, 4, 5, 90, 120, 80]);
console.log(result);

console.log(infixToPostFix("a+b*(c^d-e)^(f+g*h)-i"));

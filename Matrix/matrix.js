function printInSnakePattern(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const array = arr[i];
    if (i % 2 === 0) {
      for (let j = 0; j < array.length; j += 1) {
        console.log(arr[i][j]);
        if (j === array.length - 1) {
          console.log("*********");
        }
      }
    } else {
      for (let j = array.length - 1; j >= 0; j -= 1) {
        console.log(arr[i][j]);
        if (j === 0) {
          console.log("*********");
        }
      }
    }
  }
}

/*
 [1, 2, 3, 4]
 [5, 6, 7, 8]
 [9, 10, 11, 12]

      |
      |

  [1, 5, 9]
  [2, 6. 10]
  [3, 7, 11]
  [4, 8, 12]
 */

// With Extra Space
function transposeWithSpace(array) {
  const transpose = [];
  for (let column = 0; column < array[0].length; column += 1) {
    const singleArray = [];
    for (let row = 0; row < array.length; row += 1) {
      singleArray.push(array[row][column]);
    }
    transpose.push(singleArray);
  }
  return transpose;
}

function transposeWithoutSpace(array) {
  for (let row = 0; row < array.length; row += 1) {
    for (let column = row + 1; column < array[row].length; column += 1) {
      const temp = array[row][column];
      array[row][column] = array[column][row];
      array[column][row] = temp;
    }
  }
  return array;
}

function transpose(array) {
  if (array.length === array[0].length) {
    return transposeWithoutSpace(array);
  } else {
    return transposeWithSpace(array);
  }
}

function printSpiral(arr, numRows, numCols) {
  let top = 0;
  let left = 0;
  let bottom = numRows - 1;
  let right = numCols - 1;
  while (top <= bottom && left <= right) {
    let res = "";
    // Top row
    for (let i = left; i <= right; i += 1) {
      res += arr[top][i] + " ";
    }
    top += 1;
    // Right Column
    for (let i = top; i <= bottom; i += 1) {
      res += arr[i][right] + " ";
    }
    right -= 1;
    // Bottom row
    if (top <= bottom) {
      for (let i = right; i >= left; i -= 1) {
        res += arr[bottom][i] + " ";
      }
      bottom -= 1;
    }
    // Left Column
    if (left <= right) {
      for (let i = bottom; i >= top; i -= 1) {
        res += arr[i][left] + " ";
      }
      left += 1;
    }
    console.log(res);
  }
}

// O(m + n)
function searchInRowAndColumnSortedMatrix(arr, search) {
  let i = 0;
  let j = arr[0].length - 1;
  while (i < arr.length && j >= 0) {
    const element = arr[i][j];
    if (element === search) {
      return [i, j];
    } else if (element < search) {
      i += 1;
    } else {
      j -= 1;
    }
  }
  return -1;
}

function boundaryTraversal(array) {
  if (array.length === 1) {
    for (let column = 0; column < array[0].length; column += 1) {
      console.log(array[0][column]);
    }
  } else if (array[0].length === 1) {
    for (let row = 0; row < array.length; row += 1) {
      console.log(array[row][array[row].length - 1]);
    }
  } else {
    for (let column = 0; column < array[0].length; column += 1) {
      console.log(array[0][column]);
    }
    console.log("************");
    for (let row = 1; row < array.length; row += 1) {
      console.log(array[row][array[row].length - 1]);
    }
    console.log("************");
    for (let column = array[0].length - 2; column >= 0; column -= 1) {
      console.log(array[array.length - 1][column]);
    }
    console.log("************");
    for (let row = array.length - 2; row >= 1; row -= 1) {
      console.log(array[row][0]);
    }
    console.log("************");
  }
}

function reverseColumns(matrix) {
  for (let col = 0; col < matrix[0].length; col += 1) {
    let i = 0;
    let j = matrix.length - 1;
    while (i <= j) {
      const temp = matrix[i][col];
      matrix[i][col] = matrix[j][col];
      matrix[j][col] = temp;
      i += 1;
      j -= 1;
    }
  }
}

// Rotate Matrix by Anti-ClockWise

/*
1. Take transpose of the matrix
2. Rotate the columns
*/

function rotateAntiClockWise(matrix) {
  const transposed = transpose(matrix);
  reverseColumns(transposed);
  return transposed;
}

// Rotate Matrix by ClockWise

/*
1. Take transpose of the matrix
2. Rotate the rows
*/

function findMinOperationMakeMatrixBeautiful(matrix, n) {
  // Initialize the sumRow[]
  // and sumCol[] array to 0
  let sumRow = new Array(n);
  let sumCol = new Array(n);
  for (let i = 0; i < n; i += 1) {
    sumRow[i] = 0;
    sumCol[i] = 0;
  }

  // Calculate sumRow[] and
  // sumCol[] array
  for (let i = 0; i < n; i += 1)
    for (let j = 0; j < n; j += 1) {
      sumRow[i] += matrix[i][j];
      sumCol[j] += matrix[i][j];
    }

  // Find maximum sum value
  // in either row or in column
  let maxSum = 0;
  for (let i = 0; i < n; i += 1) {
    maxSum = Math.max(maxSum, sumRow[i]);
    maxSum = Math.max(maxSum, sumCol[i]);
  }

  let count = 0;
  for (let i = 0, j = 0; i < n && j < n; ) {
    // Find minimum increment
    // required in either row
    // or column
    let diff = Math.min(maxSum - sumRow[i], maxSum - sumCol[j]);

    // Add difference in
    // corresponding cell,
    // sumRow[] and sumCol[]
    // array
    matrix[i][j] += diff;
    sumRow[i] += diff;
    sumCol[j] += diff;

    // Update the count
    // variable
    count += diff;

    // If ith row satisfied,
    // increment ith value
    // for next iteration
    if (sumRow[i] == maxSum) i += 1;

    // If jth column satisfied,
    // increment jth value for
    // next iteration
    if (sumCol[j] == maxSum) j += 1;
  }
  return count;
}

function medianRowWiseSortedMatrix(arr) {}

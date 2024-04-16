const SortedArrayUtils = require("./binary-search");

function main() {
  let arr = [5, 10, 10, 20, 20];
  const result = SortedArrayUtils.firstOccurrence(arr, 20);
  console.log(result);

  const result2 = SortedArrayUtils.lastOccurrence(arr, 10);
  console.log(result2);

  const result3 = SortedArrayUtils.countOccurrences(arr, 5);
  console.log(result3);

  const root = SortedArrayUtils.sqaureRoot(25);
  console.log(root);

  const sortedRotatedArr = [10, 20, 40, 60, 5, 8];
  const element = 100;
  console.log(
    SortedArrayUtils.searchInSortedRotatedArray(sortedRotatedArr, element),
  );
  arr = [10, 20, 10, 30];
  const k = 2;
  console.log(SortedArrayUtils.allocateMinPages(arr, k));
}

main();

const { Queue } = require("../Queue");

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  deserialize(arr, index) {
    if (index >= arr.length) {
      return null;
    }
    const root = new Node(arr[index]);
    root.left = this.serialize(arr, index + 1);
    root.right = this.serialize(arr, index + 2);
    return root;
  }

  serialize(root, arr) {
    if (!root) {
      arr.push(null);
      return;
    }
    arr.push(root.val);
    this.serialize(root.left, arr);
    this.serialize(root.right, arr);
  }

  buildTree(arr) {
    this.root = this.serialize(arr, 0);
  }

  //
  countNodesInCompleteBinaryTree(root) {
    let lh = 0;
    let rh = 0;
    let curr = root;
    while (curr) {
      lh += 1;
      curr = curr.left;
    }
    curr = root;
    while (curr) {
      rh += 1;
      curr = curr.right;
    }
    if (lh === rh) {
      return Math.pow(2, lh) - 1;
    }
    return (
      1 +
      this.countNodesInCompleteBinaryTree(root.left) +
      this.countNodesInCompleteBinaryTree(root.right)
    );
  }

  inorder(root) {
    if (root) {
      this.inorder(root.left);
      console.log(root.val);
      this.inorder(root.right);
    }
  }

  preorder(root) {
    if (root) {
      console.log(root.val);
      this.inorder(root.left);
      this.inorder(root.right);
    }
  }

  postorder(root) {
    if (root) {
      this.inorder(root.left);
      this.inorder(root.right);
      console.log(root.val);
    }
  }

  height(root) {
    if (!root) return 0;
    return 1 + Math.max(root.left, root.right);
  }

  levelOrder(root) {
    const queue = new Queue();
    queue.push(root);
    queue.push(null);
    while (queue.size > 1) {
      const curr = queue.front();
      queue.pop();
      if (curr === null) {
        console.log("---------->");
        queue.push(curr);
      } else {
        console.log(curr.val);
        if (curr.left) {
          queue.push(curr.left);
        }
        if (curr.right) {
          queue.push(curr.right);
        }
      }
    }
  }

  /*
  @params -> Root of the tree
  Return -> Total number of nodes in the tree
  */
  size(root) {
    if (!root) return 0;
    return 1 + this.size(root.left) + this.size(root.right);
  }

  /*
  @params -> Root of the tree
  Return -> Max. of nodes in the tree
  */
  max(root) {
    if (!root) return Number.MIN_SAFE_INTEGER;
    let currMax = root.val;
    currMax = Math.max(currMax, this.max(root.left));
    currMax = Math.max(currMax, this.max(root.right));
    return currMax;
  }

  leftView(root) {
    if (!root) return null;
    const queue = new Queue();
    queue.push(root);
    while (!queue.empty()) {
      const count = queue.size;
      for (let i = 0; i < count; i += 1) {
        const curr = queue.frontNode();
        queue.pop();
        if (i === 0) {
          console.log(curr.val);
        }
        if (curr.left) {
          queue.push(curr.left);
        }
        if (curr.right) {
          queue.push(curr.right);
        }
      }
    }
  }

  /*
  Children Sum Property is a property in which the sum of values of the left child and right child should be equal to the value of
  their node if both children are present.
   Else if only one child is present then the value of the child should be equal to its node value.
  */
  childrenSum(root) {
    if (!root) return true;
    if (!root.left && !root.right) {
      return true;
    }
    let sum = 0;
    if (root.left) {
      sum += root.left.val;
    }
    if (root.right) {
      sum += root.right.val;
    }
    return (
      root.val === sum &&
      this.childrenSum(root.left) &&
      this.childrenSum(root.right)
    );
  }

  getBalancedHeight(root) {
    if (!root) return 0;
    const lh = this.getBalancedHeight(root.left);
    if (lh === -1) return -1;
    const rh = this.getBalancedHeight(root.right);
    if (rh === -1) {
      return -1;
    }
    if (Math.abs(lh - rh) > 1) {
      return -1;
    }
    return 1 + Math.max(lh, rh);
  }

  balancedBinaryTree(root) {
    if (this.getBalancedHeight(root) === -1) {
      return false;
    }
    return true;
  }

  burnABinaryTreeFromLeaf() {}

  btToDLL(root, prev) {
    if (!root) return null;
    const head = this.btToDLL(root.left, prev);
    if (!prev) {
      head = root;
    } else {
      root.left = prev;
      prev.right = root;
    }
    prev = root;
    this.btToDLL(root.right, prev);
    return head;
  }

  // O(n * n)
  // With Hashing ==> O(n) by preprocessing inorder array to find the index
  binaryTreeFromInorderPreorder(
    inorder,
    preorder,
    inorderStart,
    inorderEnd,
    preIndex = 0,
  ) {
    if (inorderStart > inorderEnd) {
      return null;
    }
    const root = new Node(preorder[preIndex]);
    preIndex += 1;
    let inIndex;
    for (let i = inorderStart; i <= inorderEnd; i += 1) {
      if (inorder[i] === root.val) {
        inIndex = i;
        break;
      }
    }
    root.left = this.binaryTreeFromInorderPreorder(
      inorder,
      preorder,
      inorderStart,
      inIndex - 1,
      preIndex,
    );
    root.right = this.binaryTreeFromInorderPreorder(
      inorder,
      preorder,
      inIndex + 1,
      inorderEnd,
      preIndex,
    );
    return root;
  }

  // Diameter will be there in this.dia
  diameter(root) {
    if (!root) return 0;
    const lh = this.diameter(root.left);
    const rh = this.diameter(root.right);
    this.dia = Math.max(this.dia, lh + rh + 1);
    return 1 + Math.max(lh, rh);
  }
}

module.exports = Tree;

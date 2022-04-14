'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  //Remove the end with POP to start another stack.
let movedPiece = stacks[startStack].pop();
// Now, PUSH the piece we held onto another stack.
  stacks[endStack].push(movedPiece); 
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // We are are moving a piece from a stack that has pieces.
if (stacks[startStack].length > 0) {
  // now we can place any piece on an empty stack.
  if (stacks[startStack].length == 0) {
    return true;
  }
// this like makes sure the piece on the end stack is larger than the piece we mare moving  with SLICE.
  if (stacks[endStack].slice(-1) > stacks[startStack].slice(-1)){
    return true;
    // if conditions are not met, the move is illegal
  }else{
    console.log("This is a invalid Move!")
    return false;
  }
}
}

// What is a win in Towers of Hanoi? When should this function run?
// before anything else happens, make sure the game isnt already completed.
// a win happens when all 4 blocks in the b or c stack are in order [4,3,2,1]

const checkForWin = () => {
  // Your code here
if (stacks['b'].length == 4 ) {
  
  return true;
}
if(stacks['c'].length == 4 ) {
  
  return true;
}
else {return false;}
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
if (isLegal(startStack, endStack)) { 
movePiece(startStack, endStack);
// after moving the piece, check for win.
if(checkForWin()) {
  console.log("POGGERS! You've Won!")
  return true;
}else{ return false; }
}else{ return false; }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}

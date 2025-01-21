// 1. what is the output of the following code?

// what is closure?
// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
// In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

function closure() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const count1 = closure();
const count2 = closure();

console.log(count1());
console.log(count1());
console.log(count1());
console.log(count2());
// Output: 1 2 3 1

// 2. what is the output of the following code?

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: "Data fetched successfully" });
    }, 1000);
  });
}

function proceesData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const proceesedData = data.message.toUpperCase();
      resolve(proceesedData);
    }, 500);
  });
}

fetchData("https://api.example.com/data")
  .then(proceesData)
  .then((proceesData) => console.log(proceesData))
  .catch((err) => console.log(err));

// Output: DATA FETCHED SUCCESSFULLY
// The fetchData function returns a promise that resolves after 1 second. The proceesData function returns a promise that resolves after 0.5 seconds. The fetchData function is called first, and the proceesData function is called after the fetchData function is resolved. So, the output will be DATA FETCHED SUCCESSFULLY.

//3. What is the output of the following code?

console.log(greet("Aravind"));

function greet(name) {
  return `Hello ${name}`;
}

const sayHi = function () {
  console.log("Hi There");
};

sayHi();
// Output: Hello Aravind and Hi There
// The function greet is hoisted to the top of the file. So, it can be called before the function definition. So, the output will be Hello Aravind.

//4. What is the output of the following code?
function mystery(x) {
  if (typeof x === "number") {
    return x.toString();
  } else if (typeof x === "string") {
    return parseInt(x);
  } else {
    return "unknown";
  }
}

console.log(mystery(5));
console.log(mystery("5"));
console.log(mystery(null));
console.log(mystery([1, 2, 3, 4]));
console.log(mystery({}));
console.log(mystery(true));
// Output: 5 5 unknown unknown unknown unknown

//5. What is the output of the following code?
function createCounter() {
  let count = 0;
  function increment() {
    count++;
  }

  let message = `Count is ${count}`;

  function log() {
    console.log(count, message);
  }
  return [increment, log];
}

const [increment, log] = createCounter();
increment();
increment();
increment();
log();
// Output: 3 Count is 0
// The message variable is initialized when the createCounter function is called, and it captures the value of count at that time, which is 0. The log function logs the current value of count and the message variable. Since the message variable is not updated when the count is incremented, it always shows the initial value of count, which is 0.

//6. What is the output of the following code?

function test() {
  console.log(a); // undefined
  console.log(foo()); // 2

  var a = 1;
  function foo() {
    return 2;
  }
}

test();
// Output: undefined 2
// The variable a is hoisted to the top of the function scope, but it is not initialized. So, the value of a is undefined. The function foo is also hoisted to the top of the function scope, and it returns 2. So, the output will be undefined 2.

//7. What is the output of the following code?

const person = {
  name: "Aravind",
  age: 25,
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};
const greeting = person.greet;
greeting();

// Output: Hello, my name is undefined
// The greet function is called without any context, so the this keyword inside the greet function refers to the global object. Since the name property is not defined in the global object, the output will be Hello, my name is undefined.

//8. What is the output of the following code?

let x = 1;

function func() {
  let x;
  console.log(x);
}
func();
// Output: undefined
// Explanation: The variable x inside the function func is hoisted to the top of the function scope, but it is not initialized with any value, so it has the value undefined.

//11. What is the output of the following code?

const { a: xx, b: y } = { a: 1, b: 2, c: 3 };
console.log(xx, y);
// Output: 1 2

const { a: p = 10, b: q = 20, c: r = 30 } = { a: 1, b: undefined, d: 4 };
console.log(p, q, r);
// Output: 1 20 30

//9. What is the output of the following code?
async function asynFunc() {
  return await Promise.resolve("Hello");
}

asynFunc().then((value) => console.log(value));
console.log("world");

// Output: world Hello

// Source: https://www.w3resource.com/javascript-exercises/javascript-function-exercise-1.php
// Write a JavaScript function that reverse a number.
// Example x = 32243;
// Expected Output : 34223

// using built-in methods
function reverseNumber(num) {
  return parseInt(num.toString().split("").reverse().join(""));
}
console.log(reverseNumber(12345)); // 54321

// using for loop
function reverseLoopNumber(num) {
  let reversed = "";
  for (let i = num.toString().length - 1; i >= 0; i--) {
    reversed += num.toString()[i];
  }
  return parseInt(reversed);
}
console.log(reverseLoopNumber(12345)); // 54321

// Write a JavaScript function that reverse a string.
// using built-in methods
function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString("hello")); // olleh

// using for loop
function reverseLoopString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    // start from the last character
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseLoopString("hello")); // olleh

// using recursion
function reverseRecursionString(str) {
  if (str === "") {
    return "";
  } else {
    return reverseRecursionString(str.substr(1)) + str[0]; // substr(1) removes the first character
  }
}
console.log(reverseRecursionString("hello")); // olleh


// Write an function that returns longest word in a sentence.

// using built-in methods
function longestWord(str) {
    let words = str.split(' ');
    let longest = '';
    for (let word of words) {
      if (word.length > longest.length) {
        longest = word;
      }
    }
    return longest;
  }
  
  console.log(longestWord("I woke up early today")) // early
  
  // using for loop
  function longestWordLoop(str) {
    let words = str.split(' ');
    let longest = '';
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > longest.length) {
        longest = words[i];
      }
    }
    return longest;
  }
  
  console.log(longestWordLoop("I woke up early today")) // early
  
  // using reduce
  function longestWordReduce(str) {
    return str.split(' ').reduce((longest, current) => current.length > longest.length ? current : longest, '');
  }
  
  console.log(longestWordReduce("I woke up early today")) // early
  
  // using sort
  function longestWordSort(str) {
    return str.split(' ').sort((a, b) => b.length - a.length)[0];
  }
  
  console.log(longestWordSort("I woke up early today")) // early
  
  // using recursion
  function longestWordRecursion(str) {
    let words = str.split(' ');
    if (words.length === 1) {
      return words[0];
    }
    if (words[0].length >= words[1].length) {
      words.splice(1, 1);
    } else {
      words.splice(0, 1);
    }
    return longestWordRecursion(words.join(' '));
  }
  
  console.log(longestWordRecursion("I woke up early today")) // early

  // write a function check whether given number / string is palindrome or not

// palindrome: A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward

// built-in functions: split(), reverse(), join()
function isPalindrome(str) {
    let reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
}

console.log(isPalindrome('madam')); // true

function isPalindromeNumber(num) {
    return num.toString() === num.toString().split('').reverse().join('');
}   

console.log(isPalindromeNumber(121)); // true

// without using built-in functions

function isPalindrome2(str) {
    let len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome2('madam')); // true

function isPalindromeNumber2(num) {   
    let reversedNum = 0;
    let originalNum = num;
    while (num > 0) {
        reversedNum = reversedNum * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    return originalNum === reversedNum;
}

console.log(isPalindromeNumber2(121)); // true

// using recursion

function isPalindrome3(str) {
    if (str.length === 0 || str.length === 1) {
        return true;
    }
    if (str[0] === str[str.length - 1]) {
        return isPalindrome3(str.slice(1, str.length - 1));
    }
    return false;
}

console.log(isPalindrome3('madam')); // true

function isPalindromeNumber3(num) {
    function reverseNum(num, reversedNum) {
        if (num === 0) {
            return reversedNum;
        }
        return reverseNum(Math.floor(num / 10), reversedNum * 10 + num % 10);
    }
    return num === reverseNum(num, 0);
}

console.log(isPalindromeNumber3(121)); // true

// using reduce

function isPalindrome4(str) {
    return str.split('').reduce((acc, char, index) => {
        return acc && char === str[str.length - 1 - index];
    }, true);
}

console.log(isPalindrome4('madam'));    // true

function isPalindromeNumber4(num) {
    return num.toString().split('').reduce((acc, digit, index, arr) => {
        return acc && digit === arr[arr.length - 1 - index];
    }, true);
}

console.log(isPalindromeNumber4(121)); // true


//  write an javascript to programm to find any number equal to 100 return true
// a, b ==> a== 100 or b === 100 or a+b ===100 then return true else false
const isEqualTo100 = (a, b) => a === 100 || b === 100 || a + b === 100;
console.log(isEqualTo100(100, 0));
console.log(isEqualTo100(0, 100));
console.log(isEqualTo100(10, 90));

// get the extention of file name
const getFileNameExtenstion = (str) => str.slice(str.lastIndexOf("."));
console.log(getFileNameExtenstion("index.html"));
console.log(getFileNameExtenstion("index.js"));

// write a program replace every character in given string with the character following in alphabet
// String.fromCharCode or charCode forward by 1 place
const moveCharsForward = (str) =>
  str
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
    .join("");
console.log(moveCharsForward("abcd"));

// expected current date
const formatDate = (date = new Date()) => {
  const days = date.getDate() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${days}/${month}/${year}`;
};

console.log(formatDate());

//
const addString = (str) => (str.indexOf("New!") === 0 ? str : `New! ${str}`);
console.log(addString("goto gugu"));
console.log(addString("New! goto gugu"));
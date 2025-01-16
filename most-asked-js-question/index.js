// Debounce
let counter = 0;

const getData = () => {
  console.log("Data fetching from server", ++counter);
};

function debounce(cbf, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      cbf.apply(this, args);
    }, delay);
  };
}

const betterFetch = debounce(getData, 1000);

// Throttle
const logscroll = () => {
  console.log("Scrolling effect on div", new Date().toLocaleTimeString());
};

function throttle(cbf, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      cbf.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

const betterScrollEffect = throttle(logscroll, 2000);
// box.addEventListener("scroll", betterScrollEffect);

// Polyfill for Map, Reduce, filter, call bind apply, memoize etc

const array = [1, 2, 3, 4, 5];

Array.prototype.myMap = function (cbf) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(cbf(this[i], i, this));
  }
  return output;
};
console.log(array.map((num) => num * 2));
console.log(array.myMap((num) => num * 2));

Array.prototype.myFilter = function (cbf) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    if (cbf(this[i], i, this)) {
      output.push(this[i]);
    }
  }
  return output;
};
console.log(array.filter((num) => num > 2));
console.log(array.myFilter((num) => num > 2));

Array.prototype.myReduce = function (cbf, init) {
  let accumulator = init;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cbf(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

console.log(array.reduce((acc, curr) => acc + curr, 0));
console.log(array.myReduce((acc, curr) => acc + curr, 0));

console.log(array.reduce((acc, curr) => (acc > curr ? acc : curr)));
console.log(array.myReduce((acc, curr) => (acc > curr ? acc : curr)));

// call bind apply

const obj1 = {
  name: "Aravind",
};

const obj2 = {
  name: "Deepika",
};

let printUserInfo = function (branch, college) {
  console.log(
    `Hello, my name is ${this.name}, studied ${branch} from ${college}.`
  );
};

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not callable");
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not callable");
  }

  if (!Array.isArray(args)) {
    throw new TypeError("Its not an array");
  }

  context.fn = this;
  context.fn(...args);
};

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not bound as its not callable");
  }

  context.fn = this;
  return function (...newArgs) {
    return context.fn(...newArgs, ...args);
  };
};

// call
console.log("----------------call");
printUserInfo.call(obj1, "ISE", "PES");
printUserInfo.call(obj2, "ISE", "PES");
printUserInfo.myCall(obj1, "ISE", "PES");
printUserInfo.myCall(obj2, "ISE", "PES");

// Apply
console.log("----------------apply");
printUserInfo.apply(obj1, ["ISE", "PES"]);
printUserInfo.apply(obj2, ["ISE", "PES"]);
printUserInfo.myApply(obj1, ["ISE", "PES"]);
printUserInfo.myApply(obj2, ["ISE", "PES"]);

// bind
console.log("----------------bind");
const printAravindInfo = printUserInfo.bind(obj1, "ISE", "PES");
const printDeepikaInfo = printUserInfo.bind(obj2, "ISE", "PES");

printAravindInfo();
printDeepikaInfo();

const printAravindInfoC = printUserInfo.myBind(obj1, "ISE", "PES");
const printDeepikaInfoC = printUserInfo.myBind(obj2, "ISE", "PES");

printAravindInfoC();
printDeepikaInfoC();

function memoize(cbf, context) {
  let res = {};
  return function (...args) {
    var argCache = JSON.stringify(args);
    if (!res[argCache]) {
      res[argCache] = cbf.call(context || this, ...args);
    } else {
      return res[argCache];
    }
  };
}

function sum(a, b) {
  for (let i = 0; i < 10000000; i++) {}
  return a + b;
}

const memoizeAdd = memoize(sum);

console.time("first Call");
console.log(sum(10, 20));
console.timeEnd("first Call");

console.time("second Call");
console.log(sum(10, 20));
console.timeEnd("second Call");

console.time("First Call-1");
console.log(memoizeAdd(10, 20));
console.timeEnd("First Call-1");

console.time("second Call-1");
console.log(memoizeAdd(10, 20));
console.timeEnd("second Call-1");

// Promise and async-await
const url = "https://api.github.com/users/aravindhalahalli";

const fetchData = fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const fetchData1 = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

console.log("promise", fetchData);
console.log("async-await", fetchData1());

// Group by skills

const input = [
  {
    key: "Sample1",
    data: "data1",
  },
  {
    key: "Sample1",
    data: "data1",
  },
  {
    key: "Sample2",
    data: "data2",
  },
  {
    key: "Sample3",
    data: "data3",
  },
  {
    key: "Sample2",
    data: "data1",
  },
  {
    key: "Sample2",
    data: "data1",
  },
  {
    key: "Sample4",
    data: "data4",
  },
  {
    key: "Sample5",
    data: "data5",
  },
];

const output = [];
input.forEach((item) => {
  if (output[item.key]) {
    output[item.key].push(item);
  } else {
    output[item.key] = [item];
  }
});

console.log("groupbykey", output);

// flatten array
const arr1 = [1, 2, 3, [4, [5, 6, [7, 8]], 9, 10]];
console.log("Level-1", arr1.flat(1)); // [1,2,3,4,[5,6],7,8]
console.log("Level-2", arr1.flat(2)); // [1,2,3,4,5,6,7,8]
console.log("Infinity", arr1.flat(Infinity)); // [1,2,3,4,5,6,7,8]

function flattenArray(inputArr, flatenedArray) {
  for (let i = 0; i < inputArr.length; i++) {
    if (typeof inputArr[i] === "number") {
      flatenedArray.push(inputArr[i]);
    } else {
      flattenArray(inputArr[i], flatenedArray);
    }
  }
  return flatenedArray;
}

console.log("custom", flattenArray(arr1, []));

// setimeout
console.log("a");

setTimeout(() => {
  console.log("b");
}, 0);

let data = ["c", "d"];
data.forEach((element) => {
  console.log(element);
});

console.log("e");

// output -> a -> c -> d -> e -> b

// Design pattern calculator

function calculator() {
  this.totalAmount = 0;

  this.lacs = function (amountToBeAdded) {
    this.totalAmount += amountToBeAdded * 100000;
    return this;
  };

  this.crore = function (amountToBeAdded) {
    this.totalAmount += amountToBeAdded * 1000000;
    return this;
  };

  this.thousand = function (amountToBeAdded) {
    this.totalAmount += amountToBeAdded * 1000;
    return this;
  };

  this.value = function () {
    return this.totalAmount;
  };
}

function computeAmount() {
  return new calculator();
}

console.log(
  "Value",
  computeAmount()
    .lacs(15)
    .crore(5)
    .crore(2)
    .lacs(20)
    .thousand(45)
    .crore(7)
    .value()
);

// Chunks of an array
function chunksArray(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunksArray([1, 2, 3, 4], 3));

// Print duplicates in an array

const duplicatesArray = [1, 2, 3, 2, 4, 5, 6, 4, 5, 7, 8, 9]; // [2,4,5]

function printduplicates(array) {
  let duplicates = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      let temp = array[i];
      if (temp === array[j]) {
        duplicates.push(temp);
      }
    }
  }
  return [...new Set(duplicates)];
}

console.log("duplicates", printduplicates(duplicatesArray));

function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

console.log("Unique Array", uniqueArr(duplicatesArray));

// currying / infinite currying

function sum(a, b, c) {
  return a + b + c;
}

// currying
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log("sum - currying", sum(1)(2)(3));

// infinite currying
function infiniteSum(a) {
  return function (b) {
    if (!b) return a;
    return infiniteSum(a + b);
  };
}

console.log("infinite-sum-currying", infiniteSum(1)(2)(3)(4)(5)(6)());

// factorial of number
function factorial(num) {
  if ((num === 0) | (num === 1)) return 1;
  return num * factorial(num - 1);
}

console.log("factorial of num", factorial(3)); // 6

// Number is prime / not a prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % 2 === 0) return false;
  }
  return true;
}

console.log("isPrime", isPrime(1)); // false
console.log("isPrime", isPrime(2)); // true

function findMinMax(arr) {
  let max = Math.max(...arr);
  let min = Math.min(...arr);
  return [max, min];
}
// [1,2,3,4,5]
console.log("Max-min", findMinMax(array)); // [5,1]

function reverseString(str) {
  return str.split("").reverse().join("");
}

function customReverseStr(str) {
  let reversestr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversestr += str[i];
  }
  return reversestr;
}

console.log("Reverse-string - ", reverseString("CAT")); // TAC
console.log("Reverse-string-custom - ", customReverseStr("CAT")); // TAC

let inpString = "MyNameIsAravind";
function camelCaseLetter(str) {
  return str.replace(/([A-Z])/g, " $1").trim();
}
console.log(camelCaseLetter(inpString));

function sumArguments(a, b) {
  //   "use strict";
  //   let a = 100;
  //   let b = 200;
  return arguments[0] + arguments[1];
  //   console.log(a + b);
}

console.log("sum-arguments", sumArguments(10, 2000));

var abc = 10;
let xyz = 20;

console.log("window", window.abc, window.xyz); // 10 , undefined

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

// Array merge in altenative
const a1 = [1, 2, 3, 4];
const a2 = [5, 6, 7, 8];

function arrayMergeAlternative(a1, a2) {
  let outPutArr = [];
  let maxLength = Math.max(a1.length, a2.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < a1.length) outPutArr.push(a1[i]);
    if (i < a2.length) outPutArr.push(a2[i]);
  }
  return outPutArr;
}

console.log("Alternate array merge", arrayMergeAlternative(a1, a2));

// Transform str
const str = "hello world";

function transformString(inpstr) {
  const words = inpstr.split(" ");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("\n");
}

console.log(transformString(str));
// hello
// world

var num = 500;
function doSomething() {
  console.log(num); // undefined
  var num = 100;
}
console.log(num); // 500
doSomething(); // undefined

// To make an array empty
const arrr = [1, 2, 4, 5];
// arrr.length = 0
// arrr.splice(0,5)
console.log(arrr);

const c = {
  name: "Aravind",
};

let d; // initilization and decalration should be done at time when we used const
d = c;
c.name = "Deepika";
console.log(d.name); // deepika

console.log("" > -1); // "" -> false -> 0 > -1 => true
console.log("" == true); // "" -> false == true => false

console.log("Greater" > "Elephant"); // true

// MAP VS FOREACH

const value = [];
array.forEach((element) => {
  value.push(element * 2);
});

const multiple2 = array.map((num) => num * 2);

console.log(value);
console.log(multiple2);
console.log(array);

console.log(![] + []); // [] =>truthy value [false + ""] => false

// Object
// an object is javascript collections along with key value pairs where key are string / symbols and value can be any data types
// Creating an object
// 1. using an object literals
let object = {
  key1: "Hello",
  key2: "Welcome",
  key3: function () {
    console.log(this.key1 + " " + this.key2);
  },
};

console.log(Object.keys(object));
console.log(Object.values(object));
console.log(Object.entries(object));

console.log(object);
Object.freeze(object);
object.key1 = "Hello welcome";
console.log(object);

// 2. Using Object constructor
const objj2 = new Object();
obj2.key = "Aravind";
console.log(objj2);

//
const carModal = {
  make: "Toyota",
  modal: "Corrolla",
  start: function () {
    console.log("car started");
  },
};
carModal.start();
console.log(carModal.make, carModal.modal);

function fibbnoci(num) {
  if (num === 0 || num === 1) return 1;
  return num * fibbnoci(num - 1);
}

console.log(fibbnoci(3));

const objectt = {
  a: 1,
  b: { c: 3 },
};

console.log(objectt);
const shallowcopy = { ...objectt };
shallowcopy.b.c = 10;
shallowcopy.a = "Aravind";
console.log(objectt);
console.log(shallowcopy);

const deepCopy = JSON.parse(JSON.stringify(objectt));
shallowcopy.b.c = 10;
shallowcopy.a = "Aravind";
console.log(objectt);
console.log(deepCopy);

for (let key in carModal) {
  console.log(key, carModal[key]);
}

Object.keys(carModal).forEach((key) => {
  console.log(key, carModal[key]);
});

//prototype inheritance, object can inherit properties and methods from another object.

const parent = { greet: () => "Hello" };
const child = Object.create(parent);
console.log(child.greet());

const obj = {
  sum: 200,
};

console.log(obj.sum); // 200
console.log(delete obj.sum); // true
console.log(obj.sum, obj); // {}

const arrrr = [1, 2, 3, 4];

console.log(...arrrr); // 1 2 3 4

// console.log("marks", mark); // reference error: Can't access mark before initilization
let mark = 400;
console.log("marks", mark); // mark 400

// null and undefined concepts

function dosomething(a = 5, b = 7) {
  console.log(a + b); // 25
}

dosomething(undefined, 20); // 25

function dosomething1(a = 5, b = 7) {
  console.log(a + b); // 20
}

dosomething1(null, 20); //20

// const summm = 100 + score; // score not defined
// score = 500;
// const summm = 100 + score;
// console.log(summm) // NaN

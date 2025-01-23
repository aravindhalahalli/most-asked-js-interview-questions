let counter = 0;

const getData = () => {
  console.log("Data fetch from server", ++counter);
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

const betterFetchData = debounce(getData, 1000);

const logscroll = () => {
  console.log("Log scroll on y axis", new Date().toLocaleTimeString());
};

// box.addEventListener("scroll", logscroll);

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

// Better logging
const betterLogging = throttle(logscroll, 1000);
box.addEventListener("scroll", betterLogging);

// Event bubbling/capturing

document.querySelector("#grand-parent").addEventListener(
  "click",
  (e) => {
    console.log("Grand parent clicked", e.target);
  },
  false
); // capturing

document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("parent clicked", e.target);
  },
  false
); // capturing

document.querySelector("#child").addEventListener(
  "click",
  (e) => {
    console.log("child clicked", e.target);
    e.stopPropagation();
  },

  false
); //capturing

//  false = > bubbling
//  true = > capturing

// Event delegation attaching event and every elements we can attach an event to its parent, so by doing this we can reduce multiple event listers by adding an single event listners
document.querySelector("#category").addEventListener("click", (e) => {
  console.log("category clicked", e.target);
  if (e.target.tagName === "LI") {
    window.open(`/${e.target.id}`, "_blank");
  }
});

// Polyfill
const array = [1, 2, 3, 4, 5];
Array.prototype.myMap = function (cbf) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(cbf(this[i], i, this));
  }
  return output;
};

Array.prototype.myFilter = function (cbf) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    if (cbf(this[i], i, this)) {
      output.push(this[i]);
    }
  }
  return output;
};

Array.prototype.myReduce = function (cbf, init) {
  let accumulator = init;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cbf(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

console.log("Map");
console.log(array.map((num) => num * 2));
console.log(array.myMap((num) => num * 2));

console.log("Filter");
console.log(array.filter((num) => num > 2));
console.log(array.myFilter((num) => num > 2));

console.log("Reduce");
console.log(array.reduce((acc, curr) => acc + curr));
console.log(array.myReduce((acc, curr) => acc + curr));

// Polyfill for call,bind,apply
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not callable");
  }

  context.fn = this;
  context.fn(...args);
};
Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not callable");
  }
  context.fn = this;
  return function (...newArgs) {
    return context.fn(...newArgs, ...args);
  };
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not callable");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("Not an array");
  }
  context.fn = this;
  context.fn(...args);
};

const obj1 = {
  fname: "Aravind",
  lname: "Kumar",
};

const obj2 = {
  fname: "Kumar",
  lname: "R",
};

let printInfo = function (branch, college) {
  console.log(
    `Hello Team, my name is ${this.fname} ${this.lname} and Studied ${branch} from ${college}`
  );
};

console.log("call");
printInfo.call(obj1, "ISE", "PES");
printInfo.call(obj2, "ISE", "PES");

printInfo.myCall(obj1, "ISE", "PES");
printInfo.myCall(obj2, "ISE", "PES");

console.log("APPLY");
printInfo.apply(obj1, ["ISE", "PES"]);
printInfo.apply(obj2, ["ISE", "PES"]);

printInfo.myApply(obj1, ["ISE", "PES"]);
printInfo.myApply(obj2, ["ISE", "PES"]);

console.log("bind");
const aravindInfo = printInfo.bind(obj1, "ISE", "PES");
const deepikaInfo = printInfo.bind(obj2, "ISE", "PES");

aravindInfo();
deepikaInfo();

const aravindCustomInfo = printInfo.myBind(obj1, "ISE", "PES");
const deepikaCustomInfo = printInfo.myBind(obj2, "ISE", "PES");

aravindCustomInfo();
deepikaCustomInfo();

function memomize(fn, context) {
  let res = {};
  return function (...args) {
    var argCahce = JSON.stringify(args);
    if (!res[argCahce]) {
      res[argCahce] = fn.call(this || context, ...args);
    } else {
      return res[argCahce];
    }
  };
}

function sum(a, b) {
  for (let i = 0; i < 1000000; i++) {}
  return a + b;
}

const memomizeAdd = memomize(sum);

console.time("first Call");
console.log(sum(10, 20));
console.timeEnd("first Call");

console.time("second Call");
console.log(sum(10, 20));
console.timeEnd("second Call");

console.log("Testing");

console.time("First Call-1");
console.log(memomizeAdd(10, 20));
console.timeEnd("First Call-1");

console.time("second Call-1");
console.log(memomizeAdd(10, 20));
console.timeEnd("second Call-1");

// Currying
function sumNumber(a) {
  return function (b) {
    return a + b;
  };
}

console.log(sumNumber(10)(2000));

function infiniteCurrying(a) {
  return function (b) {
    if (!b) return a;
    return infiniteCurrying(a + b);
  };
}

console.log(infiniteCurrying(1)(2)(3)(4)(5)());

// search an rotated array
// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
// Example 3:

// Input: nums = [1], target = 0
// Output: -1

function search(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}

function searchbyIndex(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    return nums.indexOf(target);
  }
}

console.log(searchbyIndex([4, 5, 6, 7, 0, 1, 2], 0));

function isValid(str) {
  let stack = [];
  const characters = { ")": "(", "}": "{", "]": "[" };
  for (const char of str) {
    if (!characters[char]) {
      stack.push(char);
    } else if (stack.pop() !== characters[char]) {
      return false;
    }
  }
  return stack.length === 0 ? true : false;
}
console.log(isValid("()"));

// sort stack
// Input : [34, 3, 31, 98, 92, 23]
// Output : [3, 23, 31, 34, 92, 98]

// Input : [3, 5, 1, 4, 2, 8]
// Output : [1, 2, 3, 4, 5, 8]

function sortArray(array) {
  return array.sort((a, b) => a - b);
}

console.log(sortArray([34, 3, 31, 98, 92, 23]));

// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]

var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9));

//Merge two lists

// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]
// Example 2:

// Input: list1 = [], list2 = []
// Output: []
// Example 3:

// Input: list1 = [], list2 = [0]
// Output: [0]

var mergeTwoLists = function (list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};

// console.log(mergeTwoLists([1,2,4],[1,3,4]))

// anagrama or not
// Example 1:

// Input: s = "anagram", t = "nagaram"

// Output: true

// Example 2:

// Input: s = "rat", t = "car"

// Output: false

var isAnagram = function (s, t) {
  return s.split("").sort().join("") === t.split("").sort().join("");
};

// Binary search
var search = function (nums, target) {
  // for(let i=0;i<nums.lenght;i++){
  //     if(nums[i] === target){
  //         return i;
  //     }
  //     return -1;

  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    nums[mid] < target ? (left = mid + 1) : (right = mid - 1);
  }
  return -1;
};

const arrayproto = [1, 2, 3, 4, 5];

const objectproto = {
  name: "Aravind",
  getName: function () {
    console.log(this.name);
  },
};

function hello(){
  console.log("Hello printing")
}
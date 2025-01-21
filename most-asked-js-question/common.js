console.log("Start");

setTimeout(() => {
  console.log("Timeout"); // macro / callback queue
}, 0);

Promise.resolve().then(() => {
  console.log("Promise"); // Microtask queue
});

console.log("End");

// Start => End => Promise => Timeout

const arr = [1, 2, 3];
const newArr = arr;

newArr.push(4);
console.log(arr); // [1,2,3,4]
console.log(newArr); // [1,2,3,4]

// As array points to same memory location

function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}
const fn = outer();

fn(); // 1
fn(); // 2
fn(); // 3

// due to scope and closure will create around it and answer will be 1 2 3

async function test() {
  try {
    return await Promise.reject("Error");
  } catch (e) {
    console.log("Caught:", e);
  }
}
test().then((result) => console.log("Result:", result));

// "Caught": Error
//  Result : undefined

async function test() {
  return 1;
}
console.log(test());
test().then(console.log);

for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  })(i);
} // 0 1 2

console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof undefined); // undefined
console.log(typeof String); // function
console.log("1" - "1" + "1");
console.log("1" + "1" + "1");

function sayHi() {
  console.log(name); // 'Lydia'
  console.log(age); // Error - Can't access age before initilization.
  var name = "Lydia";
  let age = 21;
}

// sayHi();

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

// 3 3 3

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
// 0 1 2

const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter()); // 20
console.log(shape.perimeter()); // undefined => NaN

let c = { greeting: "Hey!" };
let d;

d = c;
c.greeting = "Hello";
console.log(d.greeting); // Hello => n JavaScript, all objects interact by reference when setting them equal to each other.

{
  let a = 3;
  let b = new Number(3); // {Number:3}
  let c = 3;

  console.log(a == b); // true
  console.log(a === b); // false
  console.log(b === c); // false
}

let randomValue = { name: "Lydia" };
randomValue = 23;

if (!typeof randomValue === "string") {
  console.log("It's not a string!");
} else {
  console.log("Yay it's a string!");
}

const employees = [
  { name: "emp1", skills: ["Python", "React"] },
  { name: "emp2", skills: ["Javascript", "React"] },
  { name: "emp3", skills: ["Java"] },
  { name: "emp2", skills: ["Python"] },
  { name: "emp4", skills: ["Javascript", "React"] },
];

function getEmployeesBySkills(employees) {
  const skillsRes = {};
  employees.forEach((employee) => {
    employee.skills.forEach((skill) => {
      // "Python", "React"
      const skillKey = skill.toLowerCase();
      if (!skillsRes[skillKey]) {
        skillsRes[skillKey] = [];
      }
      if (!skillsRes[skillKey].includes(employee.name)) {
        skillsRes[skillKey].push(employee.name);
      }
    });
  });
  return skillsRes;
}

console.log(getEmployeesBySkills(employees));

// Higher order function - function which takes function as an argument and return result as function.
function callbackfunction() {
  console.log("callback function");
}

function higherOrderFunction(cb) {
  console.log("HOF - called");
  cb();
}

higherOrderFunction(callbackfunction);

// example for calculate  an area -
// OLD METHODS
const radius = [1, 2, 3, 4];
const calculateArea = function (radius) {
  const output = [];
  for (let index = 0; index < radius.length; index++) {
    output.push(Math.PI * radius[index] * radius[index]);
  }
  return output;
};

console.log(calculateArea(radius));

const calculateDiameter = function (radius) {
  const output = [];
  for (let index = 0; index < radius.length; index++) {
    output.push(2 * radius[index]);
  }
  return output;
};

console.log(calculateDiameter(radius));

console.log("--------------HOF---------------");

// if we keep on add code will increses so we can use / create an hof function.
// HOF
const calculate = function (radius, logicCb) {
  const output = [];
  for (let index = 0; index < radius.length; index++) {
    output.push(logicCb(radius[index]));
  }
  return output;
};
// Utility callback functions to above functions
const area = (radius) => Math.PI * radius * radius;
const diameter = (radius) => 2 * radius;
const circumference = (radius) => 2 * Math.PI * radius;

// Using an HOF with cb
console.log(calculate(radius, area));
console.log(calculate(radius, diameter));
console.log(calculate(radius, circumference));

// When working with arrays, you can use the map(), reduce(), filter(), and sort() functions to manipulate and transform data in an array.
// When working with objects, you can use the Object.entries() function to create a new array from an object.
// When working with functions, you can use the compose() function to create complex functions from simpler ones.

// map
// The map() function takes an array of values and applies a transformation to each value in the array. It does not mutate the original array. It is often used to transform an array of data into a new array with a different structure.
// map(callbackFn) =>          callbackFn(element, index, array)
// map(callbackFn, thisArg)    thisArg=> A value to use as this when executing callbackFn
const arraa = [1, 2, 3, 4, 5];

const sumBy10 = arr.map((ele) => ele + 10);
const multipleby2 = arr.map((ele) => ele * 2);
const checkGreaterthantwo = arr.map((ele) => ele > 2);
console.log("--------JS Map----------");
console.log(sumBy10);
console.log(multipleby2);
console.log(checkGreaterthantwo);

// write an custom map using an array prototype
Array.prototype.customMap = function (callbackFn) {
  const resArray = [];
  for (let index = 0; index < this.length; index++) {
    resArray.push(callbackFn(this[i], i, this));
  }
  return resArray;
};
console.log("--------custom Map-------");
console.log(sumBy10);
console.log(multipleby2);
console.log(checkGreaterthantwo);

// Here we have an array of users. Suppose we only want their first and last name. We can simply use the map() method to extract it from the users array.
const users = [
  { firstName: "John", lastName: "Doe", age: 25 },
  { firstName: "Jane", lastName: "Doe", age: 30 },
  { firstName: "Jack", lastName: "Doe", age: 35 },
  { firstName: "Jill", lastName: "Doe", age: 40 },
  { firstName: "Joe", lastName: "Doe", age: 45 },
];

const resUsersFL = users.map((ele) => ele.firstName + " " + ele.lastName);
console.log(resUsersFL);

// Filter
// The filter() function takes an array and returns a new array with only the values that meet certain criteria. It also does not mutate the original array.
// filter(callbackFn) =>          callbackFn(element, index, array)
// filter(callbackFn, thisArg)    thisArg=> A value to use as this when executing callbackFn

// Example
// You can use filter() to return only the odd numbers from an array of numbers.
const outputFilterEven = arr.filter((ele) => ele % 2 == 0); // Even
const outputFilterOdd = arr.filter((ele) => ele % 2); // odd

console.log(outputFilterEven, outputFilterOdd);

// custom filter
Array.prototype.customFilter = function (callbackFn) {
  const output = [];
  for (let index = 0; index < this.length; index++) {
    if (callbackFn(this[i], i, this)) {
      output.push(this[i]);
    }
  }
  return output;
};

const outputCustomFilterEven = arr.filter((ele) => ele % 2 == 0); // Even
const outputCustomFilterOdd = arr.filter((ele) => ele % 2); // odd

console.log(outputCustomFilterEven, outputCustomFilterOdd);

// You can use filter() to return only the users having age greater than 30 in an array.
const userFileters = users.filter((user) => user.age > 30);
console.log(userFileters);

function getUserGreaterThan30(users) {
  const output = [];
  for (let index = 0; index < users.length; index++) {
    if (users[index].age > 30) {
      output.push(users[index]);
    }
  }
  return output;
}

console.log("User", getUserGreaterThan30(users));

// Reduce
// reduce() method, you should is used it when you want to perform some operation on the elements of an array and return a single value as a result. The "single value" refers to the accumulated result of repeatedly applying a function to the elements of a sequence.
const sumArray1 = arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sumArray1);

// Using reduce() to find the maximum value in an array:
let numbers = [5, 20, 100, 60, 1];
const maximumValue = numbers.reduce((accumulator, currentValue) => {
  return currentValue > accumulator ? currentValue : accumulator;
}, numbers[0]);

console.log(maximumValue);

// Using reduce() to merge different objects in a single object:

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { e: 5, f: 6 };

const mergeSingleObj = [obj1, obj2, obj3].reduce((acc, curr) => {
  return { ...acc, ...curr };
}, {});

console.log(mergeSingleObj);

// Using reduce() to group objects in an array. For example, grouping products in a shopping cart according to their brand name.

const shoppingCart = [
  { name: "Apple", price: 1.99, quantity: 3 },
  { name: "Apple", price: 1.99, quantity: 3 },
  { name: "Xiomi", price: 2.99, quantity: 2 },
  { name: "Samsung", price: 3.99, quantity: 1 },
  { name: "Tesla", price: 3.99, quantity: 1 },
  { name: "Tesla", price: 4.99, quantity: 4 },
  { name: "Nokia", price: 4.99, quantity: 4 },
];

const product = shoppingCart.reduce((productGroup, currproduct) => {
  const name = currproduct.name;
  if (productGroup[name] == null) {
    productGroup[name] = [];
  }
  productGroup[name].push(currproduct);
  return productGroup;
}, {});

console.log(product);

// Custom Reduce
Array.prototype.customReduce = function (callbackFn, initialValue) {
  let accumulator = initialValue;
  let startIndex = this[0];
  startIndex = 1;
  for (let index = 0; index < this.length; index++) {
    accumulator = callbackFn(accumulator, this[i], i, this);
  }
  return accumulator;
};

const addByTwo = arr.map((ele) => ele + 2);
const addByTwoCmap = arr.customMap((ele) => ele + 2);
console.log(addByTwo);
console.log(addByTwoCmap);

const getMoreThanTwo = arr.filter((ele) => ele > 2);
const getMoreThanTwoCfilter = arr.customFilter((ele) => ele > 2);
console.log(getMoreThanTwo);
console.log(getMoreThanTwoCfilter);

const sumArray = arr.reduce((acc, curr) => {
  return acc + curr;
}, 0);

const sumArrayCreducer = arr.reduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(sumArray);
console.log(sumArrayCreducer);

// ‘5’ + 3 and ‘5’ — 3  o/p ??? 53 and 2
var y = 1;
if (function () {}) {
  y += typeof f;
}
console.log(y);
// Q: if condition true what is the output  === 1undefined
// Q: if condition false what is the output === 1

function foo() {
  let a = (b = 0);
  a++;
  return a;
}
console.log(foo()); // 1
typeof a; // => ??? // reference error a is not defined
typeof b; // => ??? // number

//Q explain what is the output and why

console.log(0.1 + 0.2 == 0.3); // false
console.log(0.1 + 0.2 === 0.3); //  false

console.log(1 + 2 == 3); // o/p true
console.log(1 + 2 === 3); // o/p true

console.log(null ?? true);
console.log(false ?? true);
console.log(undefined ?? true);

console.log("--------------- promise--------");

const promise = new Promise((resolve, reject) => {
  console.log("Start");
  setTimeout(() => {
    console.log("first timeout");
    resolve("success");
    console.log("second timeout");
  }, 0);
});
promise.then((data) => console.log(data));
console.log("End");



const URL = "https://api.github.com/users/aravindhalahalli";
const user = fetch(URL);
// user.then((res) => res.json()).then((data) => console.log(data));
// user.then(function (data) {
//   console.log(data);
// });
// console.log(user);

const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject("Operation failed.");
  }
});
// console.log(myPromise);
// myPromise.then((res) => console.log(res)).catch((err) => console.log(err));

// myPromise
//   .then((result) => {
//     console.log(result); // Logs the first operation’s result
//     return "Next step";
//   })
//   .then((nextResult) => {
//     console.log(nextResult); // Logs "Next step"
//   })
//   .catch((error) => {
//     console.error(error); // Handles any error that occurs in the chain
//   });

async function asynFunc() {
  try {
    const res = await myPromise;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

asynFunc();

getName(); // Namaste JavaScript
console.log(x); // undefined
var x = 7;
function getName() {
  console.log("Namaste Javascript");
}

getName(); // Uncaught TypeError: getName is not a function
console.log(getName);
var getName = function () {
  console.log("Namaste JavaScript");
};
// The code won't execute as the first line itself throws an TypeError.

getName(); // Namaste JavaScript
console.log(x); // Uncaught Reference: x is not defined.
console.log(getName); // f getName(){ console.log("Namaste JavaScript); }
function getName() {
  console.log("Namaste JavaScript");
}

var x = 1;
a(); // 10
bb()
console.log(x); // 1

function a() {
  var x = 10; // local scope because of separate execution context
  console.log(x);
}
function bb() {
  var x = 100;
  console.log(x);
}

// we are calling the functions before defining them. This will work properly, as seen
// in Hoisting.


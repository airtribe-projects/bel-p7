const fs = require('fs');

console.log("hello");

fs.readFile('./input.txt', function () {
  setTimeout(() => {
    console.log("Inside the set timeout function");
  }, 0);

  setImmediate(() => {
    console.log("Inside the set immediate function");
  });
});

setTimeout(() => {
    console.log("Outside the set timeout function");
  }, 0);

  setImmediate(() => {
    console.log("Outside the set immediate function");
  });


console.log("end");
console.log("hello");

for(let i=0;i<100;i++) {
  console.log("inside for loop");
}

setTimeout(() => {
    console.log("hi");
}, 0);

process.nextTick(() => {
    console.log("Inside next tick");
});

console.log("end");
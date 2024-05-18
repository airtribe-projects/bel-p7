console.log("hello");

for(let i=0;i<1000000000000;i++) {
  console.log("inside for loop");
}

setTimeout(() => {
    console.log("hi");
}, 100);

console.log("end");
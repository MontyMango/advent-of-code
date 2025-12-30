const str:string = "hello everyone!";
let re = new RegExp('e','g');
let found

console.log(str.matchAll(re).forEach((e) => {
    console.log(e[0]);
}));

re = /e/g;

console.log([str.matchAll(re)]);
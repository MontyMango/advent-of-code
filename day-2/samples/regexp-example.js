var str = "hello everyone!";
var re = new RegExp('e', 'g');
var found;
console.log(str.matchAll(re).forEach(function (e) {
    console.log(e[0]);
}));
re = /e/g;
console.log([str.matchAll(re)]);

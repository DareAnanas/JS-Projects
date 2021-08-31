let arr;
arr = ['Black', 'Red'];
arr.push('Yellow');
arr[arr.indexOf('Red')] = 'Blue';
console.log(arr.shift());
arr.unshift('Green', 'Gray');

arr = [];
function sumPrompt() {
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    while(1) {
        inp = prompt('Введи значення!!!!!!!!!!!!!!!!!!!');
        if (isNaN(inp)) {
            break;
        }
        arr.push(parseInt(inp))
    }
    console.log(arr.reduce(reducer))
}

sumPrompt()

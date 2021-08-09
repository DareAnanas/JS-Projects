let money;
let time;
let expenses;
let appData = {
    money: '',
    time: '',
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
}


function getExpenses() {
    return [prompt("Введіть обов'язкову статтю витрат в цьому місяці?"),
    prompt("У скільки обійдеться?")]
}


money = prompt('Ваш бюджет на місяць?', '')
time = prompt('Введіть дату в форматі YYYY-MM-DD', '')
appData.money = money
appData.time = time
expenses = getExpenses()
appData.expenses[expenses[0]] = expenses[1]
expenses = getExpenses()
appData.expenses[expenses[0]] = expenses[1]
console.log(appData.expenses)


let startBtn = document.getElementById('start');
let valueBlocks = document.querySelectorAll("div[class$='-value']");
let expensesItem = document.querySelectorAll('expenses-item');
let buttons = document.getElementsByTagName('button');
let confirmBtn = buttons[0];
let calculateBtn = buttons[2];
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
let chooseIncome = document.querySelector('.choose-income');
let savings = document.querySelector('#savings');
let chooseSum = document.querySelector('.choose-sum');
let choosePercent = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

let appData = {
    money: '',
    time: '',
    expenses: {},
    optionalExpenses: {},
    income: [],
    monthIncome: 0,
    savings: true,
    dayBudget: 0,
    start: function () {
        let money;
        let time;
        money = prompt('Ваш бюджет на місяць?', '')
        while (isNaN(money) || money == '' || money == null) {
            alert('Введи правильно бюджет!')
            money = prompt('Ваш бюджет на місяць?', '')
        }
        time = prompt('Введіть дату в форматі YYYY-MM-DD', '')
        appData.money = parseInt(money)
        

        appData.time = new Date(time)
        yearValue.value = appData.time.getFullYear()
        monthValue.value = appData.time.getMonth()
        dayValue.value = appData.time.getDay()
        console.log(appData.time)
    }
}

startBtn.addEventListener('click', appData.start)


let startBtn = document.getElementById('start');
let valueBlocks = document.querySelectorAll("div[class$='-value']");
let expensesItem = document.querySelectorAll('.expenses-item');
let buttons = document.getElementsByTagName('button');
let confirmBtn = buttons[0];
let confirmBtn2 = buttons[1];
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
    yearIncome: 0,
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
        while (time == '' || time == null) {
            alert('Введи дату!')
            time = prompt('Введіть дату в форматі YYYY-MM-DD', '')
        }
        appData.money = parseInt(money)
        valueBlocks[0].innerText = appData.money
        appData.time = new Date(time)
        yearValue.value = appData.time.getFullYear()
        monthValue.value = appData.time.getMonth() + 1
        dayValue.value = appData.time.getDate()
    },
    chooseExpenses: function () {
        let expenses = 0;
        expensesItem.forEach((e, i, arr) => {
            if (i % 2 == 0) {
                let data = arr[i + 1].value
                appData.expenses[e.value] = parseInt(data)
                expenses += parseInt(data)
            }
        })
        valueBlocks[3].innerText = expenses
    },
    chooseOptExpenses: function () {
        optionalExpensesItem.forEach((e, i) => {
            appData.optionalExpenses[i + 1] = e.value
        })
        let optExpStr = '';
        for (key in appData.optionalExpenses) {
            optExpStr = optExpStr + appData.optionalExpenses[key] + ','
        }
        valueBlocks[4].innerText = optExpStr.substr(0, optExpStr.length - 1)
    },
    detectDayBudget: function () {
        if (appData.money != '') {
                let money = appData.money
                for (i in appData.expenses) {
                    money -= appData.expenses[i]
                }
                appData.dayBudget = Math.round(money / 30)
                valueBlocks[1].innerText = appData.dayBudget
                if (appData.dayBudget <= 300) {
                    valueBlocks[2].innerText = 'Низький рівень доходів'
                }
                else if (appData.dayBudget > 300 && appData.dayBudget <= 700) {
                    valueBlocks[2].innerText = 'Середній рівень доходів'
                }
                else {
                    valueBlocks[2].innerText = 'Високий рівень доходів'
                }
        }
        else {
            valueBlocks[1].innerText = 'Сталась помилка!'
        }
        if (chooseIncome.value != '') {
            appData.chooseIncome()
        }
        if (appData.savings) {
            appData.calculateSavings()
        }
        
    },
    chooseIncome: function () {
        appData.income = []
        let income = chooseIncome.value;
        if (income.indexOf(',') == -1) {
            appData.income.push(income)
        }
        else {
            income = income.replace(/ /g, '')
            income.split(',').forEach((e) => {
                appData.income.push(e)
            })
        }
        appData.income.sort()
        valueBlocks[5].innerText = appData.income
    },
    checkSavings: function () {
        appData.savings = savings.checked
        console.log(savings.checked)
    },
    calculateSavings: function () {
        let sum = chooseSum.value;
        let percent = choosePercent.value;
        appData.monthIncome = Math.round(sum / 100 / 12 * percent, 2)
        appData.yearIncome = Math.round(sum / 100 * percent, 2)
        valueBlocks[6].innerText = appData.monthIncome
        valueBlocks[7].innerText = appData.yearIncome
    }
}

startBtn.addEventListener('click', appData.start)
confirmBtn.addEventListener('click', appData.chooseExpenses)
confirmBtn2.addEventListener('click', appData.chooseOptExpenses)
calculateBtn.addEventListener('click', appData.detectDayBudget)
savings.addEventListener('change', appData.checkSavings)



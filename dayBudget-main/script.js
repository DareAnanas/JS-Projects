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
        while (1) {
            money = prompt('Ваш бюджет на місяць?', '')
            time = prompt('Введіть дату в форматі YYYY-MM-DD', '')
            if (isNaN(money) || money == '' || money == null) {
                alert('Введи правильно бюджет!')
                continue;
            }
            break;
        }
        appData.money = parseInt(money)
        appData.time = time
    },
    chooseExpenses: function () {
        let p1;
        let p2;
        while (1) {
            p1 = prompt("Введіть обов'язкову статтю витрат в цьому місяці?", '');
            if (p1 == '' || p1 == null) {
                alert('Введи назву!')
                continue;
            }
            p2 = prompt("У скільки обійдеться?", '');
            if (p2 == '' || p2 == null) {
                alert('Введи значення!')
                continue;
            }
            break;
        }
        appData.expenses[p1] = p2
        
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save;
            let percent;
            while (1) {
                save = prompt("Яка сума депозиту?", '');
                if (save == '' || save == null) {
                    alert('Введи суму депозиту!')
                    continue;
                }
                percent = prompt("Під який процент?", '');
                if (percent == '' || percent == null) {
                    alert('Введи проценти!')
                    continue;
                }
                break;
            }
            appData.monthIncome = (save / 100 / 12 * percent)
            alert('Ваш місячний дохід від депозита: ' + String(appData.monthIncome))
        }
    },
    detectDayBudget: function () {
        this.start()
        for (let i = 0; i < 2; i++) {
            this.chooseExpenses();
        }
        for (i in appData.expenses) {
            appData.money -= parseInt(appData.expenses[i])
        }
        appData.dayBudget = appData.money / 30
        alert('Ваш бюджет на день: ' + String(appData.dayBudget))
    },
    detectLevel: function () {
        if (appData.dayBudget < 300) {
            alert('Низький рівень доходів')
        } else if (appData.dayBudget >= 300 < 600) {
            alert('Середній рівень доходів')
        } else {
            alert('Високий рівень доходів')
        }
    },
    chooseOptExpenses: function () {
        let optExp;
        for (let i = 1; i < 4; i++) {
            while (1) {
                optExp = prompt("Стаття необов'язкових витрат?")
                if (optExp == '' || optExp == null) {
                    alert("Введи статтю необов'язкових витрат")
                    continue
                }
                break
            }
            appData.optionalExpenses[i] = optExp
        }
    },
    chooseIncome: function () {
        let income;
        while (1) {
            income = prompt("Що принесе вам додатковий дохід?", '');
            if (income == '' || income == null) {
                alert("Введи!")
                continue
            }
            break
        }
        if (income.indexOf(',') == -1) {
            appData.income.push(income)
        }
        else {
            income = income.replace(/ /g, '')
            income.split(',').forEach((e) => {
                appData.income.push(e)
            })
        }
        income = prompt("Можливо ви маєте ще якісь доходи?", '');
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
        appData.income.forEach((e) => {
            console.log(e)
        })
    },
    showData: function () {
        console.log("Наша програма в себе включає: ")
        for (k in this) {
            console.log(k)
        }
    }
}
/*
function start() {
    let money;
    let time;
    while(1) {
        money = prompt('Ваш бюджет на місяць?', '')
        time = prompt('Введіть дату в форматі YYYY-MM-DD', '')
        if (isNaN(money) || money == '' || money == null) {
            alert('Введи правильно бюджет!')
            continue;
        }
        break;
    }
    appData.money = parseInt(money)
    appData.time = time
}

function chooseExpenses() {
    let p1;
    let p2;
    while(1) {
        p1 = prompt("Введіть обов'язкову статтю витрат в цьому місяці?", '');
        if (p1 == '' || p1 == null) {
            alert('Введи назву!')
            continue;
        }
        p2 = prompt("У скільки обійдеться?", '');
        if (p2 == '' || p2 == null) {
            alert('Введи значення!')
            continue;
        }
        break;
    }
    appData.expenses[p1] = p2
    console.log(appData.expenses)
}

function checkSavings() {
    if (appData.savings == true) {
        let save;
        let percent;
        while(1) {
            save = prompt("Яка сума депозиту?", '');
            if (save == '' || save == null) {
                alert('Введи суму депозиту!')
                continue;
            }
            percent = prompt("Під який процент?", '');
            if (percent == '' || percent == null) {
                alert('Введи проценти!')
                continue;
            }
            break;
        }
        appData.monthIncome = (save/100/12*percent)
        alert('Ваш місячний дохід від депозита: ' + String(appData.monthIncome))
    }
}

function detectDayBudget() {
    start()
    for (let i = 0; i < 2; i++) {chooseExpenses();}
    for (i in appData.expenses) {
        appData.money -= parseInt(appData.expenses[i])
    }
    appData.dayBudget = appData.money/30
    alert('Ваш бюджет на день: ' + String(appData.dayBudget))
}

function detectLevel() {
    if (appData.dayBudget < 300) {
        alert('Низький рівень доходів')
    }
    else if (appData.dayBudget >= 300 < 600) {
        alert('Середній рівень доходів')
    }
    else {
        alert('Високий рівень доходів')
    }
}

function chooseOptExpenses() {
    let optExp;
    for (let i = 1; i < 4; i++) {
        while(1) {
            optExp = prompt("Стаття необов'язкових витрат?")
            if (optExp == '' || optExp == null) {
                alert("Введи статтю необов'язкових витрат")
                continue
            }
            break
        }
        appData.optionalExpenses[i] = optExp
    }
    console.log(appData.optionalExpenses)
}
*/
/*
let p1;
let p2;
for (let i = 0; i < 2; i++) {
    while(1) {
        p1 = prompt("Введіть обов'язкову статтю витрат в цьому місяці?", '');
        if (p1 == '' || p1 == null) {
            alert('Введи назву!')
            continue;
        }
        p2 = prompt("У скільки обійдеться?", '');
        if (p2 == '' || p2 == null) {
            alert('Введи значення!')
            continue;
        }
        break;
    }
    appData.expenses[p1] = p2
    console.log(appData.expenses)
}
*/
/*
let i = 0
while (i < 2) {
    while(1) {
        p1 = prompt("Введіть обов'язкову статтю витрат в цьому місяці?", '');
        if (p1 == '' || p1 == null) {
            alert('Введи назву!')
            continue;
        }
        p2 = prompt("У скільки обійдеться?", '');
        if (p2 == '' || p2 == null) {
            alert('Введи значення!')
            continue;
        }
        break;
    }
    appData.expenses[p1] = p2
    console.log(appData.expenses)
    i++;
}
*/
/*
let i = 0
do {
    while(1) {
        p1 = prompt("Введіть обов'язкову статтю витрат в цьому місяці?", '');
        if (p1 == '' || p1 == null) {
            alert('Введи назву!')
            continue;
        }
        p2 = prompt("У скільки обійдеться?", '');
        if (p2 == '' || p2 == null) {
            alert('Введи значення!')
            continue;
        }
        break;
    }
    appData.expenses[p1] = p2
    console.log(appData.expenses)
    i++;
} while (i < 2);
*/
appData.detectDayBudget()
appData.detectLevel()
appData.checkSavings()
appData.chooseOptExpenses()
appData.chooseIncome()
appData.showData()

function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Casino() {
    rxNumber = GetRandomInt(101)
    let x = 0
    let status = ''

    if (rxNumber >= 0 && rx <= 10) {
        data = {
            x: 2,
            status: '+'
        }
    }
    if (rx >= 11 && rx <= 25) {
        data = {
            x: 1.3,
            status: '+'
        }
    }
    if (rx >= 26 && rx <= 50) {
        data = {
            x: 1.7,
            status: '+'
        }
    }
    if (rx >= 51 && rx <= 75) {
        data = {
            x: 0.7,
            status: '-'
        }
    }
    if (rx >= 76 && rx <= 90) {
        data = {
            x: 0.3,
            status: '-'
        }
    }
    if (rx >= 91 && rx <= 100) {
        data = {
            x: 0,
            status: '-'
        }
    }

    return data
}

function CasinoLoose() {
    rxNumber = GetRandomInt(101)
    
    if (rxNumber >= 0 && rxNumber <= 75) {
        data = {
            x: 0.7,
            status: '-'
        }
    }

    if (rxNumber >= 76 && rxNumber <= 95) {
        data = {
            x: 0.3,
            status: '-'
        }
    }

    if (rxNumber >= 96 && rxNumber <= 100) {
        data = {
            x: 0,
            status: '-'
        }
    }

    return data
}

function CasinoWin() {
    rxNumber = GetRandomInt(101)
    
    if (rxNumber >= 0 && rxNumber <= 75) {
        data = {
            x: 1.3,
            status: '+'
        }
    }

    if (rxNumber >= 76 && rxNumber <= 95) {
        data = {
            x: 1.7,
            status: '+'
        }
    }

    if (rxNumber >= 96 && rxNumber <= 100) {
        data = {
            x: 2,
            status: '+'
        }
    }

    return data
}

var urlParams = new URLSearchParams(window.location.search);
let tg = window.Telegram.WebApp;
let userid = urlParams.get('userid')
let balance = parseInt(urlParams.get('balance'))
let StartBalance = balance
let result = document.getElementById('result')
let finish = document.getElementById('finish')
tg.expand()
let NewBalance = 0
let SummStavok = 1
document.getElementById('balance').innerText = 'Баланс\n' + balance.toLocaleString() + 'р'

play = document.getElementById('play')

play.addEventListener('click', () => {
    let summ = document.getElementById('summ').value;
    if (summ > balance) {
        result.innerHTML = 'Не хватает средств'
        result.style.color = 'red'
        result.style.fontSize = '15px'
        result.style.marginTop = '5px'
        return
    }

    if (summ > 0) {
        rx = GetRandomInt(101)
        let StatusSumm = ''
        let x = 0
        if (SummStavok == 1) {
            CasinoResult = CasinoLoose()
        } else if (SummStavok == 2) {
            CasinoResult = CasinoLoose()
        } else if (balance > (StartBalance + (StartBalance * 0.1))) {
            rxNumber = GetRandomInt(101)
            if (rxNumber >= 0 && rxNumber <= 75) {
                CasinoResult = CasinoLoose()
            } else {
                CasinoResult = CasinoWin()
            }
        } else if (balance >= 100000) {
            rxNumber = GetRandomInt(101)
            if (rxNumber >= 0 && rxNumber <= 75) {
                CasinoResult = CasinoLoose()
            } else {
                CasinoResult = CasinoWin()
            }
        } else if (balance < (StartBalance / 2)) {
            rxNumber = GetRandomInt(101)
            if (rxNumber >= 0 && rxNumber <= 75) {
                CasinoResult = CasinoWin()
            } else {
                CasinoResult = CasinoLoose()
            }
        } else {
            CasinoResult = Casino()
        }

        StatusSumm = CasinoResult['status']
        x = CasinoResult['x']

        let StavkaWinish = summ * x
        if (x == 0) {
            StavkaWinish = summ
        }
        if (StatusSumm == '-') {
            result.style.color = 'red'
            NewBalance = balance - StavkaWinish
        } else {
            result.style.color = 'green'
            StavkaWinish = StavkaWinish - summ
            NewBalance = balance + StavkaWinish
        }

        text = StatusSumm + parseInt(StavkaWinish).toLocaleString() + 'р\n(' + x + 'x)'
        result.innerHTML = text
        result.style.fontSize = '20px'
        result.style.marginTop = '15px'
        balance = NewBalance
        SummStavok = SummStavok + 1
        document.getElementById('balance').innerText = 'Баланс\n' + balance.toLocaleString() + 'р'
    

    } else {
        document.getElementById('summ').placeholder = 'Сумму ведите!'
    }
  })

  finish.addEventListener('click', () => {
    let data = {
        status: 'newbalance',
        balance: balance,
        user_id: userid,
        startbalance: StartBalance
      }
      tg.sendData(JSON.stringify(data))
  })

function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var urlParams = new URLSearchParams(window.location.search);
let tg = window.Telegram.WebApp;
let userid = urlParams.get('userid')
let balance = urlParams.get('balance')
let result = document.getElementById('result')
let finish = document.getElementById('finish')
tg.expand()
let NewBalance = 0

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
        if (rx >= 0 && rx <= 10) {
            x = 0
            StatusSumm = '-'
        }
        if (rx >= 11 && rx <= 25) {
            x = 0.3
            StatusSumm = '-'
        }
        if (rx >= 26 && rx <= 50) {
            x = 0.7
            StatusSumm = '-'
        }
        if (rx >= 51 && rx <= 75) {
            x = 1.7
            StatusSumm = '+'
        }
        if (rx >= 76 && rx <= 90) {
            x = 1.3
            StatusSumm = '+'
        }
        if (rx >= 91 && rx <= 100) {
            x = 2
            StatusSumm = '+'
        }
        let StavkaWinish = summ * x
        if (x == 0) {
            StavkaWinish = summ
        }

        if (StatusSumm == '-') {
            result.style.color = 'red'
            NewBalance = balance - StavkaWinish
        } else {
            result.style.color = 'green'
            NewBalance = balance + StavkaWinish
        }

        text = StatusSumm + parseInt(StavkaWinish).toLocaleString() + 'р\n(' + x + 'x)'
        result.innerHTML = text
        result.style.fontSize = '20px'
        result.style.marginTop = '15px'
        balance = NewBalance
        document.getElementById('balance').innerText = 'Баланс\n' + balance.toLocaleString() + 'р'
    

    } else {
        document.getElementById('summ').placeholder = 'Сумму ведите!'
    }
  })

  finish.addEventListener('click', () => {
    let data = {
        status: 'newbalance',
        balance: balance
      }
      tg.sendData(JSON.stringify(data))
  })

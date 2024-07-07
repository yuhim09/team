let expression_field = document.querySelector('.input-field')
let history_field = document.querySelector('.history')
let cookies = document.cookie.split('; ')
let isCookieSaved = false
let history = ''
for (let i = 0; i < cookies.length; i += 1) {
    let cookie_name_value = cookies[i].split('=')    
    if (cookie_name_value[0] == 'calc_hist') {
        isCookieSaved = true
        history = cookie_name_value[1]
        break
    }
}
if (isCookieSaved) {
    let history_list = history.split('/')
    for (let i = 0; i < history_list.length; i += 1) {
        history_field.innerHTML += `<p>${history_list[i]}</p>`
    }
}

let buttons = document.querySelectorAll('.btn');

let specialButtons = ['btn-plus', 'btn-minus', 'btn-mult', 'btn-div', 'btn-point', 'btn-clear', 'btn-equal'];
for (let i = 0; i < buttons.length; i++) {
    if (specialButtons.includes(buttons[i].classList[1])) {
        buttons[i].style.backgroundColor = '#353333'; // змінити колір
        buttons[i].style.color = 'dark';
    } else {
        buttons[i].style.backgroundColor = '#4D4A4A'; // змінити колір
    }
}

expression_field.style.backgroundColor = 'dark';

for (let i = 0; i < 10; i += 1) {
    document.querySelector(`.btn-${i}`).addEventListener('click', function() {
        expression_field.value += `${i}`
    })
}

document.querySelector('.btn-equal').addEventListener('click', function() {
    expression = expression_field.value
    history += expression + '/'
    document.cookie = `calc_hist=${history};max-age=5000`
    history_field.innerHTML += `<p>${expression}</p>`
    if (expression.includes('+')) {
        let numbers = expression.split('+')
        let result = +numbers[0] + +numbers[1]
        expression_field.value = result
    } else if (expression.includes('-')) {
        let numbers = expression.split('-')
        let result = +numbers[0] - +numbers[1]
        expression_field.value = result
    } else if (expression.includes('*')) {
        let numbers = expression.split('*')
        let result = +numbers[0] * +numbers[1]
        expression_field.value = result
    } else if (expression.includes('/')) {
        let numbers = expression.split('/')
        let result = +numbers[0] / +numbers[1]
        expression_field.value = result
    } else if (expression.includes('^')) {
        let numbers = expression.split('^')
        let result = Math.pow(+numbers[0], +numbers[1])
        expression_field.value = result
    }
})

document.querySelector('.btn-clear').addEventListener('click', function() {
    expression_field.value = '';
    history_field.innerHTML = '';
    history = '';
    document.cookie = `calc_hist=;max-age=-1`;
});

document.querySelector('.btn-point').addEventListener('click', function() {
    expression_field.value += '.';
});

document.querySelector('.btn-div').addEventListener('click', function() {
    expression_field.value += '/';
});

document.querySelector('.btn-minus').addEventListener('click', function() {
    expression_field.value += '-';
});

document.querySelector('.btn-plus').addEventListener('click', function() {
    expression_field.value += '+';
});

// Додати обробник подій для кнопки btn-mult
document.querySelector('.btn-mult').addEventListener('click', function() {
    expression_field.value += '*';
});

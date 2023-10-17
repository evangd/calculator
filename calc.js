// Math functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        alert("You divided by 0 ... \
        and 0 don't like to get divided by nobody except Mrs. 0.")
    }

    return x / y;
}

// operate function

function operate(x, y, op) {
    return op(x, y);
}

// calculator event handling

const keys = document.querySelectorAll('.numkey, .opkey');
const screen = document.querySelector('#display');

const display = [];

keys.forEach(key => {
    key.addEventListener('click', e => {
        if (e.target.id === 'ac') {
            screen.value = "";
            display.splice(0, display.length);
        } else if (e.target.id === 'del') {
            display.pop();
            screen.value = '';
            for (let i = 0; i < display.length; ++i) {
                screen.value += display[i] + ' ';
            }

            if (!isOpKey(display[display.length - 1])) {
                screen.value = screen.value.slice(0, -1);
            }
        } else {
            fillDisplay(e.target);
        }

        console.table(display);
    });
    
    // Add keyboard events
});

// put numbers on calculator and prep for operations

function fillDisplay(key) {
    if (isOpKey(key.id)) {
        if (display.length === 3) { //check if opkey is 2nd or more in chain
            calculate(key.id);
        } else {
            display.push(key.id);
        }

        if (key.id !== 'eq') {
            screen.value += ' ' + key.textContent + ' ';
        }
    } else {
        if (display.length === 0 || display.length === 2) {
            display.push(key.textContent);
        } else {
            display[display.length - 1] += key.textContent;
        }
        
        screen.value += key.textContent;
    }
}

// process display values

function calculate(key) {

    let opFunction;

    switch (display[1]) {
        case '+':
            opFunction = add;
            break;
        case '-':
            opFunction = subtract;
            break;
        case '*':
            opFunction = multiply;
            break;
        case '/':
            opFunction = divide;
            break;
    }
    
    const ans = operate(Number(display[0]), Number(display[2]), opFunction);

    display.splice(0, display.length);

    display.push(ans);
    if (key !== 'eq') {
        display.push(key);
    }

    screen.value = display[0];
}

// function to determine if opkey needs to act as equals

function isOpKey(key) {
    if (key === 'eq' || key === '+' 
    || key === '-' || key === '*' || key === '/') {
        return true;
    } else {
        return false;
    }
}
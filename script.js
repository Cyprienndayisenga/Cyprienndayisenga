const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        
        if (button.classList.contains('number')) {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (value === '.') {
            handleDecimal();
        } else if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        }
    });
});

function handleNumber(num) {
    currentInput += num;
    updateScreen(currentInput);
}

function handleOperator(op) {
    if (firstOperand === '') {
        firstOperand = currentInput;
        operator = op;
        currentInput = '';
    } else {
        secondOperand = currentInput;
        calculate();
        operator = op;
    }
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateScreen(currentInput);
    }
}

function updateScreen(value) {
    calculatorScreen.value = value;
}

function clear() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    updateScreen('0');
}

function calculate() {
    if (firstOperand !== '' && currentInput !== '') {
        secondOperand = currentInput;
        let result;
        
        switch(operator) {
            case '+':
                result = parseFloat(firstOperand) + parseFloat(secondOperand);
                break;
            case '-':
                result = parseFloat(firstOperand) - parseFloat(secondOperand);
                break;
            case '*':
                result = parseFloat(firstOperand) * parseFloat(secondOperand);
                break;
            case '/':
                result = parseFloat(firstOperand) / parseFloat(secondOperand);
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        updateScreen(currentInput);
        firstOperand = '';
        secondOperand = '';
        operator = '';
    }
}

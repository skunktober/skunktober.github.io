var operation = ''; // to hold operation ( +, -, *, / )
var num1 = ''; // to hold first number
var num2 = ''; // to hold second number

function clickNumber(number) {
    if (operation === '') {
        num1 += number;
        document.getElementById('output').value = num1;
    } else {
        num2 += number;
        document.getElementById('output').value = num2;
    }
}

function clickOperation(oper) {
    operation = oper;
}

function calculate() {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    var result;
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }
    document.getElementById('output').value = result;
    num1 = '' + result; // Reset num1 as result for continued calculations
    num2 = '';
}


function clearCalculator() {
    operation = '';
    num1 = '';
    num2 = '';
    document.getElementById('output').value = '';
}

// invoke the clearCalculator function when the clear button is clicked
document.getElementById('clearButton').addEventListener('click', clearCalculator);
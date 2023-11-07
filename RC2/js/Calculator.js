var operation = ''; 
var num1 = ''; 
var num2 = '';
var equalsPressed = false; 

function clickNumber(number) {
    if(equalsPressed){
         operation = ''; 
         num1 = ''; 
         num2 = '';
         equalsPressed = false;
    }
    if (operation === '') {
        num1 += number;
        document.getElementById('output').value = num1;
    } else {
        num2 += number;
        document.getElementById('output').value = num2;
    }
}

function clickOperation(oper) {
    equalsPressed = false;
    operation = oper;
}

function calculate() {
    if (equalsPressed) {
         return;
    }
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
    if (!isFinite(result)) {
        document.getElementById('output').value = '0';
        num1 = '0';
    } else {
        document.getElementById('output').value = result;
        num1 = '' + result; 
    }
    num2 = '';
    equalsPressed = true;
}

function clearCalculator() {
    equalsPressed = false;
    operation = '';
    num1 = '';
    num2 = '';
    document.getElementById('output').value = '';
}

document.getElementById('clearButton').addEventListener('click', clearCalculator);
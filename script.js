function operate(op, a, b) {
    switch (op) {
        case "+":
            return parseFloat((a + b).toFixed(6));;
        case "-":
            return parseFloat((a - b).toFixed(6));;
        case "*":
            return parseFloat((a * b).toFixed(6));
        case "/":
            if (b == 0) return null;
            return parseFloat((a / b).toFixed(6));;
        case "=":
            return operate(operator, a, b);
    }
}

function printNumberToDisplay(strNum) {
    if (isDisplayTextReplaceable) {
        display.textContent = "";
        displayValue = 0;
        isDisplayTextReplaceable = false;
        decimalPointOnScreen = false;
    }
    display.textContent += strNum;
    displayValue = Number(display.textContent);
}

function dealWithOperator(eventTarget) {
    if (operator) {    
        if (isDisplayTextReplaceable) {
            if (eventTarget.dataset.key != "=") {
                operator = eventTarget.dataset.key;
                smallDisplay.textContent = display.textContent + " " + eventTarget.textContent;
            }
            return;
        }

        firstOperand = operate(operator, firstOperand, displayValue);
        
        if (firstOperand == null) {
            operator = "";
            displayValue = 0;
            isDisplayTextReplaceable = true;
            smallDisplay.textContent = "";
            display.textContent = "You can't divide by zero";
            return;
        }

        if (eventTarget.dataset.key == "=") {
            smallDisplay.textContent += " " + String(displayValue) + " =";
            operator = "";
            isDisplayTextReplaceable = true;
            displayValue = firstOperand;
            display.textContent = String(displayValue);
            return;
        }

        displayValue = firstOperand;
        display.textContent = String(displayValue);
        operator = eventTarget.dataset.key;
        smallDisplay.textContent = String(displayValue) + " " + eventTarget.textContent;
        isDisplayTextReplaceable = true;

    } else if (eventTarget.dataset.key != "=") {
        operator = eventTarget.dataset.key;
        smallDisplay.textContent = String(displayValue) + " " + eventTarget.textContent;
        firstOperand = displayValue;
        isDisplayTextReplaceable = true;
    }   
}

function addDecimalPoint() {
    if (!decimalPointOnScreen) {
        display.textContent += ".";
        displayValue = Number(display.textContent);
        decimalPointOnScreen = true;
    }
}

function clearDisplay() {
    displayValue = 0;
    display.textContent = "0";
    smallDisplay.textContent = "";
    isDisplayTextReplaceable = true;
    decimalPointOnScreen = false;
    operator = "";
}

function deleteSymbolFromDisplay() {
    let text = display.textContent;
    if (text) {
        display.textContent = text.slice(0, -1);
        displayValue = Number(display.textContent);
    }
}

let displayValue = 0;
let firstOperand = null;
let operator = "";
let isDisplayTextReplaceable = true;
let decimalPointOnScreen = false;
const display = document.getElementById("display");
const smallDisplay = document.getElementById("small-display");
display.textContent = "0";

const numbers = Array.from(document.getElementsByClassName("number"));
numbers.forEach(key => {
    key.addEventListener("click", (e) => printNumberToDisplay(e.target.textContent));
});

const operators = Array.from(document.getElementsByClassName("operator"));
operators.forEach(item => {
    item.addEventListener("click", (e) => dealWithOperator(e.target));
});

const decimalPoint = document.querySelector(".decimal");
decimalPoint.addEventListener("click", addDecimalPoint);

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteSymbolFromDisplay);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearDisplay);



//Keyboard handling
let numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operatorKeys = ["+", "-", "/", "*", "="]

window.addEventListener("keydown", (e) => {
    if (numberKeys.includes(e.key)) {
        printNumberToDisplay(e.key);
        return;
    }

    if (operatorKeys.includes(e.key)) {
        dealWithOperator(document.querySelector(`button[data-key="${e.key}"]`));
        e.preventDefault();
        return;
    }

    if (e.key == ".") {
        addDecimalPoint();
        return;
    }

    if (e.key == "Delete") {
        clearDisplay();
        return;
    }

    if (e.key == "Backspace") {
        deleteSymbolFromDisplay();
        return;
    }

    if (e.key == "Enter") {
        dealWithOperator(document.querySelector(`button[data-key="="]`));
        e.preventDefault();
        return;
    }
});


//Theme animation
document.getElementById("toggle").checked = false;

const toggle = document.getElementById("toggle-label");
toggle.addEventListener("click", function() {
    if (document.documentElement.dataset.theme == "light") {
        document.documentElement.setAttribute("data-theme" , "dark");
    } else {
        document.documentElement.setAttribute("data-theme" , "light");
    }
});


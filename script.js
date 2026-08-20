// ===============================
// BASIC MATH FUNCTIONS
// ===============================

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;
}


// ===============================
// OPERATE FUNCTION
// ===============================

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    } else {
        return null;
    }
}


// ===============================
// TESTING BASIC FUNCTIONS
// ===============================

const num1 = 10;
const num2 = 5;

console.log("Addition:", add(num1, num2));
console.log("Subtraction:", subtract(num1, num2));
console.log("Multiplication:", multiply(num1, num2));
console.log("Division:", divide(num1, num2));
console.log("Operate:", operate("*", num1, num2));


// ===============================
// CALCULATOR VARIABLES
// ===============================

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

let resetScreen = false;


// ===============================
// GET YOUR EXISTING ELEMENTS
// ===============================

const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".btn");


// ===============================
// UPDATE SCREEN
// ===============================

function updateScreen(value) {
    screen.textContent = value;
}


// ===============================
// ROUND LONG DECIMALS
// ===============================

function roundResult(number) {
    return Math.round((number + Number.EPSILON) * 100000000) / 100000000;
}


// ===============================
// ENTER A NUMBER
// ===============================

function inputNumber(number) {

    // If the calculator just displayed a result,
    // pressing a number starts a new calculation.
    if (resetScreen) {
        updateScreen("0");
        resetScreen = false;
    }

    // Prevent more than one decimal point.
    if (number === "." && screen.textContent.includes(".")) {
        return;
    }

    // If screen currently says 0, replace it.
    if (screen.textContent === "0" && number !== ".") {
        updateScreen(number);
    } else {
        updateScreen(screen.textContent + number);
    }
}


// ===============================
// CHOOSE OPERATOR
// ===============================

function chooseOperator(operator) {

    // If the previous operation resulted in an error,
    // don't continue.
    if (screen.textContent === "Nope! Can't divide by 0") {
        return;
    }

    const currentNumber = parseFloat(screen.textContent);

    // If an operator was already selected and the user
    // presses another operator, simply replace it.
    //
    // Example:
    // 2 + + - *
    //
    // The calculator will only remember *.
    if (currentOperator !== null && resetScreen) {
        currentOperator = operator;
        return;
    }

    // If we already have a first number and operator,
    // calculate before moving on to the next operator.
    //
    // Example:
    // 12 + 7 -
    //
    // First calculate 12 + 7 = 19
    // Then use 19 as the first number for -.
    if (currentOperator !== null && firstNumber !== null) {

        secondNumber = currentNumber;

        const result = calculate();

        if (result === null) {
            return;
        }

        firstNumber = result;
        updateScreen(result);

    } else {
        firstNumber = currentNumber;
    }

    currentOperator = operator;
    resetScreen = true;
}


// ===============================
// CALCULATE
// ===============================

function calculate() {

    // Don't calculate unless we have:
    // first number
    // operator
    // second number
    if (
        firstNumber === null ||
        secondNumber === null ||
        currentOperator === null
    ) {
        return null;
    }

    try {

        const result = operate(
            currentOperator,
            firstNumber,
            secondNumber
        );

        return roundResult(result);

    } catch (error) {

        updateScreen("Nope! Can't divide by 0");

        firstNumber = null;
        secondNumber = null;
        currentOperator = null;
        resetScreen = true;

        return null;
    }
}


// ===============================
// EQUALS
// ===============================

function pressEquals() {

    // Don't calculate if the user hasn't
    // entered a complete operation.
    if (
        firstNumber === null ||
        currentOperator === null ||
        resetScreen
    ) {
        return;
    }

    secondNumber = parseFloat(screen.textContent);

    const result = calculate();

    if (result === null) {
        return;
    }

    updateScreen(result);

    // Keep the result as the first number.
    //
    // This allows:
    // 10 + 5 = 15
    // then + 2 =
    // 17
    firstNumber = result;

    secondNumber = null;
    currentOperator = null;

    resetScreen = true;
}


// ===============================
// CLEAR
// ===============================

function clearCalculator() {

    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    resetScreen = false;

    updateScreen("0");
}


// ===============================
// DELETE / BACKSPACE
// ===============================

function deleteNumber() {

    // Don't delete a result.
    if (resetScreen) {
        return;
    }

    // If there's only one character,
    // go back to 0.
    if (screen.textContent.length === 1) {
        updateScreen("0");
        return;
    }

    updateScreen(
        screen.textContent.slice(0, -1)
    );

    // Prevent the screen from becoming empty.
    if (screen.textContent === "") {
        updateScreen("0");
    }
}


// ===============================
// HANDLE BUTTON CLICKS
// ===============================

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent.trim();


        // ===========================
        // NUMBERS
        // ===========================

        if (
            value === "0" ||
            value === "1" ||
            value === "2" ||
            value === "3" ||
            value === "4" ||
            value === "5" ||
            value === "6" ||
            value === "7" ||
            value === "8" ||
            value === "9"
        ) {
            inputNumber(value);
        }


        // ===========================
        // DECIMAL
        // ===========================

        else if (value === ".") {
            inputNumber(".");
        }


        // ===========================
        // ADDITION
        // ===========================

        else if (value === "+") {
            chooseOperator("+");
        }


        // ===========================
        // SUBTRACTION
        // ===========================

        else if (value === "—") {
            chooseOperator("-");
        }


        // ===========================
        // MULTIPLICATION
        // ===========================

        else if (value === "×") {
            chooseOperator("*");
        }


        // ===========================
        // DIVISION
        // ===========================

        else if (value === "÷") {
            chooseOperator("/");
        }


        // ===========================
        // EQUALS
        // ===========================

        else if (value === "=") {
            pressEquals();
        }


        // ===========================
        // CLEAR
        // ===========================

        else if (value === "Clear") {
            clearCalculator();
        }


        // ===========================
        // DELETE
        // ===========================

        else if (value === "⌫") {
            deleteNumber();
        }


        // ===========================
        // PERCENTAGE
        // ===========================

        else if (value === "%") {

            const currentNumber = parseFloat(screen.textContent);

            updateScreen(
                roundResult(currentNumber / 100)
            );
        }


        // ===========================
        // () BUTTON
        // ===========================

        else if (value === "()") {
            // Not needed for this basic calculator.
            // We leave it here so the button doesn't
            // cause any problems.
        }

    });

});


// ===============================
// KEYBOARD SUPPORT
// ===============================

document.addEventListener("keydown", function(event) {

    const key = event.key;


    // Numbers
    if (key >= "0" && key <= "9") {
        inputNumber(key);
    }


    // Decimal
    else if (key === ".") {
        inputNumber(".");
    }


    // Operators
    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("*");
    }

    else if (key === "/") {
        chooseOperator("/");
    }


    // Equals / Enter
    else if (key === "=" || key === "Enter") {
        pressEquals();
    }


    // Backspace
    else if (key === "Backspace") {
        deleteNumber();
    }


    // Escape = Clear
    else if (key === "Escape") {
        clearCalculator();
    }

});
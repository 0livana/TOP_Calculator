function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
};

const num1 = 10;
const num2 = 5;
const num3 = 0;

//testing the basic functions
console.log("Addition:", add(num1, num2));  
console.log("Subtraction:", subtract(num1, num2)); 
console.log("Multiplication:", multiply(num1, num2)); 
console.log("Division:", divide(num1, num2));

//next functions:
function operate(operator, a, b ){
    if(operator === "+"){
        return `${a} + ${b} = ${add(a, b)}`;
    } else if(operator === "-"){
        return `${a} - ${b} = ${subtract(a, b)}`
    } else if(operator === "*"){
        return `${a} * ${b} = ${multiply(a, b)}`
    } else if(operator === "/"){
        return `${a} / ${b} = ${divide(a, b)}`
    } else {
        return `Wrong operator. Use any of +, -, *, /`
    }
}

console.log(operate("*", num1, num2))

//No. 4:

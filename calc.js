let displayNum = document.querySelector(".number-display");
let displayWindow = document.querySelector(".display-window");

let firstOperand = null;
let secondOperand = null;
let currentOperation = null;

let poweredOn = false;
displayWindow.style.backgroundColor = "rgba(96, 141, 65, 0.47)";

let isNewNumber = false;
let awaitingNextOperand = false;

let result = 0;

document.querySelector(".buttons-and-operators").addEventListener("click", (event) => {
    const button = event.target;
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (!poweredOn && action !== "power-off") return;

    switch (action) {
        case "num":
            if (!isNewNumber || displayNum.textContent === "0" || displayNum.textContent === "Error") {
                displayNum.textContent = value;
                isNewNumber = true;
                awaitingNextOperand = false; // Reset after pressing a number
            } else {
                displayNum.textContent += value;
            }
            break;

        case "operation":
            if (currentOperation && isNewNumber) {
                secondOperand = parseFloat(displayNum.textContent);

                switch (currentOperation) {
                    case "add":
                        result = firstOperand + secondOperand;
                        break;
                    case "subtract":
                        result = firstOperand - secondOperand;
                        break;
                    case "multiply":
                        result = firstOperand * secondOperand;
                        break;
                    case "divide":
                        result = secondOperand !== 0 ? firstOperand / secondOperand : "Error";
                        break;
                }

                displayNum.textContent = result;
                firstOperand = result;
                secondOperand = null;
                currentOperation = value;
                isNewNumber = false;
                awaitingNextOperand = true; // Await a new number before continuing
            } else if (!awaitingNextOperand) {
                firstOperand = parseFloat(displayNum.textContent);
                currentOperation = value;
                isNewNumber = false;
                awaitingNextOperand = true; // Await a new number before accepting another operator
            }
            break;

        case "equal":
            if (currentOperation && isNewNumber) {
                secondOperand = parseFloat(displayNum.textContent);

                switch (currentOperation) {
                    case "add":
                        result = firstOperand + secondOperand;
                        break;
                    case "subtract":
                        result = firstOperand - secondOperand;
                        break;
                    case "multiply":
                        result = firstOperand * secondOperand;
                        break;
                    case "divide":
                        result = secondOperand !== 0 ? firstOperand / secondOperand : "Error";
                        break;
                }

                displayNum.textContent = result;
                firstOperand = result;
                secondOperand = null;
                currentOperation = null;
                awaitingNextOperand = true; // Await a new number before another operation
            }
            break;

        case "clear":
            displayNum.textContent = "0";
            firstOperand = null;
            secondOperand = null;
            currentOperation = null;
            isNewNumber = false;
            awaitingNextOperand = false;
            break;

        case "power-off":
            poweredOn = !poweredOn;
            if (!poweredOn) {
                displayNum.textContent = "";
                displayWindow.style.backgroundColor = "rgba(96, 141, 65, 0.47)";
            } else {
                displayNum.textContent = "0";
                displayWindow.style.backgroundColor = "rgba(167, 242, 112, 0.474)";
            }
            break;

        case "pi":
            displayNum.textContent = Math.PI.toFixed(6);
            break;

        case "dot":
            if (!displayNum.textContent.includes(".")) {
                displayNum.textContent += ".";
            }
            break;

        case "delete":
            displayNum.textContent = displayNum.textContent.slice(0, -1) || "0";
            break;

        case "pred":
            firstOperand = parseFloat(displayNum.textContent);
            if (value === "sqrt") {
                displayNum.textContent = firstOperand >= 0 ? Math.sqrt(firstOperand).toFixed(6) : "Error";
            }
            break;
    }
});

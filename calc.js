let displayNum = document.querySelector(".number-display"); // To change the number on the display
let displayWindow = document.querySelector(".display-window"); // We use displaywindow for powerOff basically

let firstOperand = null;        
let secondOperand = null; 
let currentOperation = null;

let poweredOn = false;   // I use this to check if the calculator has any power
displayWindow.style.backgroundColor = "rgba(96, 141, 65, 0.47)"; // Since we begin with the calculator turned off

let isnewNumber = false; // This declares if we're making a new number after an operation.

let result = 0;

document.querySelector(".buttons-and-operators")
.addEventListener("click", event => {

    const button = event.target;

    console.log(button);

    const action = button.dataset.action;
    const value = button.dataset.value;

    // This checks if the calculator is powered on, if not we shouldn't be able to make any 
    if (!poweredOn && action !== "power-off") return;

    switch (action) {

        case "num":

            if (displayNum.textContent === "0" || displayNum.textContent === "Error" || !isnewNumber) {
                displayNum.textContent = value;
                isnewNumber = true; // The number we're using is the 'new' number, different than the last one.
            } else {
                displayNum.textContent += value;
            }
            break;

            case "operation":
                // For making the operation and displaying it we should have pressed a new number and operation too! 
                if (currentOperation && isnewNumber) { // we pressed an operator and number beforehand

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
                            if (secondOperand !== 0){
                                result = firstOperand / secondOperand;
                            }
                            else{
                                result = "Error";
                            }
                            break;
                    }
            
                    displayNum.textContent = result;
                    firstOperand = result; // the result is now the 
                    secondOperand = null;
                    currentOperation = value;
                    isnewNumber = false; // we set this to false so we need to press another number is get a new second operator to use with the result.

                } else { // If no operation is pending, store the current number as the first operand
                    firstOperand = parseFloat(displayNum.textContent); // we have a first operand
                    currentOperation = value; // store the operation
                }
            
                break;

        case "pi": // pi in 5 decimals, WORKS OK!

            if (displayNum.textContent !== Math.PI.toFixed(6) || currentOperation) { 
                displayNum.textContent = Math.PI.toFixed(6);
            }
            break;    

        case "dot": // WORKS OK!
            if (!displayNum.textContent.includes('.')) {
                displayNum.textContent += '.';
            }
            break;

        case "pred": // SQRT() WORKS OK!
            firstOperand = parseFloat(displayNum.textContent);
        
            if (value === "sqrt") {
                
                if (firstOperand < 0) {
                    displayNum.textContent = "Error"; // Square root of a negative number is invalid
                } else {
                    displayNum.textContent = parseFloat(Math.sqrt(firstOperand).toFixed(6));
                    firstOperand = Math.sqrt(firstOperand);
                }
            }
            break;

        case "delete": // WORKS OK!
            displayNum.textContent = displayNum.textContent.slice(0, -1);
            if(displayNum.textContent == ""){
                displayNum.textContent = 0;
            }
            console.log(displayNum);
            break;
        
        case "equal": // CHECK IF IT WORKS WITH CHAIN OPERATIONS!

            secondOperand = parseFloat(displayNum.textContent);

            // currentOperation must be something before and firstOperand must be something too.
            if (currentOperation && firstOperand !== null) {

                let result;
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
                        result = secondOperand !== 0
                            ? firstOperand / secondOperand
                            : "Error"; // Handle division by zero
                        break;
                }

                // I'm limiting the result to 6 decimal numbers for all operations
                displayNum.textContent = result;
                firstOperand = result; 
                secondOperand = null;
                currentOperation = null;

            }
            break;

        case "clear": // WORKS OK!
            // Reset all values and operations to start anew
            displayNum.textContent = "0";
            firstOperand = null;
            secondOperand = null;
            currentOperation = null;
            break;

        case "power-off": // WORKS OK!

            poweredOn = !poweredOn;
            if (!poweredOn) {
                displayNum.textContent = "";
                displayWindow.style.backgroundColor = "rgba(96, 141, 65, 0.47)";

            } else {
                displayNum.textContent = "0"; 
                displayWindow.style.backgroundColor = "rgba(167, 242, 112, 0.474)";
            }
            break;

    }
});

let displayNum = document.querySelector(".number-display");

// The default value of the display should be 0
displayNum.textContent = "0";

let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let poweredOn = true;



document.querySelector(".buttons-and-operators")
.addEventListener("click", event => {

    const button = event.target;
    const action = button.dataset.action;
    const value = button.dataset.value;

    // This checks if the calculator is powered on, if not we shouldn't be able to make any 
    if (!poweredOn && action !== "power-off") return;


    switch (action) {
        case "num":
            // This is made to prevent the 0 as the highest decimal, unless there is a dot
            if (displayNum.textContent === "0" || displayNum.textContent === "Error") {
                displayNum.textContent = value;
            } else {
                displayNum.textContent += value;
            }
            break;

        case "dot":
            // Add a decimal point if not already present
            if (!displayNum.textContent.includes('.')) {
                displayNum.textContent += '.';
            }
            break;

        case "operation":
            // Here we save the number on the display and get the operation
            firstOperand = parseFloat(displayNum.textContent);
            currentOperation = value; // the operation name, e.g add,subtract,etc.
            displayNum.textContent = "0"; // Reset display for the second operand
            break;

        case "equal":
            // once we click on = we save the second operand and make the operation.
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
                            : "Error"; // Handle divide by zero
                        break;
                    
                    case "pi":
                        result = "3.14159";
                        break;

                }
                // I'm limiting the result to 6 decimal numbers 
                displayNum.textContent = parseFloat(result.toFixed(6));
                firstOperand = result; 
                secondOperand = null;
                currentOperation = null;
            }
            break;

        case "clear":
            // Reset all values and operations to start anew
            displayNum.textContent = "0";
            firstOperand = null;
            secondOperand = null;
            currentOperation = null;
            break;




        case "power-off":

            poweredOn = !poweredOn;
            if (!poweredOn) {
                displayNum.textContent = "";
            } else {
                displayNum.textContent = "0"; 
            }
            break;


    }
});

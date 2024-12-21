let displayNum = document.querySelector(".number-display"); // To change the number on the display
let displayWindow = document.querySelector(".display-window"); // We use displaywindow for powerOff basically

displayNum.textContent = "0"; // We use 0 as a default number when we use the calculator

let firstOperand = null;        
let secondOperand = null; 
let currentOperation = null;

let poweredOn = false;   // I use this to check if the calculator has any power
let newNumber = true;

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
            // This is made to prevent the 0 as the highest decimal, unless there is a dot
            if (displayNum.textContent === "0" || displayNum.textContent === "Error" || newNumber === false) {
                displayNum.textContent = value;
                newNumber = true;
            } else {
                displayNum.textContent += value;
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

        case "operation":
            const currentNumber = parseFloat(displayNum.textContent); // The current number on display or first opperand
            newNumber = true;   // Allow new number to replace the current.

            currentOperation = value; // Type of operation, e.g sum, substraction, mul, etc.
        
            


            if (firstOperand == null && currentOperation !== null && !newNumber){
                firstOperand = currentNumber;
                displayNum.textContent = result;
                
            }else{
                switch(value){

                    case "add":
                        if(newNumber = true){
                            result = firstOperand + currentNumber;
                        }
                        break;
                    case "subtract":
                        if(newNumber = true){
                            result = firstOperand - currentNumber;
                        }
                        break;
                    case "multiply":
                        if(newNumber = true){
                            result = firstOperand * currentNumber;
                        }
                        break;
                    case "divide":
                        if(newNumber = true){
                            result = secondOperand !== 0
                                ? firstOperand / currentNumber
                                : "Error";
                        }
                        break;
                }

                displayNum.textContent = parseFloat(result.toFixed(6));
                firstOperand = result;

                newNumber = false;
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
                            : "Error";
                        break;
                }

                // I'm limiting the result to 6 decimal numbers for all operations
                displayNum.textContent = parseFloat(result.toFixed(6));
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

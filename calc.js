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

    console.log(button);

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

        case "pi": // Number pi in 5 decimals
            displayNum.textContent = value;
            break;

        case "dot":
            if (!displayNum.textContent.includes('.')) {
                displayNum.textContent += '.';
            }
            break;

        case "pred": // for square root and other single-input operations
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
            const currentNumber = parseFloat(displayNum.textContent); // The current number on display
            currentOperation = value; // Type of operation, e.g sum, substraction, mul, etc.

            let result = currentNumber;

            if (firstOperand == null){
                firstOperand = currentNumber;
            }else{
                switch(value){

                    case "add":
                        result = firstOperand + currentNumber;
                        break;
                    case "subtract":
                        result = firstOperand - currentNumber;
                        break;
                    case "multiply":
                        result = firstOperand * currentNumber;
                        break;
                    case "divide":
                        result = secondOperand !== 0
                            ? firstOperand / currentNumber
                            : "Error";
                        break;
                }

                displayNum.textContent = parseFloat(result.toFixed(6));
                firstOperand = result;
            }

            break;

        case "delete": // delete last number
            displayNum.textContent = displayNum.textContent.slice(0, -1);
            if(displayNum.textContent == ""){
                displayNum.textContent = 0;
            }
            console.log(displayNum);
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

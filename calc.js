
let displayNum = document.querySelector(".number-display");

displayNum.textContent = "0";

let firstOperand = "null";
let secondOperand = "null"


document.querySelector(".buttons-and-operators")
    .addEventListener("click", event => {

        const button = event.target;
        const action = button.dataset.action;
        const value = button.dataset.value;

        switch (action){

            case "num":
                if(displayNum.textContent == "0"){
                    displayNum.textContent = value;
                }
                else{
                    displayNum.textContent += value;
                }
                break;

            case "dot":
                if(! displayNum.textContent.includes('.')){
                    displayNum.textContent += '.';
                }
                break;

            case "operation":
                switch (value){
                    case "add":

                        firstOperand = displayNum.textContent;
                        displayNum.textContent = 0;


                        if(action === "equal"){
                            firstOperand = firstOperand + Number(displayNum.textContent);
                            displayNum = firstOperand;
                        }

                        break;
                }
        }
    });

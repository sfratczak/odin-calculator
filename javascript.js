const allClear = document.querySelector("#allClear");
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

let firstValue = 0;
let secondValue = 0;
let displayText = "0";
let chosenOperator = "";

updateDisplayText();

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    if (displayText == "0" || displayText == String(firstValue)) {
      displayText = operand.textContent;
    } else {
      displayText += operand.textContent;
    }
    updateDisplayText();
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (secondValue == 0) {
      firstValue = +displayText;
    }
    chosenOperator = operator.textContent;
  });
});

allClear.addEventListener("click", reset);
equals.addEventListener("click", evaluateResult);

function updateDisplayText() {
  display.textContent = displayText;
}

function evaluateResult() {
  secondValue = +displayText;
  displayText = String(operate(chosenOperator, firstValue, secondValue));
  firstValue = +displayText;
  secondValue = 0;
  updateDisplayText();
}

/*
1. user provides input for first value as text
2. user clicks on an operator (+)
3. current displayText is converted to firstValue
4. save operator.textContent for operate() function
4. current displayText remains visible until user provides new input for second value
5. user provides input. displayText immediately updates to that input.
6. user clicks on equals
7. current displayText is converted to secondValue
8. evaluate operate() using saved operator, firstValue, and secondValue
9. replace displayText with above valuation and update displayText
10. replace firstValue with valuation result
*/

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      if (y === 0) return "NICETRY";
      return x / y;
    default:
      return 0;
  }
}

function reset() {
  firstValue = 0;
  secondValue = 0;
  displayText = "0";
  chosenOperator = "";

  updateDisplayText();
}

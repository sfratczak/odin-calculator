const allClear = document.querySelector("#allClear");
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

let baseValue = 0;
let secondValue = 0;
let result = 0;
let displayText = "0";
let chosenOperator = "";
let showingResult = false;

updateDisplayText();

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    if (
      displayText == "0" ||
      displayText == String(baseValue) ||
      showingResult
    ) {
      displayText = operand.textContent;
      showingResult = false;
    } else {
      displayText += operand.textContent;
    }
    updateDisplayText();
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    chosenOperator = operator.textContent;

    if (showingResult) {
      baseValue = result;
      return;
    }

    if (baseValue == 0) {
      baseValue = +displayText;
    } else {
      secondValue = +displayText;
      result = operate(chosenOperator, baseValue, secondValue);
      updateDisplayText();
    }
  });
});

allClear.addEventListener("click", reset);
equals.addEventListener("click", evaluateResult);

function updateDisplayText() {
  display.textContent = displayText;
}

function evaluateResult() {
  if (showingResult) {
    baseValue = result;
    result = operate(chosenOperator, baseValue, secondValue);
  } else {
    secondValue = +displayText;
    result = operate(chosenOperator, baseValue, secondValue);
  }
  displayText = String(result);
  showingResult = true;
  //baseValue = +displayText;
  //secondValue = 0;
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
  baseValue = 0;
  secondValue = 0;
  displayText = "0";
  chosenOperator = "";

  updateDisplayText();
}

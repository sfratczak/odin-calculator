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
      evaluateResult();
      baseValue = result;
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
  updateDisplayText();
}

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
  result = 0;
  displayText = "0";
  chosenOperator = "";
  showingResult = false;

  updateDisplayText();
}

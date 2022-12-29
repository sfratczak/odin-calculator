const allClear = document.querySelector("#allClear");
const decimal = document.querySelector("#decimal");
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const negative = document.querySelector("#negative");
const percent = document.querySelector("#percent");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

const maxDisplayTextLength = 10;

let baseValue = null;
let secondValue = 0;
let result = 0;
let displayText = "0";
let chosenOperator = "";
let showingResult = false;

updateDisplayText();
window.addEventListener("keydown", keyboardHandler);

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    operandHandler(operand.textContent);
  });
});
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    operatorHandler(operator.textContent);
  });
});
decimal.addEventListener("click", decimalHandler);
negative.addEventListener("click", negativeHandler);
percent.addEventListener("click", percentHandler);
allClear.addEventListener("click", reset);
equals.addEventListener("click", evaluateResult);

function updateDisplayText() {
  truncDisplayText(maxDisplayTextLength);
  display.textContent = displayText;
}

function evaluateResult() {
  if (showingResult) {
    baseValue = result;
  } else {
    secondValue = +displayText;
  }
  result = roundResult(operate(chosenOperator, baseValue, secondValue));
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
  baseValue = null;
  secondValue = 0;
  result = 0;
  displayText = "0";
  chosenOperator = "";
  showingResult = false;

  updateDisplayText();
}

function roundResult(num, expOfTen = 10000) {
  return Math.round(num * expOfTen) / expOfTen;
}

function truncDisplayText(maxLength) {
  if (displayText.length > maxLength) {
    displayText = displayText.slice(0, maxLength);
  }
}

function keyboardHandler(event) {
  if (/[0-9]/.test(event.key)) {
    operandHandler(event.key);
  } else if (/[\+\-\*\/]/.test(event.key)) {
    operatorHandler(event.key);
  } else if (event.key == "Enter" || event.key == "=") {
    evaluateResult();
  } else if (event.key == "Backspace" || event.key == "Escape") {
    reset();
  } else if (event.key == ".") {
    decimalHandler();
  } else if (event.key == "%") {
    percentHandler();
  } else if (event.key == "n") {
    negativeHandler();
  }
  console.log(event.key);
}

function operandHandler(operand) {
  if (
    displayText == "0" ||
    displayText == String(baseValue) ||
    displayText.startsWith("-") ||
    showingResult
  ) {
    displayText = operand;
    showingResult = false;
  } else {
    displayText += operand;
  }
  updateDisplayText();
}

function operatorHandler(operator) {
  if (showingResult) {
    chosenOperator = operator;
    baseValue = result;
  } else {
    if (baseValue === null) {
      chosenOperator = operator;
      baseValue = +displayText;
    } else {
      evaluateResult();
      chosenOperator = operator;
      baseValue = result;
    }
  }
}

function decimalHandler() {
  if (!displayText.includes(".")) {
    displayText = `${displayText}.`;
  } else if (displayText.endsWith(".")) {
    displayText = displayText.slice(0, -1);
  }
  updateDisplayText();
}

function negativeHandler() {
  if (displayText != 0 && !displayText.startsWith("-")) {
    displayText = "-".concat(displayText);
  } else {
    displayText = displayText.replace("-", "");
  }
  updateDisplayText();
}

function percentHandler() {
  displayText = String(roundResult(+displayText / 100));
  updateDisplayText();
}

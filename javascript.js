const display = document.querySelector("#display");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

let firstValue = 0;
let secondValue = 0;
let displayText = "0";

updateDisplayText();

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    if (displayText == "0") {
      displayText = operand.textContent;
    } else {
      displayText += operand.textContent;
    }
    updateDisplayText();
  });
});

function updateDisplayText() {
  display.textContent = displayText;
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
      if (y === 0) {
        return "NICETRY";
      }
      return x / y;
    default:
      console.error(
        "Error: Operate switch reached default state. Refresh the page and try again."
      );
  }
}

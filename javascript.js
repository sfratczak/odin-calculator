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

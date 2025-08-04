let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let currentInput = "";

function appendValue(val) {
  if (display.innerText === "0") {
    currentInput = val;
  } else {
    currentInput += val;
  }
  display.innerText = currentInput;
}

function clearDisplay() {
  currentInput = "";
  display.innerText = "0";
}

function calculate() {
  try {
    const result = eval(currentInput);
    const expression = currentInput + " = " + result;
    display.innerText = result;
    addToHistory(expression);
    currentInput = result.toString();

    // Send to backend
    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression })
    });
  } catch {
    display.innerText = "Error";
  }
}

function clearhistory(){
  historyList.innerHTML = '';
}

function addToHistory(expression) {
  const li = document.createElement("li");
  li.textContent = expression;
  historyList.prepend(li);
}

// Load history on page load
fetch("/api/history")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((entry) => {
      addToHistory(entry.expression);
    });
  });

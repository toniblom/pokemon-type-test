// TODO: Get radio button value references

// Store references
const resultsButton = document.querySelector("#resultsButton");
const results = document.querySelector("#results");
const tryAgainButton = document.querySelector("#tryAgainButton");


// Event handler functions
const showResults = () => {
    results.textContent = "A button was pressed!";
}

const clear = () => {
    results.textContent = "";
}

// Event handlers for buttons
resultsButton.addEventListener("click", showResults);
tryAgainButton.addEventListener("click", clear);


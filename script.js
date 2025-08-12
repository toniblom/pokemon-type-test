
// TODO: Show results disables radio buttons and hides button, scrolls to description
// TODO: Try again resets radio buttons and scrolls to top of page


// Store references
const resultsButton = document.querySelector("#resultsButton");
const results = document.querySelector("#results");
const tryAgainButton = document.querySelector("#tryAgainButton");

//Functions

const calcResults = () => {
    const results = []

    for (let i = 1; i < 16; i++) {
        const type = document.querySelector(`input[name="q${i}"]:checked`).value;

        if (type !== "noneof") {
            results.push(type);
        }
    }

    return mostFrequent(results);
}

// Count the most frequent values in an array (1 to 2 values)
function mostFrequent(arr) {
    let m = new Map();
    let maxCount = 0;
    let res = [];

    for (let num of arr) {
        let count = (m.get(num) || 0) + 1;
        m.set(num, count);

        if (count > maxCount) {
            maxCount = count;
            res = [num];
        } else if (count === maxCount) {
            res.push(num);
        }
    }

    return res;
    //return res[Math.floor(Math.random() * res.length)];
}


// Event handler functions
const showResults = () => {
    const type = calcResults();
    if (type.length === 0) {
        results.textContent = `Your type is normal`;
    } else if (type.length === 1) {
        results.textContent = `Your type is ${type[0]}`;
    } else if (type.length === 2) {
        results.textContent = `Your type is ${type[0]}-${type[1]}`;
    } else {
        const randInt = Math.floor(Math.random() * type.length);
        const randType = type.splice(randInt, 1);
        results.textContent = `Your type is ${randType}, but it could also be one of the following: ${type.join(", ")}`;
    }
}

const clear = () => {
    results.textContent = "";
    window.location.reload() // refresh the page
}

// Event handlers for buttons
resultsButton.addEventListener("click", showResults);
tryAgainButton.addEventListener("click", clear);


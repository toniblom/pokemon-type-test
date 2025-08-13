
// TODO: Reset radio buttons to their initial value
// TODO: make buttons not take space when not visible
// TODO: make results not take space when not visible (remove from dom?)


// Store references
const header = document.querySelector("header");
const resultsButton = document.querySelector("#resultsButton");
const results = document.querySelector("#results");
const tryAgainButton = document.querySelector("#tryAgainButton");
tryAgainButton.style.visibility = "hidden";

//Functions

const calcResults = () => {
    const res = []

    for (let i = 1; i < 16; i++) {
        const type = document.querySelector(`input[name="q${i}"]:checked`).value;

        if (type !== "noneof") {
            res.push(type);
        }
    }

    return mostFrequent(res);
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

    tryAgainButton.style.visibility = "visible";
    resultsButton.style.visibility = "hidden";
    results.scrollIntoView({behavior: 'smooth'});
}

const clear = () => {
    results.textContent = "";
    tryAgainButton.style.visibility = "hidden";
    resultsButton.style.visibility = "visible";
    header.scrollIntoView({behavior: 'smooth'});
}

// Event handlers for buttons
resultsButton.addEventListener("click", showResults);
tryAgainButton.addEventListener("click", clear);



// Store references
const resultsButton = document.querySelector("#resultsButton");
const results = document.querySelector("#results");
const tryAgainButton = document.querySelector("#tryAgainButton");

//Functions

const calcResults = () => {
    const q1 = document.querySelector('input[name="q1"]:checked').value;
    const q2 = document.querySelector('input[name="q2"]:checked').value;
    const q3 = document.querySelector('input[name="q3"]:checked').value;

    const results = [q1, q2, q3]

    return mostFrequent(results);

}

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

    return res[Math.floor(Math.random() * res.length)];;
}


// Event handler functions
const showResults = () => {
    const type = calcResults();
    results.textContent = `Your type is ${type}`;
}

const clear = () => {
    results.textContent = "";
    window.location.reload() // refresh the page
}

// Event handlers for buttons
resultsButton.addEventListener("click", showResults);
tryAgainButton.addEventListener("click", clear);


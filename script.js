
// TODO: Reset radio buttons to their initial value
// add pictures of pokemon for each type

const description = {
    bug: `Bug types dance to the beat of their own drums and don't let other people's negative opinions affect them. They are very adaptable and enjoy both quiet time in nature and social gatherings. Some people might see them as weak or as nothing special, but bug types know better: they understand the power that comes from paying attention to small details and they don't need to make a parade about it.`,
    dark: "Dark types are good at defending themselves and are not easily taken advantage of. Sometimes they might see the world through negativity, but that causes them rarely to be disappointed. Dark types accept the fact that there are both light and dark moments in life.",
    dragon: "Dragon types are powerful and fearless, often becoming leaders in their chosen field or in their reference group. There is a risk that a dragon type might take themselves too seriously; especially light-hearted types like fairy types can easily expose their vulnerabilities.",
    electric: "Electric types are fast learners and often have an interest in new technologies and new experiences in general. They have little patience in things that they are not interested in, but once they are interested in something, their enthusiasm can be quite contagious.",
    fairy: "Fairy types are light-hearted and kind while also being determined. It is impossible to dislike them without looking like a jerk. They are highly attuned to other people's emotions and want to make everyone around them happy; most of the time they also succeed in this.",
    fighting: "Fighting types are warriors at heart. They are tenacious and never give up (even in situations where they probably should). They always keep striving for bigger goals and improving themselves.",
    fire: "Fire types are not afraid to show their emotions, both positive and negative, to others. This is both their greatest strength and their greatest weakness. Fire types are usually confident in their own abilities and popular among their peers, causing them to often gain a loyal following.",
    flying: "Flying types often have unique visions and they are not idle dreamers. They set their goals high, sometimes a bit too high. Failing to achieve their lofty goals can leave them frustrated, but with the right support they can be a soaring success.",
    ghost: "Ghost types are interested in the fundamental questions in life, often making good philosophers. They are quite immune to worrying about mundane concerns. Surprisingly, they also have a great, although a bit dark, sense of humor.",
    grass: "Grass types are peaceful and patient. They love the nature and are also interested in making themselves and their surrounds beautiful. Some could see them as vain, but what they fail to understand is that grass types appreciate beauty in all its forms, whether it is outward or inward.",
    ground: "Ground types are down-to-earth and dependable. They are proud to be themselves and don't need to play a role for anyone. They are content with simple pleasures in life and don't yearn for big changes, instead taking it one step at a time.",
    ice: "Ice types are cool, calm and collected. They have a certain elegance and formality about them, which can make them feel a bit intimidating for others. They might even seem cold, but once you get to know them, you will see that they have a warm heart.",
    normal: "Normal types are cheerful and easy to get along with, which makes them popular friends. They are friendly with everyone and can befriend even the most unfriendly dark, ghost and poison types. They have many interests and are good at many things, sometimes too many. Eventually a normal type needs to learn to focus and specialize.",
    poison: "Poison types are unique personalities, they don't blend well into a crowd nor do they want to. They value authenticity and are not afraid to show people both their good or bad sides. Once you win their trust, they are loyal friends.",
    psychic: "Psychic types are intelligent and enjoy puzzles and mental challenges. They can also see into people's intentions and characters; trying to deceive them will probably backfire. Psychic types are good at what they do, which motivates them to work hard, but they must also remember to relax in order not to get burned out.",
    rock: "Rock types have a strong sense of justice, often protecting those they deem weaker than themselves and making sure everyone is treated fairly. They might seem tough or rigid in their opinions, but they are also honest. Once they realize they are wrong, they will gracefully admit it.",
    steel: "Steel types are unyelding and diligent workers. They have high expectations on themselves and others. This can make them intimidating for some people. Their skills and power seem effortless and graceful, but it is the result of countless hours of training.",
    water: "Water types are masters of adapting into different situations and environments. They are good at seeing the big picture and understanding the relativity and interdependence of everything and everyone. This also makes them likeable and dependable coworkers and partners, as well as excellent mediators and negotiators."
}

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
    let typeColor = "normal";
    
    if (type.length === 0) {
        results.innerHTML = `
            <h2>Your type is <span class="typeColor typeColor-${typeColor}">${type[0]}</span>!</h2>
            <p><em>${description[type[0]]}</em></p>
            `;
    } else if (type.length === 1) {
        typeColor = type[0];
        results.innerHTML = `
            <h2>Your type is <span class="typeColor typeColor-${typeColor}">${typeColor}</span>!</h2>
            <p><em>${description[typeColor]}</em></p>
            `;
    } else if (type.length === 2) {
        typeColor = type[0];
        const type2Color = type[1];
        results.innerHTML = `
            <h2>Your type is <span class="typeColor typeColor-${typeColor}">${type[0]}</span>-<span class="typeColor typeColor-${type2Color}">${type[1]}</span>!</h2>
            <p><em>${description[typeColor]}</em></p>
            <p><em>${description[type2Color]}</em></p>
            `;
    } else {
        const randInt = Math.floor(Math.random() * type.length);
        const randType = type.splice(randInt, 1);
        results.innerHTML = `
            <h2>Your type is <span class="typeColor typeColor-${randType}">${randType}</span>!</h2>
            <p>...but it could also be one of the following types: ${type.join(", ")}.</p>
            <p><em>${description[randType]}</em></p>
            `;
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


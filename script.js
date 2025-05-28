import * as fileA from './answers.js';

let answers = ["BEANS", "GEESE", "HORSE", "MELON", "SHRUB", "WAGON"];
let remaininganswers = answers.slice();
let currentanswers = [];

let googol = 10n ** 100n;
let words = 2309n;
let inputshown = "";
let wordlecount = 24;

let display = document.getElementById("googol");
let wordsdisplay = document.getElementById("uniquewords");
let findword = document.getElementById("findword");
let wordles = document.getElementById("wordles")

let row00 = document.getElementById("answer");
let row01 = document.getElementById("clues 1");
let row02 = document.getElementById("clues 2");
let row03 = document.getElementById("clues 3");
let row04 = document.getElementById("clues 4");
let row05 = document.getElementById("clues 5");
let row06 = document.getElementById("past guess 5");
let row07 = document.getElementById("past guess 4");
let row08 = document.getElementById("past guess 3");
let row09 = document.getElementById("past guess 2");
let row10 = document.getElementById("past guess 1");
let row11 = document.getElementById("input");

let guesses = [];
let letterposs = {};
for (const letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    letterposs[letter] = [false, false, false, false, false];

display.innerHTML = (googol - BigInt(wordlecount)).toString();
wordsdisplay.innerHTML = words.toString();
refillWords();
row01.innerHTML = "-";
row02.innerHTML = "-";
row03.innerHTML = "-";
row04.innerHTML = "-";
row05.innerHTML = "-";
row06.innerHTML = "-";
row07.innerHTML = "-";
row08.innerHTML = "-";
row09.innerHTML = "-";
row10.innerHTML = "-";
row11.innerHTML = inputshown;

findword.addEventListener("click", () => {
    //box-muller transform for random number with normal distribution
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // calculate mean and standard deviation to approximate binomial distribution
    const mean = googol / words;
    const sd = (sqrt(googol * (words - 1n))) / words;
    const bignumber = 1000000000000000000; // a tool that lets us multiply a float and a bigint
    const deviation = (sd * BigInt(Math.round(z * bignumber))) / BigInt(bignumber);
    googol = googol - mean + deviation;
    words--;
    display.innerHTML = (googol - BigInt(wordlecount)).toString();
    wordsdisplay.innerHTML = words.toString();
});

document.addEventListener("keydown", function onEvent(event) {
    const i = event.key;
    const keyboardbtn = document.getElementById("key-" + i.toUpperCase())
    if (keyboardbtn) {
		// keyboardbtn.classList.remove('pressed')
        keyboardbtn.classList.add('pressed');
        keyboardbtn.addEventListener('animationend', () => {
            keyboardbtn.classList.remove('pressed');
        }, { once: true });
    }


    if (i.length === 1 && i.match(/[a-z|A-Z]/i) && inputshown.length < 5) {
        inputshown = inputshown + i.toUpperCase();
        row11.innerHTML = inputshown;
    }
    if (i === "Backspace") {
        if (event.ctrlKey) inputshown = "";
        else inputshown = inputshown.slice(0, -1);
        row11.innerHTML = inputshown;
    }
    if (i === "Enter") {
        if (inputshown.length === 5) {
            guesses.push(inputshown);
            inputshown = "";
            //for (i = 0; i < 5; i++)
            //    letterposs[inputshown[i]][i] = true;
            //setclues();
            switch (Math.min(5, guesses.length)) {
                case 5: row06.innerHTML = guesses.at(-5).toString();
                case 4: row07.innerHTML = guesses.at(-4).toString();
                case 3: row08.innerHTML = guesses.at(-3).toString();
                case 2: row09.innerHTML = guesses.at(-2).toString();
                case 1: row10.innerHTML = guesses.at(-1).toString();
            }
            row11.innerHTML = inputshown;
        }
    }
});


let fraction = 137309;
let multiplier = 100000;

const result = (googol * BigInt(fraction)) / BigInt(multiplier);
console.log(result);

// square root of BigInts
function sqrt(value) {
    if (value < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (value < 2n) {
        return value;
    }

    function newtonIteration(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(value, 1n);
}

function refillWords() {
    let counter = wordlecount - currentanswers.length;
    let w = remaininganswers.length;
    for (; counter > 0; counter--)
        currentanswers.push(remaininganswers[Math.floor(Math.random() * w)]);
    row00.innerHTML = currentanswers.join(" ");
}

function setclues() { // unfinished function
    const t = currentanswers[0].split("").sort();
    let clues = [];
    for (i = 0; i < t.length; i++) {
        let clue = letterposs[t[i]];

    }
}

function createWordle() {
    function createRow(classname = "") {
        const row = document.createElement("div");
        row.className = `wordle-row ${classname}`;

        for (let i = 0; i < 5; i++) {
            const char = document.createElement("div");
            char.className = "wordle-char char-b";
            row.appendChild(char);
        }
        return row
    }
    const wordle = document.createElement("div");
    wordle.className = "wordle";

    const hints = document.createElement("div");
    hints.className = "wordle-hints";
    for (let i = 0; i < 5; i++) {
        hints.appendChild(createRow());
    }

    const entries = document.createElement("div");
    entries.className = "wordle-entries";
    entries.appendChild(createRow("current"));
    for (let i = 0; i < 5; i++) {
        entries.appendChild(createRow("empty"));
    }

    const expand = document.createElement("button");
    expand.className = "wordle-expand";
    expand.textContent = "^^^";

    wordle.appendChild(hints);
    wordle.appendChild(expand);
    wordle.appendChild(entries);

    return wordle;
}

document.addEventListener("DOMContentLoaded", () => {
    const amount =  18;

    for (let i = 0; i < amount; i++) {
        wordles.appendChild(createWordle());
    }
});
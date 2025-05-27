import * as fileA from './answers.js';

let googol = 10n ** 100n;
let words = 2309n;
let inputshown = "";

let subtract = document.getElementById("subtract-btn");
let add = document.getElementById("add-btn");
let display = document.getElementById("googol");
let wordsdisplay = document.getElementById("uniquewords");
let zoom = document.getElementById("zoom");
let findword = document.getElementById("findword");
let inputtest = document.getElementById("input-test");

display.innerHTML = googol.toString();
wordsdisplay.innerHTML = words.toString();
inputtest.innerHTML = inputshown.toString();

findword.addEventListener("click", () => {
    //box-muller transform for random number with normal distribution
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    
    // calculate mean and standard deviation to approximate binomial distribution
    const mean = googol / words;
    const sd = (sqrt(googol * (words-1n))) / words;
    const bignumber = 1000000000000000000; // a tool that lets us multiply a float and a bigint
    const deviation = (sd * BigInt(Math.round(z * bignumber))) / BigInt(bignumber);
    googol = googol - mean + deviation;
    words--;
    display.innerHTML = googol.toString();
    wordsdisplay.innerHTML = words.toString();
});

document.addEventListener("keydown", function onEvent(event) {
    const i = event.key;
    if (i.length === 1 && i.match(/[a-z|A-Z]/i) && inputshown.length < 5) {
        inputshown = inputshown + i;
        inputtest.innerHTML = inputshown.toString();
    }
    if (i === "Backspace") {
        inputshown = inputshown.slice(0,-1);
        inputtest.innerHTML = inputshown.toString();
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

let googol = 10n ** 100n;
let words = 2309n;

let subtract = document.getElementById("subtract-btn");
let add = document.getElementById("add-btn");
let display = document.getElementById("googol");
let wordsdisplay = document.getElementById("uniquewords");
let zoom = document.getElementById("zoom");
let findword = document.getElementById("findword");

display.innerHTML = googol.toString();
wordsdisplay.innerHTML = words.toString();

subtract.addEventListener("click", () => {
    googol = googol - 1n;
    display.innerHTML = googol.toString();
});

add.addEventListener("click", () => {
    googol = googol + 1n;
    display.innerHTML = googol.toString();
});

let zoomin = false;
zoom.addEventListener("click", () => {
    zoomin = !zoomin;
    if (zoomin) {
        interval = setInterval(() => {
            googol--;
            display.innerHTML = googol.toString();
        }, 0);
    } else {
        clearInterval(interval);
    }
});

findword.addEventListener("click", () => {
    //box-muller transform for random number with normal distribution
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // calculate mean and standard deviation to approximate binomial distribution
    const mean = googol / words;
    const sd = (sqrt(googol * (words-1n))) / words;
    const deviation = (sd * BigInt(z * 10000000000)) / 10000000000n;
    googol = googol - mean + deviation;
    words--;
    display.innerHTML = googol.toString();
    wordsdisplay.innerHTML = googol.toString();
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

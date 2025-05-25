let googol = 10n ** 100n;

let subtract = document.getElementById("subtract-btn");
let add = document.getElementById("add-btn");
let display = document.getElementById("googol");
let zoom = document.getElementById("zoom");

display.innerHTML = googol.toString();

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

let fraction = 137309;
let multiplier = 100000;

const result = (googol * BigInt(fraction)) / BigInt(multiplier);
console.log(result);

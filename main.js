const containerEl = document.querySelectorAll('.container');

const playBtnEl = document.querySelector('.playBtn')

const airBtnEls = document.querySelectorAll('.airBtn');

const gameContainerEl = document.querySelector('.gameContainer')
const timeEl = document.querySelector('.time')
const scoreEl = document.querySelector('.score')
const messageEl = document.querySelector('.message')

let seconds = 0;
let score = 0;
let selectedair = {};

// When you click play button,  airList container will display on screen.
playBtnEl.addEventListener('click', () => {
    containerEl[0].classList.add('up');
})

// When user clicks on any of the aircrafts  it will note down source & alternative(alt) of the image and call the start game function & also createair function by 1000ms delay.
airBtnEls.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selectedair = { src, alt };
        containerEl[1].classList.add('up');
        setTimeout(createair, 1000);
        startGame();
    })
})

// start game function will call the increase time function for every 1000ms.
function startGame() {
    setInterval(increaseTime, 1000);
}

// Updates the time.
function increaseTime() {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    m = min < 10 ? `0${min}` : min;
    s = sec < 10 ? `0${sec}` : sec;
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++;
}

// This function generates aircrafts at random locations using getRandomLocation function.
function createair() {
    const air = document.createElement('div');
    air.classList.add('air');
    const { x, y } = getRandomLocation();
    air.style.top = `${y}px`;
    air.style.left = `${x}px`;
    air.innerHTML = `<img src="${selectedair.src}" alt="${selectedair.alt}"  />`;
    gameContainerEl.appendChild(air)

    // When we click on any of the aircrafts it will call the catchair function.
    air.addEventListener('click', catchair)

}

// It gives random location
function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

// when we catch the air it calls the increaseScore function and add caught class to remove that air and also calls the addair function.
function catchair() {
    increaseScore();
    this.classList.add('caught')
    addair()
}

// It will call createair function 2 times with delay 1000ms and 1500ms.
function addair() {
    setTimeout(createair, 1500)
    setTimeout(createair, 2000)
}

// Updates the score and it will display a message after reaching score greater than 20.
function increaseScore() {
    score++;
    if (score > 30) {
        messageEl.classList.add('visible');
    }
    scoreEl.innerHTML = `Aircrafts Down: ${score}`;
}

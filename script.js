let gameState = 'stopped'

const msgField = document.getElementById('message-field')
const startBtn = document.getElementById('start-btn')
const playBtn = document.getElementById('play-btn')
const pauseBtn = document.getElementById('pause-btn')
const stopBtn = document.getElementById('stop-btn')

// Array that holds both the random tune and the user's current selected tune
const boolArray = new Array(80).fill(true)

// Populate boolArray with random tune at every 4th column
function randomTune(difficulty) {
    let density
    if (difficulty === 0) density = 20
    else if (difficulty === 1 || difficulty === 2) density = 10
    else if (difficulty === 3) density = 5

    for (let i = 0; i < boolArray.length; i += density) {
        let ii = i + Math.floor(Math.random() * 5)
        boolArray[ii] = false

        if (difficulty === 2) {
            if (Math.floor(Math.random() * 8) === 0) {
                let iii = i + 5 + Math.floor(Math.random() * 5)
                boolArray[iii] = false
            }
        }
    }
}

randomTune(2)

// Musical fine parameters
const basePitchChoices = [55]
for (let i = 0; i < 60; i++) { basePitchChoices.push(basePitchChoices[i] * (2 ** (1/12))) }
let basePitch = basePitchChoices[Math.floor(Math.random() * basePitchChoices.length)]

const stepChoices = [1/12, 1/6, 1/4, 1/3, 5/12]
let step = stepChoices[Math.floor(Math.random() * stepChoices.length)]

let multiplier = 2 ** step
const waveformChoices = ['sine', 'triangle', 'square', 'sawtooth']
let waveform = waveformChoices[Math.floor(Math.random() * waveformChoices.length)]

let volume = 1
if (basePitch < 220 && waveform === 'sine') volume = 3

console.log(basePitch)
console.log(step)
console.log(waveform)

// Preserve the random tune as boolArray is changed by the user
const answerArray = [...boolArray]

// Get the grid
const box = document.querySelectorAll(".box")

box.forEach((el) => { el.addEventListener('click', handleClick) })

function handleClick(e) {
    const thisBox = parseInt(e.target.dataset.boxNumber)
    const colFirstBox = thisBox - (thisBox % 5)
    let checkedBox = -1

    // Check if any box in the clicked column is already checked; if so, get its box-number
    for (let i = colFirstBox; i < colFirstBox + 5; i++) {
        i = i.toString()
        const currentBox = document.querySelector(`[data-box-number="${i}"]`)
        if (currentBox.dataset.checked === '1') {
            checkedBox = parseInt(currentBox.dataset.boxNumber)
            break
        }
    }

    if (checkedBox === -1) {
        e.target.style.backgroundColor = 'blue'
        e.target.dataset.checked = '1'
        boolArray[thisBox] = !boolArray[thisBox]
    } else if (checkedBox === thisBox) {
        e.target.style.backgroundColor = 'black'
        e.target.dataset.checked = '0'
        boolArray[thisBox] = !boolArray[thisBox]
    } else {
        e.target.style.backgroundColor = 'blue'
        e.target.dataset.checked = '1'
        boolArray[thisBox] = !boolArray[thisBox]
        const currentBox = document.querySelector(`[data-box-number="${checkedBox}"]`)
        currentBox.style.backgroundColor = 'black'
        currentBox.dataset.checked = '0'
        boolArray[checkedBox] = !boolArray[checkedBox]
    }

    if (winTest(boolArray)) {
        msgField.innerText = "YOU WON"
        box.forEach((el) => { el.removeEventListener('click', handleClick) })         
    }
}

function winTest(arr) {
    const numUniqueVals = new Set(arr);
    if (numUniqueVals.size > 1) return false
    else return true
}

const context = new AudioContext()

function playNote(level) {
    const pitch = basePitch * (multiplier ** (level - 1))
    console.log(pitch)
    const o = context.createOscillator()
    const g = context.createGain()
    o.connect(g)
    g.connect(context.destination)
    o.type = waveform
    o.frequency.value = pitch
    g.gain.value = volume
    o.start()
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1.0)
}

let index = 0;
function playLoop() { 
    playBtn.removeEventListener("click", playLoop)
    if (gameState === 'stopped') {
        let pause = false
        let stop = false
        pauseBtn.onclick = () => {
            pause = !pause
            if (pause === false) playLoop()
        }

        setTimeout(function() {
            for (let j = 0; j < 5; j++) {
                box[j + index].style.borderColor = 'magenta'
                setTimeout(function() {
                    box[j + index].style.borderColor = 'lime'
                }, 25)                
                if (box[j + index].dataset.checked === "1") {
                    playNote(5 - j)
                }
            }
            index += 5
            if (index > 79) index = 0
            if (pause === false) playLoop()
        }, 125)
    } else index = 0
}


startBtn.onclick = () => { listen() }

function listen() {
    gameState = 'switch'
    for (i = 0; i < 80; i += 5) {
        for (let j = 0; j < 5; j++) {
            if (answerArray[i + j] === false) setTimeout(function() { playNote(5 - j) }, i * 25)
        }
    }
    setTimeout(function() {
        gameState = 'stopped'
        playBtn.addEventListener("click", playLoop)
    }, 2000)
}

stopBtn.onclick = () => { 
    gameState = 'switch'
    setTimeout(function() {
        gameState = 'stopped'
        playBtn.addEventListener("click", playLoop)
    }, 500)
}

playBtn.addEventListener("click", playLoop)

/*

if stopped
    start - plays answer
    play - plays board
    pause - nothing
    stop - nothing

if answer-playing
    start - stops answer & plays answer
    play - nothing
    pause - nothing
    stop - stops answer

if board playing
    start - stops board & plays answer
    play - stops board & plays board
    pause - pauses board
    stop - stops board

if board paused
    start - stops board & plays answer
    play - stops board & plays board
    pause - unpauses board
    stop - stops board

*/

// const gameState = {
//     stopped: true;
//     answer: false;
//     playing: false;
//     paused: false;
// }


// let playing =  false

// function playPause() {
//     if playing === playLoop()

// }
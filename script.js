const msgField = document.getElementById('message-field')
const startBtn = document.getElementById('start-btn')
const playBtn = document.getElementById('play-btn')
const pauseBtn = document.getElementById('pause-btn')
const stopBtn = document.getElementById('stop-btn')

// Array that holds both the random tune and the user's current selected tune
const boolArray = new Array(80).fill(true)

// Populate boolArray with random tune at every 4th column
for (let i = 0; i < boolArray.length; i += 20) {
    let ii = i + Math.floor(Math.random() * 5)
    boolArray[ii] = false
    // console.log(boolArray)
}

// Get the grid
const box = document.querySelectorAll(".box")

box.forEach((el) => { 
    el.addEventListener('click', handleClick)
    // el.innerHTML = boolArray[el.dataset.boxNumber]
    // console.log(el.dataset.boxNumber)
})

function handleClick(e) {
    const thisBox = parseInt(e.target.dataset.boxNumber)
    const colFirstBox = thisBox - (thisBox % 5)
    let checkedBox = -1

    // console.log(`thisBox = ${thisBox}`)
    // console.log(`colFirstBox = ${colFirstBox}`)
    // console.log(`checkedBox declared at ${checkedBox}`)

    // Check if any box in the clicked column is already checked; if so, get its box-number
    for (let i = colFirstBox; i < colFirstBox + 5; i++) {
        i = i.toString()
        const currentBox = document.querySelector(`[data-box-number="${i}"]`)
        // console.log(`currentBox.dataset.checked = ${currentBox.dataset.checked}`)
        if (currentBox.dataset.checked === '1') {
            checkedBox = parseInt(currentBox.dataset.boxNumber)
            // console.log(`checkedBox when this column already has a clicked box = ${checkedBox}`)
            break
        }
    }

    // console.log(`checkedBox after for loop ran = ${checkedBox}`)

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

    // box.forEach((el) => { 
    //     el.innerHTML = boolArray[el.dataset.boxNumber]
    // }) 
    
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
    const pitch = 220 * (1.189 ** level)
    console.log(pitch)
    const o = context.createOscillator()
    const g = context.createGain()
    o.connect(g)
    g.connect(context.destination)
    o.type = 'square'
    o.frequency.value = pitch
    o.start()
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1.0)
    // setTimeout(function() {o.stop()}, 250)
}

let index = 0;
function playLoop() {
    let pause = false
    let stop = false
    pauseBtn.onclick = () => {
        pause = !pause
        if (pause === false) playLoop()
    }

    setTimeout(function() {
        for (let j = 0; j < 5; j++) {
            box[j + index].style.borderColor = 'lime'
            setTimeout(function() {
                box[j + index].style.borderColor = 'magenta'
            }, 25)                
            if (box[j + index].dataset.checked === "1") {
                playNote(5 - j)
            }
        }
        index += 5
        if (index > 79) index = 0
        if (pause === false) playLoop()
    }, 125)

    stopBtn.onclick = () => { console.log('stop button dont work yet!') }
}

playBtn.onclick = () => { playLoop() }



startBtn.onclick = () => { listen() }

const answerArray = [...boolArray]

function listen() {
    for (i = 0; i < 80; i += 5) {
        // setTimeout(function() {
            for (let j = 0; j < 5; j++) {
                if (answerArray[i + j] === false) {
                    console.log(i * 25)
                    setTimeout(function() { playNote(5 - j) }, i * 25)
                }
            }
        // }, i + 125)
    }
}
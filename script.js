// Array that holds both the random pattern and the user's current pattern
const boolArray = new Array(80).fill(true)

// Populate boolArray with random pattern at every 4th column
for (let i = 0; i < boolArray.length; i += 20) {
    let ii = i + Math.floor(Math.random() * 5)
    boolArray[ii] = false
}

// console.log(boolArray)

// Get the grid
const box = document.querySelectorAll(".box")

box.forEach((el) => { 
    el.addEventListener('click', handleClick)
    el.innerHTML = boolArray[el.dataset.boxNumber]
    // console.log(el.dataset.boxNumber)
}) 

function handleClick(e) {
    const thisBox = parseInt(e.target.dataset.boxNumber)
    const colFirstBox = thisBox - (thisBox % 5)
    let checkedBox = -1

    console.log(`thisBox = ${thisBox}`)
    console.log(`colFirstBox = ${colFirstBox}`)
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

    box.forEach((el) => { 
        el.innerHTML = boolArray[el.dataset.boxNumber]
    })    
}

// function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min) + min);
    // }
    
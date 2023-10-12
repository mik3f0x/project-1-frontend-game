console.log('hey')

const arr = []

for (let i = 0; i < 16; i++) {
    arr[i] = [false, false, false, false, false]
}

const box = document.querySelectorAll(".box")

// console.log(box)

box.forEach((el) => { 
    el.addEventListener('click', handleClick)
    el.innerHTML = el.id
})

function handleClick(e) {
    document.querySelectorAll("." + e.target.classList[1]).forEach((el) => {el.style.backgroundColor = 'black'})
    e.target.style.backgroundColor = 'cyan'
}






const answer = []

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

for (let i = 0; i < 16; i++) {
    if (i % 4 == 0) {
        answer[i] = getRandomInt(1, 6)
        console.log(answer[i])
    } else answer[i] = 0
}

for (let i = 0; i < answer.length; i++) {
    if (answer[i] > 0) {
        if (i < 10) document.querySelectorAll(".col0" + i)[answer[i] - 1].style.backgroundColor = 'yellow'
        else document.querySelectorAll(".col" + i)[answer[i] - 1].style.backgroundColor = 'yellow' 
    }       
}




    // console.log(e.target.id)
    // const col = e.target.id.charAt(1) + e.target.id.charAt(2)
    // const row = e.target.id.charAt(4) + e.target.id.charAt(5)
    // arr[col].forEach((el, i) => {
    //     let boxId = 'c' + col + 'r0' + i;
    //     console.log(boxId)
    //     // box[boxId].style.backgroundColor = 'red'
    //     // box.style.backgroundColor = 'black'
    // })



    // console.log(thisCol[3].id)

    // thisCol.forEach((el) => { console.log(el.id)})

     //.forEach((el) => { el.style.backgroundColor = 'red' })





console.log('hey')

const arr = new Array(80).fill(true)

for (let i = 0; i < arr.length; i += 20) {
    let ii = i + Math.floor(Math.random() * 5)
    arr[ii] = false
}

console.log(arr)


const box = document.querySelectorAll(".box")

// console.log(box)

box.forEach((el) => { 
    el.addEventListener('click', handleClick)
    el.innerHTML = arr[el.dataset.boxNumber]
    // console.log(el.dataset.boxNumber)
})

function handleClick(e) {
    document.querySelectorAll("." + e.target.classList[1]).forEach((el) => {el.style.backgroundColor = 'black'})
    e.target.style.backgroundColor = 'blue'
    index = e.target.dataset.boxNumber
    arr[index] = !arr[index]
    e.target.innerHTML = arr[index]
    
    const tmp = new Set(arr);
    console.log(tmp.size)
    if (tmp.size === 1) console.log('YOU WON')
}






// const answer = []

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// for (let i = 0; i < 16; i++) {
//     if (i % 4 == 0) {
//         answer[i] = getRandomInt(1, 6)
//         console.log(answer[i])
//     } else answer[i] = 0
// }



// for (let i = 0; i < answer.length; i++) {
//     if (answer[i] > 0) {
//         if (i < 10) document.querySelectorAll(".col0" + i)[answer[i] - 1].style.BorderColor = '#0FFF50'
//         else document.querySelectorAll(".col" + i)[answer[i] - 1].style.BorderColor = '#0FFF50' 
//     }       
// }




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





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





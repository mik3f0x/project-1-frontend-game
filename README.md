# Tune Sleuth

A music memory game

## Description

The user listens to a randomly generated tune of 4 to 16 notes over a 2 second period and recreates this tune on a DAW-style mixing board. The complexity of each tune increases every 3 levels. There are 12 levels total to win the game.

Written in HTML, CSS, and JavaScript. Uses the Web Audio API.

Every musical parameter - scale, pitch, waveform (sound texture), time signiture - is randomized at start of each level.

```
const stepChoices = [1/12, 1/6, 1/4, 1/3, 5/12]
let step

const basePitchChoices = [55]
for (let i = 0; i < 60; i++) { basePitchChoices.push(basePitchChoices[i] * (2 ** stepChoices[0])) }
let basePitch

const waveformChoices = ['sine', 'triangle', 'square', 'sawtooth']
let waveform
```
An array of booleans represents the state of the mixing board. Values are flipped to false on notes representing the tune (the user cannot see this). By clicking notes on the mixing board, the user eventually gets the array back into a state where all elements are true, which we test to determine a win.

```
function randomTune(difficulty) {
    boolArray.fill(true)

    let density = 5
    if (difficulty === 0) density = 20
    else if (difficulty < 3) density = 10

    for (let i = 0; i < boolArray.length; i += density) {
        let ii = i + Math.floor(Math.random() * 5)
        if (difficulty < 3 || Math.random() < 0.875) boolArray[ii] = false

        if (difficulty === 2 && Math.floor(Math.random() * 8) === 0) {
                let iii = i + 5 + Math.floor(Math.random() * 5)
                boolArray[iii] = false
        }
    }

    answerArray = [...boolArray]

    step = 2 ** stepChoices[Math.floor(Math.random() * stepChoices.length)]
    basePitch = basePitchChoices[Math.floor(Math.random() * basePitchChoices.length)]
    waveform = waveformChoices[Math.floor(Math.random() * waveformChoices.length)]
    if (basePitch < 220 && waveform === 'sine') volume = 3
}
```


## Resources

Much thanks to Marc G Gauthier's post, [Generate Sounds Programmatically With Javascript](https://marcgg.com/blog/2016/11/01/javascript-audio/)

## Author

Mike Fox





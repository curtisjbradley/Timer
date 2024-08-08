var pause = false

class LabeledTime {
    constructor(time, label) {
        this.time = time
        this.label = label
    }
}

function scaleWindow(){
    scaleElement(document.getElementById("clock-label"), 0.10)
    scaleElement(document.getElementById("time"), 0.25)

}
function scaleElement(element, size){
    let width = document.body.clientWidth
    let maxScale = 1000
    let minScale  = 30
    let fsize  = width * size
    if(fsize > maxScale){
        fsize = maxScale
    }
    if(fsize < minScale){
        fsize = minScale
    }

    element.style.fontSize = `${fsize}px`

}

window.onload = clockLoad
window.onresize = scaleWindow

async function clockLoad() {
    let params = window.location.search.substring(window.location.search.indexOf('?') + 1);
    let times = []

    let nums = params.split('+')
    for (let time in nums) {
        let args = nums[time].split(":")
        times.push(new LabeledTime(parseInt(args[1]),decodeURI(args[0])))
    }

    if (times.length === 1 && isNaN(times[0].time)) {
        window.location.href = 'index.html';
    }

    scaleWindow()
    await runClocks(times)
    window.location.href = "index.html"
}


function runClocks(times, curr= 0){
    if(curr === times.length)
        return 1

    return runClock(times[curr]).then(() => runClocks(times,curr+1))
}

async function runClock(labeledTime) {
    let time = labeledTime.time
    if(isNaN(time)){
        return
    }
    document.getElementById("clock-label").textContent = labeledTime.label
    let curr = 0
    while (curr <= time) {
        if(pause) {
            await new Promise(resolve => setTimeout(resolve, 500))
            continue
        }
        let diff = time - curr
        let mins = Math.floor((diff / 60)) + ""
        while (mins.length < 2){
            mins = "0" + mins
        }
        let secs = (diff % 60) + ""
        while (secs.length < 2){
            secs = "0" + secs
        }
        document.getElementById("time").textContent = mins + ":" + secs
        await new Promise(resolve => setTimeout(resolve, 1000))
        curr++
    }
    const audio = new Audio("horn.mp3");
    audio.play()
    await new Promise(resolve => setTimeout(resolve, 5000))

}

function stop() {
    window.location.href = 'index.html'
}

function pauseClock() {
    pause = !pause;
    document.getElementById("pause-play").value = pause ? "Play" : "Pause";

}




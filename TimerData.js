class LabeledTime {
    constructor(time, label) {
        this.time = parseInt(time)
        if(isNaN(this.time)) {
            throw new TypeError("Time should be a number")
        }
        this.label = label
    }
}

function serializeTimes(times) {
    let out = ""

    for (let i in times) {
        out += times[i].time + ":" + times[i].label
        if (i < times.length - 1) {
            out += "+"
        }
    }
    console.log(out)
    return out
}

function deserializeTimes(timeString) {
    let out = []
    let groups = timeString.split("+")
    for (let group of groups) {
        group = group.split(":")
        out.push(new LabeledTime(group[0],group[1]))
    }
    return out

}
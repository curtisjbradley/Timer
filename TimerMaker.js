
function startClock(){
    saveCookie()
    window.location.href = "timer.html" + "?" + serializeTimes(readTable())

}

function clearTable(){
    let table = document.getElementById("times")
    for (let i = 2; i < table.rows.length; i++) {
        let row = table.rows[i]
        row.remove()
    }

}
function readTable() {
    let table = document.getElementById("times")
    let times = []

    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        times.push(new LabeledTime(row.cells[1].children[0].value, row.cells[2].children[0].value))

    }
    return times
}

function loadTable(times) {
    clearTable()
    let row = document.getElementById("r1");
    row.cells[1].children[0].value = times[0].time
    row.cells[2].children[0].value = times[0].label
    for (let i = 1; i < times.length; i++){
        let newRow = row.cloneNode(true)
        newRow.id = "r" + i

        newRow.cells[0].textContent = (i + 1)
        newRow.cells[1].children[0].value = times[i].time
        newRow.cells[2].children[0].value = times[i].label
        let button = newRow.cells[3].children

        button[0].id = "Add" + newRow.id
        button[1].id = "Rem" + newRow.id
        row.after(newRow)
        row = newRow

    }

}


function loadCookie(){
    let cookie = document.cookie
    console.log("Cookie - " + document.cookie)
    if(cookie === '') return;
    if (cookie === undefined) return;
    if(cookie.length === undefined) return

    let times = deserializeTimes(cookie)
    loadTable(times)

}

function saveCookie() {
    document.cookie = serializeTimes(readTable())
}

function addRow(id) {
    let table = document.getElementById("times")
    let row = document.getElementById(id).parentElement.parentElement
    let rownum = parseInt(row.cells[0].textContent)
    let newRow = row.cloneNode(true);
    newRow.cells[0].value = (rownum + 1)
    newRow.id = "r" + (rownum + 1)
    row.after(newRow)

    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        row.id = "r" + i
        row.cells[0].textContent = i
        let buttons = row.cells[3].children
        buttons[0].id = "Add" + row.id
        buttons[1].id = "Rem" + row.id
    }

    saveCookie()
}

function removeRow(id){
    let table = document.getElementById("times")
    if(table.rows.length <= 2){
        return
    }

    let row = document.getElementById(id).parentElement.parentElement
    row.parentNode.removeChild(row)

    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        row.cells[0].textContent = i
    }
    saveCookie()
}


function  download() {
    let b = new Blob([serializeTimes(readTable())], { type: "text/plain" });
    const el = document.createElement('a')
    el.setAttribute("download", "config.tmr")
    el.setAttribute("href", window.URL.createObjectURL(b))
    el.click()
    el.remove()
}

function upload() {
    let el = document.getElementById("fupload")
    el.opacity = 0
    el.click()
}

function uploaded(el) {
    let f = el.files[0]
    if(!f.name.endsWith(".tmr")) {
        return
    }
    f.text().then(t => loadTable(deserializeTimes(t)))

}

window.onload = loadCookie
window.onclose = saveCookie
window.onresize = saveCookie

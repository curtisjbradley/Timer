class LabeledTime {
    constructor(time, label) {
        this.time = time
        this.label = label
    }
}


function readTable() {
    let table = document.getElementById("times")
    let url = 'timer.html?'

    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        url += row.cells[2].children[0].value + ":" + row.cells[1].children[0].value
        if (i + 1 < table.rows.length ) {
            url += "+"
        }
    }
    saveCookie()
    window.location.href = url

}


function loadCookie(){
    let cookie = document.cookie
    console.log("Cookie - " + document.cookie)
    if(cookie === '') return;
    if (cookie === undefined) return;
    if(cookie.length === undefined) return

    let entries = cookie.split('+')

    let times = []

    for (let entry in entries){
        let parts = entries[entry].split(":")
        times.push(new LabeledTime(parseInt(parts[1]), decodeURIComponent(parts[0])))
    }
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

function saveCookie(){
    let table = document.getElementById("times")
    let cookie = ""
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        cookie += row.cells[2].children[0].value + ":" + row.cells[1].children[0].value
        if (i + 1 < table.rows.length ) {
            cookie += "+"
        }
    }
    document.cookie = cookie
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

window.onload = loadCookie
window.onclose = saveCookie
window.onresize = saveCookie

function readTable() {
    let table = document.getElementById("times")
    let times = []
    let url = 'timer.html?'

    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        url += row.cells[2].children[0].value + ":" + row.cells[1].children[0].value
        if (i + 1 < table.rows.length ) {
            url += "+"
        }
    }

    window.location.href = url

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

}
const addNoteBtn = document.querySelector('.addNote-btn')
const newNoteContent = document.querySelector('.addNote-text')
const notesField = document.querySelector('.notes-field')
const columnOne = document.querySelector('.col-1')
const columnTwo = document.querySelector('.col-2')
const columnThree = document.querySelector('.col-3')
const columns = [columnOne, columnTwo, columnThree]

let columnNumber //пер. для определения колонки, в которую будет добавлена заметка

// localStorage.clear()

newNoteContent.value = ''

if (window.localStorage.length === 0) {
    columnNumber = 0
    localStorage.setItem('columnNumber', columnNumber)
    
    // добавление пустых массивов в ls
    for (let i = 0; i < 3; i++) {
        localStorage.setItem(`column ${i}`, '[]')
    }
} else if (JSON.parse(localStorage.getItem('column 0')).length !== 0) {
    columnNumber = +localStorage.getItem('columnNumber')
    
    //отрисовка заметок из ls при загрузке страницы
    let arr_reload = []
    let str_reload

    for (let i = 0; i < 3; i++) {
        
        str_reload = localStorage.getItem(`column ${i}`)
        arr_reload.push(JSON.parse(str_reload))  
        
        for (let j = 0; j < arr_reload[i].length; j++) {
            let note = document.createElement('div')
            note.className = 'note-complete'
            if (arr_reload[i][j] == '') {
                continue
            } else {
                note.innerHTML = arr_reload[i][j]
            }
            columns[i].append(note)
        }
    }
}

addNoteBtn.addEventListener('click', () => {
    columnNumber = +localStorage.getItem('columnNumber')

    let str = localStorage.getItem(`column ${columnNumber}`)
    let arr = JSON.parse(str)

    if (arr.length === 0) {
        arr[0] = newNoteContent.value
    } else {
        arr.push(newNoteContent.value)
    }
    localStorage.setItem(`column ${columnNumber}`, JSON.stringify(arr))
    
    if (columnNumber < 2) {
        columnNumber += 1
        localStorage.setItem('columnNumber', columnNumber)
    } else {
        columnNumber = 0
        localStorage.setItem('columnNumber', columnNumber)
    }

    newNoteContent.value = ''
})

const addNoteBtn = document.querySelector('.addNote-btn')

const newNoteContent = document.querySelector('.addNote-text')
const notesField = document.querySelector('.notes-field')
const columnOne = document.querySelector('.col-1')
const columnTwo = document.querySelector('.col-2')
const columnThree = document.querySelector('.col-3')

let columnNumber = 0
// localStorage.clear()

addNoteBtn.addEventListener('click', () => {
    let newNote = ''
        
    if (columnNumber < 2) {
        columnNumber += 1
    } else {
        columnNumber = 0
    }
    localStorage.setItem(`column ${columnNumber}`, newNoteContent.value)
    
    console.log(newNoteContent.value)
    newNoteContent.value = ''
})

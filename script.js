const addNoteBtn = document.querySelector('.addNote-btn')
const newNoteContent = document.querySelector('.addNote-text')
const notes = document.querySelector('.notes')
const notesField = document.querySelector('.notes-field')
const columnOne = document.querySelector('.col-1')
const columnTwo = document.querySelector('.col-2')
const columnThree = document.querySelector('.col-3')
const columns = [columnOne, columnTwo, columnThree]
const newsBtns = document.querySelectorAll('.news-btn')
const checkboxTitle = document.querySelectorAll('.checkbox-title')

let columnNumber
let xBtn
let noteID
let content

// localStorage.clear()

newNoteContent.value = ''

if (window.localStorage.length === 0) {
  columnNumber = 0
  noteID = 0
  localStorage.setItem('columnNumber', columnNumber)
  localStorage.setItem('lastID', noteID)

  // добавление пустых массивов в ls
  for (let i = 0; i < 3; i++) {
    localStorage.setItem(`column ${i}`, '[]')
  }
} else { 
  columnNumber = +localStorage.getItem('columnNumber')
  noteID = +localStorage.getItem('lastID')
  notes.classList.add('notes-field-isNotEmpty')

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
        note.innerHTML = arr_reload[i][j].content
        note.setAttribute('id', arr_reload[i][j].id)
      }
      addCross(note)
      columns[i].append(note)
    }
  }
}

addNoteBtn.addEventListener('click', () => {
  if (newNoteContent.value !== '') {
    columnNumber = +localStorage.getItem('columnNumber')

    let str = localStorage.getItem(`column ${columnNumber}`)
    let arr = JSON.parse(str)
    
    noteID = +localStorage.getItem('lastID')
    
    let note = {
      id: noteID++,
      'content': newNoteContent.value
    }

    if (arr.length === 0) {
      arr[0] = note
    } else {
      arr.push(note)
    }
    localStorage.setItem(`column ${columnNumber}`, JSON.stringify(arr))

    if (columnNumber < 2) {
      addNote()
      columnNumber += 1
      localStorage.setItem('columnNumber', columnNumber)
    } else {
      addNote()
      columnNumber = 0
      localStorage.setItem('columnNumber', columnNumber)
    }
  }
})

//Отрисовка добавленной заметки
function addNote() {
  let note = document.createElement('div')
  note.className = 'note-complete'
  note.innerHTML = newNoteContent.value
  
  note.setAttribute('id', noteID - 1)
  
  addCross(note)
  columns[columnNumber].append(note)
  newNoteContent.value = ''
  notes.classList.add('notes-field-isNotEmpty')
  localStorage.setItem('lastID', noteID)
}

function addCross(note) {
  let cross = document.createElement('img')
  cross.setAttribute('src', 'images/cross-icon.svg')
  cross.setAttribute('alt', 'cross')
  cross.classList.add('cross')
  note.append(cross)
}

newsBtns.forEach(el => el.addEventListener('click', () => {
  alert('clicked')
}))

checkboxTitle.forEach(el => el.addEventListener('click', () => {
  const skill = el.parentNode
  const checkBox = skill.querySelector('.custom-checkbox')
  const label = skill.querySelector('label')
  if (checkBox.getAttribute('checked') === '') {
    label.classList.toggle('titleDisabled')
  } else {
    label.classList.toggle('titleEnabled')
  }
}))

notesField.onclick = function(event) {
  if (event.target.classList.contains('cross')) {
    deleteNote(event.target)
  }
}

function deleteNote(el) {
  const currentNote = el.parentNode
  const nextNode = currentNote.nextSibling
  const prevNote = currentNote.previousSibling
  currentNote.className = 'deletedNote'
  if ((!prevNote || prevNote.classList.contains('deletedNote')) && nextNode !== null) {
    nextNode.style.marginTop = '39px';
  }

  let ancestorNode = currentNote.parentNode
  let currentColumn = 'column'
  if (ancestorNode.classList.contains('col-1')) {
    currentColumn += ' 0'
  } else if (ancestorNode.classList.contains('col-2')) {
    currentColumn += ' 1'
  } else if (ancestorNode.classList.contains('col-3')) {
    currentColumn += ' 2'
  }

  let str = localStorage.getItem(`${currentColumn}`)
  let arr = JSON.parse(str)

  console.log(arr)
    
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].id)
    console.log(currentNote.id)
    if (arr[i].id == currentNote.id) {
      arr.splice(i, 1)
    }
  }
  localStorage.setItem(`${currentColumn}`, JSON.stringify(arr))
}

// localStorage.clear()
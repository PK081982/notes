const color = {
  GREEN: 'green',
  BLUE: 'blue',
  RED: 'red',
  YELLOW: 'yellow',
  PURPLE: 'purple',
}
//const header = document.querySelector('.header');
//header.style.backgroundColor = "#FFFF00";



/*const MOCK_NOTES = [
  {
  id: 1,
  title: 'Работа с формами',
  content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
  color: color.GREEN,
  isFavorite: false,
},
]*/

let id = 0;
let heart = '&#9825';
const model = {
  notes: [],

  addNotes(title, content) {
    id++;
    const idNotes = id;
    let radios = document.querySelectorAll('input[type="radio"]');
    let buttonColors = document.querySelector('.radio-list');
    console.log(radios);
    let colorNotes=color.BLUE;
    //buttonColors.addEventListener('click', function() {
      for (let radio of radios) {
        if (radio.checked) {
         colorNotes = radio.value;
        }
      }
    //}); A:/it_incubator  git@github.com:PK081982/notes.git  https://github.com/PK081982/notes.git
    //const colorNotes = color.YELLOW;
    const isFavorite = false;

    const newNotes = {
      idNotes,
      colorNotes,
      title,
      content,
      isFavorite
    };
    this.notes.push(newNotes);
    view.renderNotes(this.notes);
    view.renderCounterNotes();
    console.log(this.notes);
    view.renderLikeNotes(this.notes);
  },
  deleteNotes(id) {
    
    this.notes = this.notes.filter((note) => note.idNotes.toString() !== id)
    view.renderNotes(this.notes);
    view.renderCounterNotes();
    
  },
  
}



const view = {
  init() {
    this.renderNotes(model.notes);
    this.renderCounterNotes();
    view.renderLikeNotes();
    const noteForm = document.querySelector(".note-form");
    const imputTitle = document.querySelector(".input-title");
    const imputContent = document.querySelector(".input-content");
    const messagesBox = document.querySelector(".messages-box");
    noteForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const title = imputTitle.value;
      const content = imputContent.value;
      if (title !== '' && content !== '') {
        messagesBox.textContent = " ";
        controller.addNotes(title, content);
        imputTitle.value = '';
        imputContent.value = '';
      } else {
        messagesBox.textContent = "Заполните все поля";
        messagesBox.style.color = 'red';
      }
    })
    const notesList = document.querySelector('.notes-list');
    notesList.addEventListener('click', event => {
      if (event.target.className === 'button-delete') {
        let id = event.target.parentElement.id;
        controller.deleteNotes(id);
      }
    });
    
  },
  renderCounterNotes() {
    let counter = 0;
    if (counter < document.querySelector('.notes-list').childNodes.length) {
      counter = document.querySelector('.notes-list').childNodes.length
    }
    const spanCounter = document.querySelector('.span-counter');
    spanCounter.innerHTML = "Всего заметок: " + (counter/2);

  },
  renderNotes(notes) {
    const notesList = document.querySelector('.notes-list');
    let notesHTML = '';

    notes.forEach((note) => {
      notesHTML += `
      <li id="${note.idNotes}" class="notes">
      <form id="${note.idNotes}" class="form-notes" style = "background-color: ${note.colorNotes}">
      <b class="notes-title">${note.title} </b>
      <button class="button-delete" type = "button"> 🗑 </button>
       <button class="button-heart"  type = "button"> ${heart}</button>
       </form>
      <p class="notes-content">${note.content}</p>
     
      </li>`
    })
    
    
    notesList.innerHTML = notesHTML;
    /*if(notesHTML!==''){
      const formNotes = document.querySelector('.form-notes');
    formNotes.style.backgroundColor = "#FFFF00";
    }*/
    
    /*let arrayIndex = notes.length-1;
    const formNotes = document.querySelector('.form-notes');
    if(arrayIndex>=0 && notesHTML!==''){
        formNotes.style.backgroundColor =notes[arrayIndex].colorNotes ;
    }*/
  },
  renderLikeNotes(){
    const labelCheck = document.querySelector('.filter-box');
    console.log(model.notes.length);
    if(model.notes.length>0){
      labelCheck.innerHTML =` <label class="label-checkbox">
                <input type="checkbox">
                Показать только избранные заметки
            </label>`
    }
  },
}

const controller = {
  addNotes(title, content) {
    model.addNotes(title, content);
  },
  deleteNotes(id) {
    model.deleteNotes(id);
  },
}

view.init();
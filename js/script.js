'use strict';
const crossMenu = document.querySelector('.sidebar--menu');
const colorOptions = document.querySelectorAll('.sidebar--color');
const mainDisplay = document.querySelector('.mainDisplay');

//generating random ID;
const createId = () => {
  const letters = ['a', 'b', 'c', 'd', 'x', 'y', 'z'];
  const id =
    letters[Math.floor(Math.random() * letters.length)] +
    Math.floor(Math.random() * 999999);
  return id;
};

// for switching between save and edit;
function flipIcons(icon1, icon2) {
  [icon1, icon2].forEach((icon) => {
    if (icon.classList.contains('displayNone')) {
      icon.classList.remove('displayNone');
    } else {
      icon.classList.add('displayNone');
    }
  });
}

// local storage

function getValues(note) {
  console.log(note);
  // date, title value, text value, bg color;
  const noteTitle = note.children[1].value;
  const noteText = note.children[2].value;
  const noteDate = note.children[3].innerHTML;
  const notebackground = note.style.backgroundColor;
  const noteId = note.id;

  return {
    title: noteTitle,
    text: noteText,
    date: noteDate,
    color: notebackground,
    id: noteId,
  };
}
const addNotesFromLs = function (id, title, text, date, color) {
  const div = document.createElement('div');
  div.classList.add('note');
  div.id = id;
  div.style.backgroundColor = color;
  const markup = `
					<span class="note--delete displayNone"
						><i class="far fa-trash-alt"></i
					></span>
					<textarea
						class="note--title"
						style="resize: none"
						// rows="2"
						// cols="20"
            maxlength="22"
						placeholder="Title..."
                        
					></textarea>
					<textarea
						style="resize: none"
						class="note--text"
						cols="30"
						rows="10"
            placeholder="Your notes..." 
            
					></textarea>
					<span class="note--date">${date}</span>
					<span class="note--save"><i class="far fa-save"></i></span>
					<span class="note--edit displayNone"
						><i class="fas fa-pencil-alt"></i
					></span>
                    `;
  div.innerHTML = markup;

  div.children[1].innerText = title;
  div.children[2].innerText = text;

  mainDisplay.prepend(div);
};
function loadNotesFromLs() {
  const keys = Object.keys({ ...localStorage });
  keys.forEach((key) => {
    const note = JSON.parse(localStorage.getItem(key));
    const [title, text, date, color] = [
      note.title,
      note.text,
      note.date,
      note.color,
    ];
    addNotesFromLs(key, title, text, date, color);
  });
}

// Adding/removing textAreas
function flipTextAreas(target) {
  const note = target.closest('.note');
  // Selecting textAreas
  let textAreas = [note.children[1], note.children[2]];
  // removing the ability to edit
  textAreas.forEach((area) => {
    if (area.disabled) {
      area.disabled = false;
    } else {
      area.disabled = true;
    }
  });
}

crossMenu.addEventListener('click', function (e) {
  if (e.target.checked === true) {
    colorOptions.forEach((el) => {
      el.classList.remove('noOpacity');
    });
  }
  if (e.target.checked === false) {
    colorOptions.forEach((el) => {
      el.classList.add('noOpacity');
    });
  }
});

colorOptions.forEach((el) => {
  el.addEventListener('click', function (e) {
    const { color } = e.target.dataset; // getting color var
    createTemplate(color);
  });
});

const createTemplate = function (color) {
  const div = document.createElement('div');
  div.classList.add('note', 'noOpacity');
  div.id = createId();
  let time = new Intl.DateTimeFormat('lt', {
    dateStyle: 'short',
    timeStyle: 'short', //short, long
  }).format(Date.now());
  div.style.backgroundColor = `var(${color})`;
  const markup = `
					<span class="note--delete displayNone"
						><i class="far fa-trash-alt"></i
					></span>
					<textarea
						class="note--title"
						style="resize: none"
						// rows="2"
						// cols="20"
            maxlength="22"
						placeholder="Title..."
                        
					></textarea>
					<textarea
						style="resize: none"
						class="note--text"
						cols="30"
						rows="10"
            placeholder="Your notes..."
                        
					></textarea>
					<span class="note--date">${time}</span>
					<span class="note--save"><i class="far fa-save"></i></span>
					<span class="note--edit displayNone"
						><i class="fas fa-pencil-alt"></i
					></span>
                    `;
  div.innerHTML = markup;
  mainDisplay.prepend(div);
  setTimeout(() => {
    mainDisplay.firstChild.classList.remove('noOpacity');
  }, 200);
};

// need to remaster event listener
mainDisplay.addEventListener('click', (e) => {
  // Selecting Delete icon
  if (e.target.classList.contains('fa-trash-alt')) {
    const note = e.target.closest('.note');
    if (window.confirm('Delete Note?')) {
      // Deleting locacStorage if there
      localStorage.getItem(note.id) !== null
        ? localStorage.removeItem(note.id)
        : '';
      // Deleting note element
      note.remove();
    }
  }
  // Selecting save icon
  if (e.target.classList.contains('fa-save')) {
    const note = e.target.closest('.note');
    flipTextAreas(e.target);
    flipIcons(note.children[4], note.children[5]);
    // Add to localStorage
    const lsNote = JSON.stringify(getValues(note));
    localStorage.setItem(note.id, lsNote);
  }
  // Selecting edit button
  if (e.target.classList.contains('fa-pencil-alt')) {
    const note = e.target.closest('.note');
    flipTextAreas(e.target);
    flipIcons(note.children[4], note.children[5]);
  }
});
// Expanding functionality
mainDisplay.addEventListener('dblclick', (e) => {
  if (e.target.closest('.note')) {
    e.target.closest('.note').classList.toggle('expandedNote');
    e.target.closest('.note').classList.toggle('zIndex');
  }
  console.log(e);
});

// Pulling notes from local Storage

loadNotesFromLs();

//TODO
// add some guidelines for user

'use strict';
const crossMenu = document.querySelector('.sidebar--menu');
const colorOptions = document.querySelectorAll('.sidebar--color');
const mainDisplay = document.querySelector('.mainDisplay');
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
  // console.log(e.target);
  // Selecting Delete icon
  if (e.target.classList.contains('fa-trash-alt')) {
    if (window.confirm('Delete Note?')) {
      // Deleting note element
      e.target.closest('.note').remove();
    }
  }
  // Selecting save icon
  if (e.target.classList.contains('fa-save')) {
    const note = e.target.closest('.note');
    flipTextAreas(e.target);
    flipIcons(note.children[4], note.children[5]);
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
  }
  console.log(e);
});

// mainDisplay.addEventListener('mouseover', (e) => {
//   if (e.target.classList.contains('note')) {
//     console.log(e);
//     // selecting text input areas
//     let text = [e.target.children[1], e.target.children[2]];
//     console.log(text);
//     // showing delete icon
//     e.target.children[0].classList.remove('displayNone');
//     // adding click response
//     e.target.children[0].addEventListener('click', (e) => e.path[2].remove());

//     // adding save click functionality
//     e.target.children[4].addEventListener('click', (e) => {
//       //disabling edit
//       text.forEach((el) => {
//         console.log(el.disabled);
//         el.disabled = true;
//         console.log(el.disabled);
//       });
//       //hiding save button
//       console.log(e.target);
//     });

//     // adding click for editing  4-save, 5 - edit

//     // e.target.children[4].addEventListener('click', (e) => {
//     //   text.forEach((el) => (el.disabled = false));
//     // });
//     //hiding delete icon + prevent editing
//     e.target.addEventListener('mouseleave', (e) => {
//       e.target.children[0].classList.add('noOpacity');
//       // text.forEach((el) => (el.disabled = true));  // preventing editing
//     });
//   }
// });

//TODO
// add an alert or smt on delete buttton done
// refigure all event listeners
// expand on double click
// add a local storage save option

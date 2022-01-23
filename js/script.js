'use strict';
const crossMenu = document.querySelector('.sidebar--menu');
const colorOptions = document.querySelectorAll('.sidebar--color');
const mainDisplay = document.querySelector('.mainDisplay');

crossMenu.addEventListener('click', function (e) {
  if (e.target.checked === true) {
    colorOptions.forEach((el) => {
      el.classList.remove('displayNone');
    });
  }
  if (e.target.checked === false) {
    colorOptions.forEach((el) => {
      el.classList.add('displayNone');
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
  div.classList.add('note', 'displayNone');
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
						rows="1"
						cols="20"
						placeholder="Title..."
                        disabled="true"
					></textarea>
					<textarea
						style="resize: none"
						class="note--text"
						cols="30"
						rows="10"
                        placeholder="Your notes..."
                        disabled="true"
					></textarea>
					<span class="note--date">${time}</span>
					<span class="note--edit"
						><i class="fas fa-pencil-alt"></i
					></span>
                    `;
  div.innerHTML = markup;
  mainDisplay.prepend(div);
  setTimeout(() => {
    mainDisplay.firstChild.classList.remove('displayNone');
  }, 200);
};

mainDisplay.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('note')) {
    let text = [e.target.children[1], e.target.children[2]];
    // showing delete icon
    e.target.children[0].classList.remove('displayNone');
    // adding click response
    e.target.children[0].addEventListener('click', (e) => e.path[2].remove());
    // adding click for editing
    e.target.children[4].addEventListener('click', (e) => {
      text.forEach((el) => (el.disabled = false));
    });
    //hiding delete icon + prevent editing
    e.target.addEventListener('mouseleave', (e) => {
      e.target.children[0].classList.add('displayNone');
      text.forEach((el) => (el.disabled = true));
    });
  }
});

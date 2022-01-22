'use strict';
const crossMenu = document.querySelector('.sidebar--menu');
const colorOptions = document.querySelectorAll('.sidebar--color');
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
  });
});

"use-strict"

const gameBoard = document.querySelector('.gameBoard');

for (let i = 0; i < 9; i++) {
    let div = document.createElement('div');
    div.classList.add('box');

    gameBoard.insertAdjacentElement('beforeend', div);
}

function checked() {
    
}
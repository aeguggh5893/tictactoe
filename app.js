"use-strict"

const gameBoard = (function() {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(0);
        };

    };

    const getBoard = () => board;

    const placeMark = (a, b) => {
        
        if (board[a][b] !== 0) {
            return -1;
        }

        if (game.getActivePlayer() === 'Player One') {
            board[a][b] = 'X';
        } else {
            board[a][b] = 'O';
        };
        
    };

    const printBoard = () => console.log(board);

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            board.pop();
        }
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(0);
            };
    
        };
    }
    

    return {getBoard, placeMark, printBoard, resetBoard}
})();

function createPlayers(name, mark) {
    name;

    mark;

    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark}
}

function gameController() {

    const playerOne = createPlayers('Player One', 'X');
    const playerTwo = createPlayers('Player Two', 'O');

    const board = gameBoard;

    const players = [
        {
            name: playerOne.getName(),
            mark: playerOne.getMark(),
        },
        {
            name: playerTwo.getName(),
            mark: playerTwo.getMark(),
        }
    ];

    let activePlayer = players[0].name;
    let activePlayerMark = players[0].mark;
    let activeDisplayName = players[1].name;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0].name ? players[1].name : players[0].name;
        activePlayerMark = activePlayerMark === players[0].mark ? players[1].mark : players[0].mark;
        activeDisplayName = activeDisplayName === players[1].name ? players[0].name : players[1].name;
    }

    const getActivePlayer = () => activePlayer;
    const getActivePlayerMark = () => activePlayerMark;
    const getActiveDisplayName = () => activeDisplayName;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer}'s turn`);
    };

    const checkWinner = (board) => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== 0) {
                return board[i][0];
            };
        }

        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== 0) {
                return board[0][i];
            };
        }

        for (let i = 0; i < 3; i++) {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0 || 
                board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0) {
                return board[1][1];
            };
        }

        let tie = board.filter((item) => item.includes(0))

        if (tie.length === 0) return 'Tie'

        return null;
    }

    const resetGame = () => {
        board.resetBoard();
        activePlayer = players[0].name;
        activePlayerMark = players[0].mark;
        activeDisplayName = players[1].name;
        printNewRound();
    }

    const placeMarker = (a, b) => {
        if (board.placeMark(a, b) === -1) {
            console.log('Invalid Move');
            printNewRound();
            return;
        }
        
        board.placeMark(a, b);

        const winner = checkWinner(board.getBoard());
        if (winner === 'X' || winner === 'O') {
            console.log(`${winner} Wins!`);  
        } else if (winner === 'Tie') {
            console.log('Tie Game!') 
        }

        switchPlayer();
        printNewRound();
    };

    printNewRound();

    return {getActivePlayer, placeMarker, resetGame, getActivePlayerMark, getActiveDisplayName, checkWinner}
}

const game = gameController();

const userInterface = (function() {
    const playBoard = document.querySelector('.gameBoard');
    let playerTurnMessage = document.querySelector('.playerTurn');
    const resetButton = document.querySelector('button');

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.classList.add('box');

        if (i < 3) {
            div.setAttribute('data-row', 0);
        } else if (i < 6) {
            div.setAttribute('data-row', 1);
        } else {
            div.setAttribute('data-row', 2);
        }

        playBoard.appendChild(div);
    }

    const allBox = document.querySelectorAll('.box');

    allBox.forEach((item, index) => {
        if (index === 0 || index === 3 || index === 6) {
            item.setAttribute('data-column', 0);
        } else if (index === 1 || index === 4 || index === 7) {
            item.setAttribute('data-column', 1);
        } else {
            item.setAttribute('data-column', 2);
        };
    });

    allBox.forEach(item => {
        item.addEventListener('click', function() {

            if (item.innerText) return;

            item.innerText = game.getActivePlayerMark();
            playerTurnMessage.innerText = `${game.getActiveDisplayName()}'s Turn`;
            const a = +item.getAttribute('data-row');
            const b = +item.getAttribute('data-column');
            game.placeMarker(a,b);

        const winner = game.checkWinner(gameBoard.getBoard());
            if (winner === 'X' || winner === 'O') {
                playerTurnMessage.innerText = `${game.getActiveDisplayName()} Wins! (${winner})`;  
            } else if (winner === 'Tie') {
                playerTurnMessage.innerText = 'Tie Game!'; 
            }
        });
    });

    resetButton.addEventListener('click', function() {
        game.resetGame();
        playerTurnMessage.innerText = "Player One's Turn";
        allBox.forEach(item => {
            item.innerText = '';
        });
    });

})();
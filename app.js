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

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0].name ? players[1].name : players[0].name; 
    }

    const getActivePlayer = () => activePlayer;

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

    return {getActivePlayer, placeMarker, resetGame}
}

const game = gameController();
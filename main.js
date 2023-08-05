const validMoves = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];

function gameBoard() {
    const arr0 = Array.from({ length: 3 }, (v, i) => "");
    const arr1 = Array.from({ length: 3 }, (v, i) => "");
    const arr2 = Array.from({ length: 3 }, (v, i) => "");

    const board = [arr0, arr1, arr2];
    return { board };
}

function player() {
    const moves = [];
    const name = "";

    const checkWin = function () {
        let ret = false;

        moves.forEach((value, index) => {
            const first = value[0];
            const second = value[1];
            let num = 0;
            let numy = 0;

            for (let i = index; i < moves.length; i++) {
                if (first === moves[i][0]) {
                    num++;
                }
                if (moves[i][1] === second) {
                    numy++;
                }

                if (num >= 3 || numy >= 3) {
                    ret = true;
                }
            }
            if (moves.includes("11")) {
                if (
                    (moves.includes("00") && moves.includes("22")) ||
                    (moves.includes("02") && moves.includes("20"))
                )
                    ret = true;
            }
        });

        return ret;
    };

    function playMove(theMove, icon) {
        if (validMoves.includes(theMove) && !moves.includes(theMove)) {
            moves.push(theMove);
            const el = selector(`[data-location="${theMove}"]`)
            el.innerHTML = icon
        }
    }

    function numberOfMoves() {
        return moves.length;
    }

    function checkMove(theMove) {
        return moves.includes(theMove)
    }

    function playersMoves() {
        return moves
    }

    function reset() {
        moves.length = 0
    }
    return {
        // moves,
        name,
        playMove,
        checkWin,
        numberOfMoves,
        checkMove,
        playersMoves,
        reset,
    };
}


function game() {
    const { board } = gameBoard();
    const player1 = player();
    const player2 = player();
    let winner = null;

    player1.name = 'player1'
    player2.name = 'player2'

    function play(theMove) {
        if (!checkFullBoard()) {
            if (!player1.checkWin() && !player2.checkWin()) {
                player1.playMove(theMove, '&#79');
                player2Game()
                console.log(player1.numberOfMoves() + player2.numberOfMoves());
                checkWinner()
            }
        }
    }


    function checkFullBoard() {
        if (player1.numberOfMoves() + player2.numberOfMoves() >= 9) {
            return true;
        }
        return false;
    }


    function player2Game() {
        if (!checkFullBoard()) {
            const newArray = validMoves.filter((i) => !player1.playersMoves().includes(i) && !player2.playersMoves().includes(i))
            if (newArray.length) {
                const theMove = newArray[Math.floor(Math.random() * newArray.length)]
                player2.playMove(theMove, '&#10006')
            }
        }
    }

    function populate() {
        const gameArea = selector("#area");

        board.forEach((i, n) => {
            i.forEach((j, m) => {
                let item = document.createElement("div");

                item.classList.add("cell");
                item.setAttribute("data-location", `${n}${m}`);

                item.addEventListener("click", (e) => {
                    newGame.play(e.target.dataset.location);
                });
                gameArea.appendChild(item);
            });
        });
    }

    function checkWinner() {
        const winnerElement=selector('.game-end');
        if (player1.checkWin() || player2.checkWin()) {
            winner = player1.checkWin() ? player1 : player2
            winnerElement.innerHTML=player1.name;
            winnerElement.classList.remove('not-visible')
            console.log(winner);
        }
        else if (checkFullBoard()) {// && !(player1.checkWin() || player2.checkWin())){
            winnerElement.innerHTML='Its a Draw'
            winnerElement.classList.remove('not-visible')
            console.log('A draw')
        }
    }

    function resetGame() {
        player1.reset()
        player2.reset()
        const gameArea = selector('#area');
        gameArea.innerHTML = ''
    }
    return {
        board,
        player1,
        player2,
        play,
        checkFullBoard,
        populate,
        resetGame,
    };
}


function selector(select) {
    return document.querySelector(select);
}


const newGame = game();

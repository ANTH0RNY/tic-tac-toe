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

    function playMove(theMove) {
        if (validMoves.includes(theMove)) {
            moves.push(theMove);
        }
        console.log(`${this.name} ${moves}`);
    }

    function numberOfMoves() {
        return moves.length;
    }

    function checkMove(theMove){
        return moves.includes(theMove)
    }

    return {
        // moves,
        name,
        playMove,
        checkWin,
        numberOfMoves,
        checkMove,
    };
}


function game() {
    const { board } = gameBoard();
    const player1 = player();
    const player2 = player();
    let winner = null;

    player1.name = 'player1'
    player2.name = 'player2'

    function play(element, theMove) {
        if (!checkFullBoard()) {
            if (!player1.checkWin() && !player2.checkWin()) {
                element.innerHTML = "&#79";
                player1.playMove(theMove);
                player2Game(element)
            } else {
                winner = player1.checkWin() ? player1 : player2;
                const main=selector('.area')
                const winElement=document.createElement('div')
                winElement.innerHTML=winner.name;
                main.after(winElement)
                console.log(winner);
            }
        }
    }


    function checkFullBoard() {
        if (player1.numberOfMoves() + player2.numberOfMoves() > 9) {
            return true;
        }
        return false;
    }


    function player2Game() {
        let state = true
        let theMove = ''//validMoves[Math.floor(Math.random() * validMoves.length)]
        while (state){
            theMove = validMoves[Math.floor(Math.random() * validMoves.length)]
            if (!player1.checkMove(theMove) && !player2.checkMove(theMove)){
                state=false
            }
        }

        player2.playMove(theMove)
        const element = selector(`[data-location="${theMove}"]`)
        element.innerHTML = "&#10006";
        console.log(theMove);
    }

    function populate() {
        const gameArea = selector("#area");
        
        board.forEach((i, n) => {
            i.forEach((j, m) => {
                let item = document.createElement("div");
    
                item.classList.add("cell");
                item.setAttribute("data-location", `${n}${m}`);
    
                item.addEventListener("click", (e) => {
                    newGame.play(e.target, e.target.dataset.location);
                });
                gameArea.appendChild(item);
            });
        });
    }

    return {
        board,
        player1,
        player2,
        play,
        checkFullBoard,
        populate,
        // game_state,
    };
}


function selector(select) {
    return document.querySelector(select);
}


const newGame = game();



const validMoves=['00','01','02','10','11','12','20','21','22']

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
    // console.log(this.moves);
    // let moves = this.moves;
    let ret = false;
    // console.log(moves);

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
    if (validMoves.includes(theMove)){
      moves.push(theMove);
    }
    console.log(moves);
  }

  function numberOfMoves() {
    return moves.length;
  }
  return {
    // moves,
    name,
    playMove,
    checkWin,
    numberOfMoves,
  };
}

function game() {
  const { board } = gameBoard();
  const player1 = player();
  const player2 = player();
  let game_state = 0;
  let winner={}

  function play(element, theMove) {
    if (!checkFullBoard()) {
      if (!player1.checkWin() && !player2.checkWin()) {
        if (game_state % 2 === 0) {
          element.innerHTML = "&#79"
          player1.playMove(theMove)
          game_state++;
        } else {
          element.innerHTML = "&#10006"
          player2.playMove(theMove)
          game_state++;
        }
      }
      else{
        winner= player1.checkWin()? player1 : player2
        console.log(winner);
      }
    }
  }

  function checkFullBoard() {
    if (player1.numberOfMoves() + player2.numberOfMoves() >= 9) {
      // console.log(player1.numberOfMoves() + player2.numberOfMoves())
      return true;
    }
    return false;
  }
  return {
    board,
    player1,
    player2,
    play,
    checkFullBoard,
    // game_state,
  };
}

function selector(select) {
  return document.querySelector(select);
}

const play = player();
play.moves = ["01", "11", "22"];
// console.log(play.checkWin());

const newGame = game();
const gameArea = selector("#area");

function populate(theGame) {
  theGame.board.forEach((i, n) => {
    i.forEach((j, m) => {
      let item = document.createElement("div");

      item.classList.add("cell");
      item.setAttribute("data-location", `${n}${m}`);

      item.addEventListener("click", (e) => {
        // function playerA() {
        //   e.target.innerHTML = "&#79;";
        //   newGame.player1.playMove(e.target.dataset.location);
        //   console.log("Player 1");
        // }
        // function playerB() {
        //   // e.target.innerHTML = "&#10060";
        //   newGame.player2.playMove(e.target.dataset.location);
        //   e.target.innerHTML = "&#10006";
        //   console.log("player 2");
        // }

        // console.log(e.target.dataset.location);
        newGame.play(e.target, e.target.dataset.location);
      });
      gameArea.appendChild(item);
    });
  });
}

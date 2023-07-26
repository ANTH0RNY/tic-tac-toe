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
    let moves = this.moves;
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
  return {
    moves,
    name,
    checkWin,
  };
}

function game() {
  const { board } = gameBoard();
  const player1 = player();
  const player2 = player();
  let game_state = 0;

  function play(a, b) {
    // console.log(this);
    if (this.game_state % 2 === 0) {
      a();
      this.game_state++;
    } else {
      b();
      this.game_state++;
    }
  }
  return {
    board,
    player1,
    player2,
    play,
    game_state,
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
        function playerA() {
          e.target.innerHTML = "&#79;";
          console.log('Player 1');
        }
        function playerB() {
          // e.target.innerHTML = "&#10060";
          e.target.innerHTML = "&#10006";
          console.log("player 2");
        }

        // console.log(e.target.dataset.location);
        newGame.play(playerA, playerB);
      });
      gameArea.appendChild(item);
    });
  });
}

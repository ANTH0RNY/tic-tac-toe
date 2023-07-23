function gameBoard(){
    const arr0=Array.from({length: 3} , (v,i)=>'');
    const arr1=Array.from({length: 3} , (v,i)=>'');
    const arr2=Array.from({length: 3} , (v,i)=>'');

    const board=[arr0,arr1,arr2]
    return {board}
}

function player(){
    const moves=[]
    const name=''

    const checkWin=function(){
        // console.log(this.moves);
        let moves = this.moves
        let ret=false
        // console.log(moves);

        moves.forEach((value,index)=>{
            const first=value[0]
            const second=value[1]
            let num=0
            let numy=0


            for (let i=index; i < moves.length; i++){

                if (first === moves[i][0]){
                    num++;
                }
                if (moves[i][1] === second){
                    numy++
                }

                if (num >= 3 || numy >= 3){
                    ret=true
                }
            }
            if (moves.includes('11')){
                if ((moves.includes('00') && moves.includes('22')) || (moves.includes('02') && moves.includes('20')))
                ret=true
            }
        })

        return ret
    }
    return{
        moves,
        name,
        checkWin,
    }
}

function game(){
    const { board }=gameBoard()
    const player1= player()
    const player2= player()
    return {
        board,
        player1,
        player2,
    }
}

const play= player()
play.moves=['01','11','22']
console.log(play.checkWin());

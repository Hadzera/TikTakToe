

var gameDisplay = document.getElementById('game-display'); 
var gameState = ['', '', '', '', '', '', '', '', ''];
var gameActive = true;
var currentPlayer = 'X';
var gameRule = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


var allCells = document.getElementsByClassName('cell');

gameDisplay.innerHTML = turnPlayer();

for (const cell of allCells) {
    cell.addEventListener('click', cellClicked);
}

function cellClicked(event){
 //ovdje se desava click na celiju
var cellSelected = event.target;
var cellIndex = parseInt(
    cellSelected.getAttribute('data-cell-index')
);

if(gameState[cellIndex] !== '' || !gameActive){
    return;
}

handleCellSelected(cellSelected, cellIndex);
handleGameRules();

console.log(gameState);

}

function handleCellSelected(cellSelected, cellIndex){
    //ovdje se popunjava niz gameState
     
     cellSelected.innerHTML = currentPlayer;
     gameState[cellIndex] = currentPlayer;

    
    
}

function handleGameRules(){
    var won = false;
    for (var i = 0; i < gameRule.length; i++) {
         var rule = gameRule[i];
         // [0,1,2] ['X','X','X']
         var a = gameState[rule[0]]; // X
         var b = gameState[rule[1]]; //X
         var c = gameState[rule[2]];

         if(a === '' || b === '' || c === ''){
             continue;
         }

         if(a === b && b === c){
             won = true;
             break;
         }

         }

         if(won){
            gameDisplay.innerHTML = winMessage();
            gameActive = false;
            return;
         }
         var draw = !gameState.includes('');
         if(draw) {
            gameDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
         }



     changePlayer();
}

function changePlayer(){
   currentPlayer = currentPlayer ==='X'?'0':'X';
   gameDisplay.innerHTML = turnPlayer();

}


function winMessage(){
    return `Pobjedio je igrac ${currentPlayer}`;
}

function drawMessage(){
    return 'Nerijeseno je pokusaj opet';
}

function turnPlayer(){
    return `Na potezu je igrac ${currentPlayer}`;
}

function restartGame(){

        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameDisplay.innerHTML = turnPlayer();
        for (const cell of allCells) {
            cell.innerHTML = '';
        }
        

    
}


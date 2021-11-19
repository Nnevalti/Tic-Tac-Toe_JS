// Tic Tac Toe Game made by Nnevalti github : https://github.com/Nnevalti

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// You can resize teh Canvas as you want, all the drawing are based on these
canvas.width = 500;
canvas.height = 500;

var restart = document.getElementById('restart'); // restart the game
var scoreBoard = document.getElementById('scoreBoard'); // display the score
var turnTo = document.getElementById('turnTo'); // Get the DOM element to display the player who have to play
var result = document.getElementById('result'); // Get the DOM element to display the result of the game
var winningCombination =[ [ 0, 1, 2], [ 3, 4, 5], [ 6, 7, 8], [ 0, 3, 6], [ 1, 4, 7], [ 2, 5, 8], [ 0, 4, 8], [ 2, 4, 6] ]; // Based on the CellArray

var CellArray = []; // list of the 9 cells
var scorePlayer1 = 0; // initialize player 1 score
var scorePlayer2 = 0; // initialize player 2 score
var currentPlayer = "PlayerOne"; // Determine the default current player 
var mouse = {}; // array that will receive the future x and y position of the mouse

// Array of multiple colors
var backgroundColors = ['#79a8a9', '#303841', '#a1c45a', '#f2910a'];

// Select a random Color and set it as background
function randomColor(colors){
    document.getElementsByTagName("body")[0].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}
//  Listen the restart button
restart.addEventListener('click', function(){
    restartGame();
    randomColor(backgroundColors);
});

// Call the drawMark function giving the x and y position of the mouse
function mousePosition(){
    mouse.x = event.clientX - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;
    drawMark(mouse.x, mouse.y);
}

// Determine in which cell to draw and which sign according to the current Player 
function drawMark(x, y){
    var cell;
    for(let i = 0; i < 9; i++){
        cell = CellArray[i];
        if(cell.x <= x && x <= cell.x + cell.width && cell.y <= y && y <= cell.y + cell.height){
            break;
        }
    }

    if(currentPlayer == "PlayerOne" && cell.empty){
        currentPlayer = "PlayerTwo";
        turnTo.style.color = "#d72323";
        cell.drawCross();
    }
    else if (currentPlayer == "PlayerTwo" && cell.empty){
        currentPlayer = "PlayerOne";
        turnTo.style.color = "#07689f";
        cell.drawCircle();
    }
    turnTo.innerText = currentPlayer;
    
    verifyWin(winningCombination);
}

// Verify if one player has won or if there is equality
function verifyWin(winningCombination){
    var equalityCase = 0;
    var win = false;

    for(let i = 0; i < 8; i++){
        var test = winningCombination[i];
        console.log(winningCombination[i]);
        
        var firstCell = CellArray[test[0]].sign;
        var secondCell = CellArray[test[1]].sign
        var thirdCell = CellArray[test[2]].sign;

        if( firstCell != undefined && secondCell != undefined && thirdCell != undefined){
            if(firstCell == secondCell && firstCell == thirdCell && secondCell == thirdCell){
                if(firstCell == "cross"){
                    result.innerText = "PLAYER ONE WIN";
                    result.style.color = "#07689f";
                    scorePlayer1++;
                    refreshScore();
                    win = true;
                    canvas.removeEventListener('click', mousePosition);
                }
                else if (firstCell == "circle"){
                    result.innerText = "PLAYER TWO WIN";
                    result.style.color = "#d72323";
                    scorePlayer2++;
                    refreshScore();
                    win = true;
                    canvas.removeEventListener('click', mousePosition);
                }
            }
        }  
    }

    if(!win){
        for(let i = 0; i < 9; i++){
            if(CellArray[i].sign != undefined){
                equalityCase++;
                if(equalityCase == 9){
                    result.innerText = "EQUALITY";
                    canvas.removeEventListener('click', mousePosition);
                }
            }
        }
    }  
}

// Draw the game zone
function gameZone(){
    var x = 0;
    var y = 0;
    CellArray = [];

    for(let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++ ) {
            CellArray.push(new Cell(x, y));
            x = x + canvas.width / 3;
        }
        y = y + canvas.height / 3;
        x = 0;
    }
    for(let i = 0; i < 9; i++){
        CellArray[i].draw();
    }  
}

// Change the Score displayed
function refreshScore(scoreBoard){
    document.getElementById('player1').innerText = scorePlayer1;
    document.getElementById('player2').innerText = scorePlayer2;
}

// Clear the Game Board Zone to restart the game (without resseting the score)
function restartGame () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    result.innerText = "";
    init();
}

// Draw the cell and store them in an array
function Cell(x, y){

    this.width = canvas.width / 3; // Width of a cell
    this.height = canvas.height / 3; // Height of a cell
    this.x = x; // Starting x point for a cell
    this.y = y; // starting y point for a cell
    this.empty = true;
    this.sign;

    // this.update = function(player){
    //     // draw cross or circle
    // }

    this.draw = function(){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.width, y);
        ctx.lineTo(x + this.width, y + this.height);
        ctx.lineTo(x, y + this.height);
        ctx.lineTo(x, y);
        ctx.strokeStyle="black";
        ctx.lineWidth = 1 ;
        ctx.stroke();
        ctx.closePath();
    }
    this.drawCross = function(){
        if(this.empty){
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 4, this.y + this.height / 4);
            ctx.lineTo(this.x + (this.width / 4) * 3, this.y + (this.height / 4) * 3 );
            ctx.moveTo(this.x + this.width / 4,  this.y + (this.height / 4) * 3);
            ctx.lineTo(this.x + (this.width / 4) * 3, this.y + this.height / 4);
            ctx.strokeStyle="#07689f";
            ctx.lineWidth = 10 ;
            ctx.stroke();

            this.empty = false;
            this.sign = "cross";

        }
    }
    this.drawCircle = function(){
        if(this.empty){
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2,this.y + this.height / 2, this.width / 4, 0, 2*Math.PI);
            ctx.strokeStyle="#d72323";
            ctx.lineWidth=10;
            ctx.stroke();

            this.empty = false;
            this.sign = "circle";

        }
    }
}

// Initialise the Game Board and Listen to mouse click on canvas
function init(){
    gameZone();

    canvas.addEventListener('click', mousePosition);
}

init();
randomColor(backgroundColors);
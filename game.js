    // game.fillRect(100,25,100,100); //tamaño del canvas
    // game.clearRect(125,50,50,50) // borrar parte del canvas

    // game.font= '15px serif'; //tamaño y color de la fuente
    // game.fillStyle = 'green' // color de la fuente
    // game.fillText('PLATZI', 125,80); //colocamos algin 



const canvas = document.querySelector('#game'); //seleccionamos cuadro que contendra el tablero
const game = canvas.getContext('2d'); //le decimos que en ese elemento lo convertiremos en un canvas o hoja de dibujo

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');


window.addEventListener('load', setCanvasSize); // que cargue el juego luego de haber cargado la pagina o el html para evitar futuros errores
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

let playerPos = {
    x:undefined,
    y:undefined,
};

const giftPos = {
    x:undefined,
    y:undefined,
};

let enemiesPos = [];


function movePlayer(){
    if(playerPos.x.toFixed(3) == giftPos.x.toFixed(3) && playerPos.y.toFixed(3) == giftPos.y.toFixed(3)){
        console.log('has ganao');
    }

    const enemyCollision = enemiesPos.find(enemy => {

        const enemyCollisionX = enemy.x == playerPos.x;
        const enemyCollisionY = enemy.y == playerPos.y;

        return enemyCollisionX && enemyCollisionY;
    });

    if  (enemyCollision){
        console.log('Chocaste con una bomba');
    }
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);
    
}


function startGame(){


    console.log(canvasSize,elementsSize);

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'start';

    game.clearRect(0,0,canvasSize,canvasSize);
    enemiesPos = [];
    const map = maps[1];
    const mapRows = map.trim().split('\n'); 
    const mapRowCols = mapRows.map(row => row.trim().split(''));  

    const imprimirMaps = mapRowCols.forEach( (row, rowI) => {   
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI);
            const posY = elementsSize * (rowI+1);

            if(playerPos.x === undefined && col == 'O'){

                playerPos.x = posX;
                playerPos.y = posY;
                console.log({playerPos});
            } else if (col == 'I'){
                giftPos.x = posX;
                giftPos.y = posY;
            }
            else if( col == 'X'){

                enemiesPos.push({
                    x: posX,
                    y: posY,
                });
                
            }

            game.fillText(emoji, posX, posY);
        })

    });
 
    movePlayer();
}

function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }
    else{
        canvasSize = window.innerHeight * 0.8;
    }


    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

     elementsSize = (canvasSize / 10.2) ;

     startGame();

}

// EVENTOS DE MOVIMIENTO PARA EL JUGADOR.

window.addEventListener('keydown',moveByKeys)

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);


function moveByKeys(event){
    
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }


}
function moveUp(){
    if( playerPos.y - elementsSize  < elementsSize){
        console.log('out');
    }
    else{
        playerPos.y -= elementsSize;
    }
    startGame();
}
function moveDown(){
    if( playerPos.y + elementsSize > canvasSize){
        console.log('out');
    }
    else{
        playerPos.y += elementsSize;
    }
    

    startGame();
}
function moveLeft(){
    if( playerPos.x  - elementsSize < 0){
        console.log('out');
    }
    else{
        playerPos.x -= elementsSize;
    }
    
    startGame();
}
function moveRight(){

    if( playerPos.x + elementsSize > canvasSize -elementsSize){
        console.log('out');
    }
    else{
        playerPos.x += elementsSize;
    }
    
    startGame();
}
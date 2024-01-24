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

const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


window.addEventListener('load', setCanvasSize); // que cargue el juego luego de haber cargado la pagina o el html para evitar futuros errores
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;
let timeStar;
let timeInterval;
let playerTime = 0;
let record;


let level = 0;
let life = 3;

let playerPos = {
    x:undefined,
    y:undefined,
};

const doorPos ={
    x:undefined,
    y:undefined,
}

const giftPos = {
    x:undefined,
    y:undefined,
};

let enemiesPos = [];

let bombExplosion = [];

function fixed(n){

    return Number(n.toFixed(0));
}

function movePlayer(){
    if(fixed(playerPos.x) == fixed(giftPos.x) && fixed(playerPos.y) == fixed(giftPos.y)){
       
            
            nextLevel();   
    }

    const enemyCollision = enemiesPos.find(enemy => {

        const enemyCollisionX = fixed(enemy.x) == fixed(playerPos.x);
        const enemyCollisionY = fixed(enemy.y) == fixed(playerPos.y);
            

        return enemyCollisionX && enemyCollisionY;
    });

    if  (enemyCollision){ 

        restartLevel(); }

    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);
    
}


function startGame(){

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'start';

   
    const map = maps[level];

    showLives();
    if(!map){
        gameWin();
        return;
    }

    if(!timeStar){
        timeStar = Date.now(); // asignamos el tiempo al momento de iniciar el juego.
        timeInterval = setInterval(showTime,100); //set interval toma la funcion showTime y la ejecuta cada cierto tiempo le indiques en miliseguntos en este caso 100 milisegundos
        showRecord();
    }
    const mapRows = map.trim().split('\n'); // limpiamos el array de espacios en blanco con strim y y guardamos cada fila del mapa como un una posicion de un array  con el metodo split
    const mapRowCols = mapRows.map(row => row.trim().split(''));  
    game.clearRect(0,0,canvasSize,canvasSize);
    enemiesPos = [];

    const imprimirMaps = mapRowCols.forEach( (row, rowI) => {   
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI);
            const posY = elementsSize * (rowI+1);

            if(!playerPos.x && !playerPos.y && col == 'O'){

                playerPos.x = posX;
                playerPos.y = posY;
                
            } else if (col == 'I'){
                giftPos.x = posX;
                giftPos.y = posY;
            }
            else if( col == 'X'){

                enemiesPos.push({
                    x: posX,
                    y: posY,
                });
                          
            }else if (col == 'o'){
                doorPos.x = posX;
                doorPos.y = posY;
            }

            game.fillText(emoji, posX, posY);
        })

    });
 
    movePlayer();
}

function setCanvasSize(){


    if(window.innerHeight > window.innerWidth){
        canvasSize = Number((window.innerWidth * 0.8).toFixed(0));
        
    }
    else{
        canvasSize = Number((window.innerHeight * 0.8).toFixed(0));      
    }



    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

     elementsSize = (canvasSize / 10) ;
    fixed(elementsSize);
    playerPos.x = undefined;
    playerPos.y = undefined;
     startGame();

}

function nextLevel(){
    console.log('Haz pasado de Nivel');
    level++;
    startGame();   
    
}
function restartLevel(){
    playerPos.x = doorPos.x; 
    playerPos.y = doorPos.y;
    life--;


    if (life <= 0){
        gameOver();
    }
    startGame();
}
function gameOver(){
    life = 3;
    level=0;
    timeStar = undefined;
    console.log('Game Over');
}
function gameWin(){

   record = clearInterval(timeInterval); // finaliza la ejecucion de la funcion setInterval


   const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStar; 

    if(recordTime){
       if(recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'NUEVO RECORD!! FELICIDADES';
       }else {
        pResult.innerHTML = 'Lo siento, NO SUPERASTE EL RECORD';
       }
    }else{
        localStorage.setItem('record_time', playerTime);
    }
    console.log('Felicidades has pasado el juego');   
}


function showLives(){
    const heartsArray = Array(life).fill(emojis['HEART']); //creamos un array con la cantidad de vidas que tenemos insertandole los emojis en cada posicion del array 


    spanLives.innerHTML = heartsArray.join(""); //insertamos la cantidad de corazones que tenemos en el array gracias a la propiedad join el cual los separa c
}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStar;
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time');
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
    if( Math.ceil(playerPos.y - elementsSize)  < elementsSize){
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
    if( Math.ceil(playerPos.x  - elementsSize) < 0){
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
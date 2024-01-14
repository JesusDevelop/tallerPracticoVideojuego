const canvas = document.querySelector('#game'); //seleccionamos cuadro que contendra el tablero
const game = canvas.getContext('2d'); //le decimos que en ese elemento lo convertiremos en un canvas o hoja de dibujo

window.addEventListener('load', setCanvasSize); // que cargue el juego luego de haber cargado la pagina o el html para evitar futuros errores
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;


function startGame(){


    console.log(canvasSize,elementsSize);

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'start';


    const map = maps[0];
    const mapRows = map.trim().split('\n'); 
    const mapRowCols = mapRows.map(row => row.trim().split(''));  

    console.log(map,mapRows,mapRowCols);

    for( let i = 0; i < 10; i++){
        for(let j=0; j < 10; j++){
         console.log (i,j);
            game.fillText(emojis[mapRowCols[j][i]], elementsSize  * (i+0), elementsSize * (j+1));
        }
    }
        
    // game.fillRect(100,25,100,100); //tamaño del canvas
    // game.clearRect(125,50,50,50) // borrar parte del canvas

    // game.font= '15px serif'; //tamaño y color de la fuente
    // game.fillStyle = 'green' // color de la fuente
    // game.fillText('PLATZI', 125,80); //colocamos algin texto
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
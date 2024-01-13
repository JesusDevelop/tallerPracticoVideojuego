const canvas = document.querySelector('#game'); //seleccionamos cuadro que contendra el tablero
const game = canvas.getContext('2d'); //le decimos que en ese elemento lo convertiremos en un canvas o hoja de dibujo

window.addEventListener('load', startGame); // que cargue el juego luego de haber cargado la pagina o el html para evitar futuros errores

function startGame(){
    let canvasSize;


    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }
    else{
        canvasSize = window.innerHeight * 0.8;
    }


    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    // game.fillRect(100,25,100,100); //tamaño del canvas
    // game.clearRect(125,50,50,50) // borrar parte del canvas

    // game.font= '15px serif'; //tamaño y color de la fuente
    // game.fillStyle = 'green' // color de la fuente
    // game.fillText('PLATZI', 125,80); //colocamos algin texto
    

}
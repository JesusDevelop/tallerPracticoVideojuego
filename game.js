const canvas = document.querySelector('#game'); //seleccionamos cuadro que contendra el tablero
const game = canvas.getContext('2d'); //le decimos que en ese elemento lo convertiremos en un canvas o hoja de dibujo

window.addEventListener('load', startGame); // que cargue el juego luego de haber cargado la pagina o el html para evitar futuros errores

 function startGame(){

    // game.fillRect(0,0,100,100); //tamaño del canvas
    // game.clearRect(50,0,50,50) // borrar parte del canvas

    game.font= '20px serif'; //tamaño y color de la fuente
    game.fillStyle = 'green' // color de la fuente
    game.fillText('PLATZI', 20,20); //colocamos algin texto
 }
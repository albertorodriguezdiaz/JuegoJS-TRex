console.log('Inicio de Juego');

document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        console.log("Saltar");
    }
});


var imgRex, imgNube, imgCactus, imgSuelo;

function cargarImagenes(){
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src ='img/rex.png';
    imgRex.src ='img/nube.png';
    imgRex.src ='img/cactus.png';
    imgRex.src ='img/suelo.png';
}

var ancho = 700;
var alto = 300;
var canvas,ctx;


function inicializa(){
 canvas = document.getElementById('canvas');
 ctx = canvas.getContext('2d');
}


function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}

///////////////////////////////////////////////////////////////

//Bucle principal
var FPS = 10;
//Cada cuanto tiempo tiene que ejecutarse una funcion
setInterval(function(){
    principal();
},1000/10); // 10 veces por segundo


function principal(){
    borraCanvas();
    console.log("Principal");
}
console.log('Inicio de Juego');

document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        console.log("Saltar");
        if (nivel.muerto == false) {
            saltar();
        }else{
            nivel.velocidad = 9;
            nivel.muerto = false;
            nube.velocidad = 2;
            nube.x = ancho - 300;
            cactus.x = ancho + 100;
            nivel.puntuacion = 0;
        }
        
    }
});


var imgRex, imgNube, imgCactus, imgSuelo;

function cargarImagenes(){
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src ='img/rex.png';
    imgNube.src ='img/nube.png';
    imgCactus.src ='img/cactus.png';
    imgSuelo.src ='img/suelo.png';
}

var ancho = 700;
var alto = 400;
var canvas,ctx;


function inicializa(){
 canvas = document.getElementById('canvas');
 ctx = canvas.getContext('2d');
 cargarImagenes();
}


function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}


///////////////////////////////////////////////////////////////


var suelo = 230;


///////////////////////////////////////////////////////////////


var cactus = {
    x: ancho + 100,
    y: suelo + 10
}

function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,100,90,cactus.x,cactus.y,100,90);
}

function logicaCactus(){
    if (cactus.x < -100) {
        cactus.x = ancho +100;
        nivel.puntuacion ++;
    }
    else{
        cactus.x -= nivel.velocidad;
    }
}

///////////////////////////////////////////////////////////////

var nube = {
    x: ancho - 300,
    y: suelo - 180,
    velocidad: 2
}

function dibujaNube(){
    ctx.drawImage(imgNube,0,0,150,82,nube.x,nube.y,150,82);
}

function logicaNube(){
    if (nube.x < -100) {
        nube.x = ancho +100;
    }
    else{
        nube.x -= nube.velocidad;
    }
}

///////////////////////////////////////////////////////////////


var suelog = {
    x: 0,
    y: 0
}

function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,1400,400,0,suelog.y,1400,400);
}

function logicaSuelo(){
    if(suelog.x > 700) {
        suelog.x = 0;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}

///////////////////////////////////////////////////////////////


var tRex = {
    y:  suelo,
    vy: 0,
    gravedad: 2,
    salto: 30,
    vymax: 9,
    saltando: false
};

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,120,100,100,tRex.y,120,100);
}


///////////////////////////////////////////////////////////////




var nivel = {
    velocidad: 9,
    puntuacion: 0,
    muerto: false
}

function colision(){
    if (cactus.x >= 100 && cactus.x <= 150) {
        if (tRex.y >= suelo-25) {
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}

function saltar(){
    tRex.saltando = true;
    tRex.vy = tRex.salto
}

function gravedad(){
    if(tRex.saltando == true){

        if((tRex.y - tRex.vy - tRex.gravedad) > suelo){
            tRex.saltando = false;
            tRex.vy = 0;
            tRex.y = suelo;
        }else{
            tRex.vy -= tRex.gravedad;
            tRex.y -= tRex.vy;
        }

        
    }
}

function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = "#555555";
    ctx.fillText(nivel.puntuacion,600,50);

    if(nivel.muerto == true){
        ctx.font = "60px impact";
        ctx.fillText('GAME OVER',240,200);
    }
}

///////////////////////////////////////////////////////////////

//Bucle principal
var FPS = 50;
//Cada cuanto tiempo tiene que ejecutarse una funcion
setInterval(function(){
    principal();
},1000/FPS); //  veces por segundo


function principal(){
    borraCanvas();
    gravedad();

    logicaSuelo();
    dibujaSuelo();

    logicaCactus();
    dibujaCactus();
    
    logicaNube();
    dibujaNube();

    dibujaRex();

    colision();
    puntuacion();
    
    console.log("Principal");
}
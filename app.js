console.log('Inicio de Juego');

document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){

            console.log("Saltar");
            if (nivel.muerto == false) {
                saltar();
            }else{
                detenerJuego(true);
            }
    }
});

function detenerJuego(muerto){
    nivel.velocidad = 0;
    nivel.muerto = muerto;
    nivel.niveles = 1;
    nube.velocidad = 2;
    nube.x = ancho - 300;
    cactus.x = ancho + 100;
    nivel.puntuacion = 0;
}


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


function niveles(){

    switch (nivel.puntuacion) {
        case 5: nivel.velocidad = 11;
        nivel.niveles = 2;
        break;

        case 10: nivel.velocidad = 13;
        nivel.niveles = 3;
        break;
        
        case 15: nivel.velocidad = 15;
        nivel.niveles = 4;
        break;

        case 20: nivel.velocidad = 17;
        nivel.niveles = 5;
        break;

        case 25: nivel.velocidad = 19;
        nivel.niveles = 6;
        break;

        case 30: 
        nivel.niveles = 7;

        break;
    
        default: 
        break;
    }

    ctx.font = "30px impact";
    ctx.fillStyle = "#555555";
    ctx.fillText("Nivel: "+nivel.niveles,50,50);

}

///////////////////////////////////////////////////////////////




var nivel = {
    velocidad: 9,
    puntuacion: 0,
    niveles: 1,
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
    ctx.fillText("Puntos: "+nivel.puntuacion,500,50);

    if(nivel.muerto == true ){
        detenerJuego(true);
        ctx.font = "60px impact";
        ctx.fillText('GAME OVER',240,200);
    }

    if(nivel.niveles == 2){
        detenerJuego(false);
        ctx.font = "60px impact";
        ctx.fillText('GANASTES',240,200);
        nivel.niveles = 2;
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

    niveles();
    
    console.log("Principal");
}
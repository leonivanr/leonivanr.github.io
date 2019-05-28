let secuencia = [];
let secuenciaJugador = [];
let contador;
let ganador;
let luz;
let intervaloId;
let intervalo;
let correcto;
let turnoComp = false;
const verdeQ = document.querySelector('#verde');
const rojoQ = document.querySelector('#rojo');
const amarilloQ = document.querySelector('#amarillo');
const azulQ = document.querySelector('#azul');
const contadorRacha = document.querySelector('#contador');
const racha = document.querySelector('#racha');
const jugarBtn = document.querySelector('#jugar');

// Cargar eventos.
jugarBtn.addEventListener('click', main);

verdeQ.addEventListener('click', (e) => {
    secuenciaJugador.push(1);
    verde();
    setTimeout(() => {
        limpiarColores();
    }, 200)
    esCorrecto();
});
rojoQ.addEventListener('click', (e) => {
    secuenciaJugador.push(2);
    rojo();
    setTimeout(() => {
        limpiarColores();
    }, 200)
    esCorrecto();
});
amarilloQ.addEventListener('click', (e) => {
    secuenciaJugador.push(3);
    amarillo();
    setTimeout(() => {
        limpiarColores();
    }, 200)
    esCorrecto();
});
azulQ.addEventListener('click', (e) => {
    secuenciaJugador.push(4);
    azul();
    setTimeout(() => {
        limpiarColores();
    }, 200)
    esCorrecto();
});


function main() {
    secuencia = generarSec();
    ganador = false;
    luz = 0;
    intervaloId = 0;
    contador = 1;
    correcto = true;

    //Añadir puntero al mouse.
    verdeQ.style.cursor = 'pointer';
    azulQ.style.cursor = 'pointer';
    amarilloQ.style.cursor = 'pointer';
    rojoQ.style.cursor = 'pointer';

    jugarBtn.style.display = 'none';
    contadorRacha.style.display = 'block';
    racha.innerHTML = contador;

    turnoComp = true;

    // Va a ejecutar la funcion "secuenciaCpu" cada 0.8 segundos.
    intervaloId = setInterval(secuenciaCpu, 700);
}

function secuenciaCpu() {

    if (luz == contador) {
        clearInterval(intervaloId);
        turnoComp = false;
        limpiarColores();
    }

    if (turnoComp) {
        limpiarColores();
        setTimeout(() => {
            if (secuencia[luz] === 1) {
                verde()
            };
            if (secuencia[luz] === 2) {
                rojo()
            };
            if (secuencia[luz] === 3) {
                amarillo()
            };
            if (secuencia[luz] === 4) {
                azul()
            };
            luz++;
        }, 200);
    }
}

//TODO:
function esCorrecto() {
    if (secuenciaJugador[secuenciaJugador.length - 1] !== secuencia[secuenciaJugador.length - 1]) {
        correcto = false;
    }
    if (secuenciaJugador.length == 25) {
        hayGanador();
    }
    if (correcto == false) {
        prenderColores();
        racha.innerHTML = ':(';
        setTimeout(() => {
            contador = 1;
            racha.innerHTML = contador;
            limpiarColores();
            turnoComp = true;
            luz = 0;
            secuenciaJugador = [];
            correcto = true;
            intervaloId = setInterval(secuenciaCpu, 800);
        }, 800)
    }
    if (contador == secuenciaJugador.length && correcto && !ganador) {
        contador++;
        secuenciaJugador = [];
        turnoComp = true;
        luz = 0;
        racha.innerHTML = contador;
        intervaloId = setInterval(secuenciaCpu, 800);
    }
}

function generarSec() {
    for (let i = 0; i < 50; i++) {
        secuencia.push(Math.round(Math.random() * 3) + 1);
    }
    return secuencia;
}

function azul() {
    let clip = document.querySelector('#azul-snd');
    clip.play();
    azulQ.style.backgroundColor = 'lightblue';
}

function verde() {
    let clip = document.querySelector('#verde-snd');
    clip.play();
    verdeQ.style.backgroundColor = 'lightgreen';
}

function rojo() {
    let clip = document.querySelector('#rojo-snd');
    clip.play();
    rojoQ.style.backgroundColor = 'lightcoral';
}

function amarillo() {
    let clip = document.querySelector('#amarillo-snd');
    clip.play();
    amarilloQ.style.backgroundColor = 'lightyellow';
}

function limpiarColores() {
    verdeQ.style.backgroundColor = 'green';
    rojoQ.style.backgroundColor = 'red';
    amarilloQ.style.backgroundColor = 'yellow';
    azulQ.style.backgroundColor = 'blue';
}

function hayGanador() {
    racha.innerHTML = 'WIN';
    ganador = true;
    prenderColores();
}

function prenderColores() {
    verdeQ.style.backgroundColor = 'lightgreen';
    rojoQ.style.backgroundColor = 'lightcoral';
    amarilloQ.style.backgroundColor = 'lightyellow';
    azulQ.style.backgroundColor = 'lightblue';
}

function activarEventos() {
    
}
const rayaGanadora = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const grilla = () => Array.from(document.querySelectorAll('.c'));
// Tomo el id que va a ser siempre "c[i]" y elimino la letra.
const removerLetras = cuadrante => Number.parseInt(cuadrante.id.replace('c', ''));
const casillasLibres = () => grilla().filter(casilla => casilla.innerText === '');
const sonIguales = array => array.every(casilla => casilla.innerText === array[0].innerText && casilla.innerText !== '');
const tomarTurno = (index, letra) => grilla()[index].innerText = letra;
const eleccionAdversario = () => removerLetras(casillasLibres()[Math.floor(Math.random() * casillasLibres().length)]);

const finJuego = (secuenciaGanadora) => {
    secuenciaGanadora.forEach(casilla => casilla.classList.add('ganador'));
    removerListeners();
};
const hayGanador = () => {
    let victoria = false;

    rayaGanadora.forEach(combinacion => {
        const grillaL = grilla();
        const secuencia = [grillaL[combinacion[0]], grillaL[combinacion[1]], grillaL[combinacion[2]]];
        if (sonIguales(secuencia)) {
            victoria = true;
            finJuego(secuencia);
        }
    })

    return victoria;
};

const turnoAdversario = () => {
    removerListeners();
    setTimeout(() => {
        tomarTurno(eleccionAdversario(), 'O');
        if (!hayGanador())
            activarListeners();
    }, 1000)

}

const clickFunc = event => {
    // Tomo el id del evento y escribo.
    tomarTurno(removerLetras(event.target), 'X');
    if (!hayGanador())
        turnoAdversario();
};
const activarListeners = () => grilla().forEach((cuadrante) => cuadrante.addEventListener('click', clickFunc));
const removerListeners = () => grilla().forEach((cuadrante) => cuadrante.removeEventListener('click', clickFunc));

activarListeners();
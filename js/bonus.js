// Bonus
// L’utente indica un livello di difficoltà
//  in base al quale viene generata una griglia di gioco quadrata,
//  in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

// recupero dall'html il contenitore che dovrà contenere le mie celle
const gridContainer = document.getElementById("grid-container");


// Funzione
// creo una funzione per generare le bombe
function nBombe (maxBombe) {
    const arrayBombe = [];
    
    for(let i = 0; i < 16; i ++){
        let numeriGenerati = Math.floor(Math.random() * maxBombe + 1);

        if(!arrayBombe.includes(numeriGenerati)) {
            arrayBombe.push(numeriGenerati);
        }else {
            i--
        }
    }
    return arrayBombe;
}
console.log(nBombe(16));

// Funzione
// creo una funzione per selezionare le difficoltà
function difficulty () {
    const select = document.getElementById("difficolta").value;
    return select;
}

// creo una funzione per creare e stampare le celle
function gridCells (cellX, cellY) {
    const cells = cellX * cellY;

    const bombe = nBombe(cells);

    gridContainer.style.width = `calc(var(--size-cell) * ${cellX})`;

    gridContainer.innerHTML = "";

    for(let i = 1; i <= cells; i++) {

        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridContainer.append(cell);

        cell.innerText = `${i}`;

        onClickEvents(cell,bombe);
    }
    console.log(cells);
}

let punteggio = 0;
let gameOver = false;

// creo una funzione per il click sulle celle
function onClickEvents(cell, bombe) {

    cell.addEventListener("click", function(){

        // creo una costante con l'indice per poi confrontarla con le bombe
        const indiceCella = parseInt(this.innerText);

        this.classList.add("clicked");

        punteggio++;
        console.log(punteggio);

        if (bombe.includes(indiceCella)) {
            this.classList.remove("clicked");
            this.classList.add("bombs");
            gameOver = true;
            punteggio --;

            alert(`Hai perso il tuo punteggio è: ${punteggio}`);
        }

        console.log(parseInt(this.innerText));
    });
}
// Creo una variabile per recuperare il button dall'html
const btnPlay = document.getElementById("btn-play");

// genero un evento click sul button in base alla seleziona della select cambia anche il campo da gioco
btnPlay.addEventListener("click", function() {

    if(difficulty() == "1") {
        gridCells(10,10);

    }else if (difficulty() == "2") {
        gridCells(9,9);

    }else if (difficulty() == "3") {

        gridCells(7,7);
    }
});





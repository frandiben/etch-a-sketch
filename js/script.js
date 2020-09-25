// Selezione elementi: canvas | shake 
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 20;

// impostazione canvas
const {width, height} = canvas;
// equivale a 
//const width = canvas.width;
//const height = canvas.height;

/////creazione numeri casuali per il punto x,y iniziale
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);


ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue=0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); //inizio disegno
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

// funzionalità: disegno | shake | gestione frecce
function draw({key}){
     ctx.strokeStyle = `hsl(hue, 100%, 50%)`;
     ctx.beginPath();
     ctx.moveTo(x,y);
     switch (key) {
          case 'ArrowUp':
              y -= MOVE_AMOUNT;
              break;
          case 'ArrowRight':
              x += MOVE_AMOUNT;
              break;
          case 'ArrowDown':
              y += MOVE_AMOUNT;
              break;
          case 'ArrowLeft':
              x -= MOVE_AMOUNT;
              break;
          default:
              break;
      }
      ctx.lineTo(x, y);
      ctx.stroke();
}


function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(
        'animationend',
        function () {
            console.log('Done the shake!');
            canvas.classList.remove('shake');
        }, {
            once: true
        }
    );
}

function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault(); //altrimenti la pressione dei tasti fa scorrere la pagina verso il basso
        draw({
            key: e.key
        });
    }

}

// listener 
window.addEventListener('keydown',handleKey);
shakebutton.addEventListener('click', clearCanvas);

class Snake {
    constructor(x, y, color) {
        this.coordinates = new Array({ x: x, y: y, color: color })
        this.score = 0
    }
    moreBody(x, y, color) {
        this.coordinates.unshift({ x: x, y: y, color: color })

    }
    moreBody2(x, y, color) {
        this.coordinates.unshift({ x: x, y: y, color: color })
    }
    drawBody() {
        this.coordinates.forEach(element => {
            ctx.fillStyle = element.color
            ctx.fillRect(element.x, element.y, width_snake, height_snake);
        });
    }
}
class Apple {
    constructor(x, y, color = color_apple) {
        this.coordinates = new Array({ x: x, y: y, color: color })
    }
    moreBody(x, y, color = color_apple) {
        this.coordinates.push({ x: x, y: y, color: color })
    }
    drawBody() {
        this.coordinates.forEach(element => {
            ctx.fillStyle = element.color
            ctx.fillRect(element.x, element.y, width_snake, height_snake);
        });
    }
    appleComida(snake){
        for (let i = 0; i < this.coordinates.length; i++) {
            if(snake.coordinates[0].x == this.coordinates[i].x &&
                snake.coordinates[0].y == this.coordinates[i].y){
                    snake.score ++
                    this.coordinates[i] = 0
                    //alert('d')
                    score.innerHTML = snake.score
                    apples.moreBody(aleatorio(0, parseInt(width / width_snake)) * width_snake, aleatorio(0, parseInt(height / height_snake)) * height_snake)
                }
            
        }
    }

}

const canvas = document.getElementById('canvas_snake');
const ctx = canvas.getContext('2d');

const score = document.getElementById('puntaje');

var start = false//variable para saber si el juego a comensado
const time = 200;
const color = 'black'
color_apple = 'red'

var direction = { 'N': 'Norte', S: 'Sur', E: 'Este', 'O': 'Oeste' }
var direction_snake = direction.E;
var keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    PAUSE_START: 32,
    ENTER: 13
};

var width = canvas.clientWidth;
var height = canvas.clientHeight;

const width_snake = 20;
const height_snake = 20;

var div =   (width / width_snake)



//var cuerpo_cordenadas = [{ x: 120, y: 120 }, { x: 120 - 15, y: 120 }, { x: 120 - 15 - 15, y: 120 }]


var ultima_tecla_precionada

if (ctx) {
    //console.log(ctx)
    var snake_1 = new Snake(120, 120, color);
    snake_1.moreBody(120 + width_snake, 120, color);
    snake_1.moreBody(120 + width_snake * 2, 120, color)

    var apples = new Apple(snake_1.coordinates[0].x + (width_snake * 7), snake_1.coordinates[0].y, "red")

    //snake_1.coordinates.forEach(e => console.log(e))
    document.addEventListener("keydown", teclaPrecionada);//es precionado una tecla

} else {
    const error = new Error('error al cargar el canvas')
    console.log(error)
}


function teclaPrecionada(event) {

    ultima_tecla_precionada = event.keyCode

    switch (ultima_tecla_precionada) {
        case keys.UP:
            direction_snake = direction.N
            break;
        case keys.DOWN:
            direction_snake = direction.S
            break;
        case keys.LEFT:
            direction_snake = direction.O
            break;
        case keys.RIGHT:
            direction_snake = direction.E
            break;
        case keys.PAUSE_START:
            start = !start
            //console.log('start')
            drawFullSnake()
            break;

        default:
            break;
    }
    //console.log(ultima_tecla_precionada)

}

function drawFullSnake() {
    if (start) {
        ctx.clearRect(0, 0, width, height)
        dibujarFondo()
        apples.drawBody()
        setTimeout(drawFullSnake, time);
        switch (direction_snake) {
            case 'Este':
                //console.log(snake_1.coordinates)
                snake_1.moreBody2(snake_1.coordinates[0].x + width_snake, snake_1.coordinates[0].y, snake_1.coordinates[0].color)
                // snake_1.coordinates[0]
                apples.appleComida(snake_1)
                //moverse(snake_1.coordinates, width_snake, 0, )
                break;
            case 'Norte':
                snake_1.moreBody2(snake_1.coordinates[0].x, snake_1.coordinates[0].y - height_snake, snake_1.coordinates[0].color)
                //moverse(snake_1.coordinates, 0 ,  height_snake)
                break;
            case 'Oeste':
                snake_1.moreBody2(snake_1.coordinates[0].x - width_snake, snake_1.coordinates[0].y, snake_1.coordinates[0].color)
                //moverse(snake_1.coordinates, - width_snake, 0)
                break;
            case 'Sur':
                snake_1.moreBody2(snake_1.coordinates[0].x, snake_1.coordinates[0].y + height_snake, snake_1.coordinates[0].color)
                //moverse(snake_1.coordinates, 0,  - height_snake)
                break;
            default:

                break;

        }

        
        //moverse(snake_1.coordinates)
        snake_1.coordinates.pop()
        snake_1.drawBody();
        //snake_1.coordinates.forEach(e => console.log(e))
    }

}

// function moverse(array) {
//     //array.reverse()
//     //array.pop()
//     for (let i = 0; i < array.length; i++) {
//         if (i == array.length - 1) {
//             console.log('58')
//             array.pop()
//             break;
//         }
        
//         const element = (array.length - 1) - i;
//         array[element] =  array[element - 1 ];
//         array[i] = array[i + 1]
//         // console.log( 'hola ', array[element], array[element - 1 ] )
//     }
//     array.reverse()
// }


function aleatorio(inferior, superior) {
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}

function colorAleatorio() {

    hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
    var color_aleatorio = "#";
    for (i = 0; i < 6; i++) {
        posarray = aleatorio(0, hexadecimal.length)
        color_aleatorio += hexadecimal[posarray]
    }
    return color_aleatorio
}

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo = ctx, grosor = 3) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = grosor;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

function dibujarCuadricula(cada_cuanto, canvas, lienzo = ctx, color = '#000', grosor = 1) {
    const width = canvas.width;
    const height = canvas.height;
    for (let i = 0; i < canvas.width / cada_cuanto + 1; i++) {
        dibujarLinea(color, cada_cuanto * i, 0, cada_cuanto * i, height, lienzo, grosor);
    }
    for (let i = 0; i < canvas.height / cada_cuanto + 1; i++) {
        dibujarLinea(color, 0, cada_cuanto * i, width, cada_cuanto * i, lienzo, grosor);
    }

}

function dibujarFondo() {
    dibujarCuadricula(width_snake, canvas)
    dibujarCuadricula(width_snake * 5, canvas)
    dibujarCuadricula(width_snake * 5, canvas)
}
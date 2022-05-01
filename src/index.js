const canvas = document.getElementById('canvas_snake');
const ctx = canvas.getContext('2d');

const puntaje = document.getElementById('puntaje');

var inicio = false
var puntage = 0
const time = 100;
var direction = { 'N': 'Norte', S: 'Sur', E: 'Este', 'O': 'Oeste' }
var star = false;
var direccion = direction.E;
var keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    PAUSE_START: 32,
    ENTER: 13
};

var ancho = canvas.clientWidth;
var largo = canvas.clientHeight;
var grosor = 15;

var cuerpo_cordenadas = [{ x: 120, y: 120 }, { x: 120 - 15, y: 120 }, { x: 120 - 15 - 15, y: 120 }]
var manzanas_cordenadas = []
var ultima_tecla_precionada

if (ctx) {
    //console.log(ctx)
    window.addEventListener("keydown", teclaPrecionada);//es precionado una tecla


} else {
    const error = new Error('error al cargar el canvas')
    console.log(error)
}

function dibujarCuadrados(x, y, ancho, largo, color = '#000000', linzo = ctx) {
    linzo.fillStyle = color
    linzo.fillRect(x, y, ancho, largo);
}

function teclaPrecionada(event) {
    if (!star && event.keyCode == keys.ENTER) {
        //dibujarCuadrados(cuerpo_cordenadas[0].x, cuerpo_cordenadas[0].y, grosor, grosor );
        dibujarTodoElCuerpo(cuerpo_cordenadas);
        if (!inicio) {
            dibujarManzana(cuerpo_cordenadas)
            inicio = true
        }

        star = true
        setTimeout(drawFullSnake, time)

    } else if (star && event.keyCode == keys.PAUSE_START) {//pause
        star = false
    } else if (!star && event.keyCode == keys.PAUSE_START) {//despause
        star = true
        setTimeout(drawFullSnake, time)

    }
    //console.log(event)

    ultima_tecla_precionada = event.keyCode
    switch (ultima_tecla_precionada) {
        case keys.UP:
            direccion = direction.N
            break;
        case keys.DOWN:
            direccion = direction.S
            break;
        case keys.LEFT:
            direccion = direction.O
            break;
        case keys.RIGHT:
            direccion = direction.E
            break;

        default:
            break;
    }
    // console.log(ultima_tecla_precionada)

    // var
}

function drawFullSnake() {
    if (star) {

        setTimeout(drawFullSnake, time)
        switch (direccion) {
            case 'Este':
                cuerpo_cordenadas.unshift({ x: cuerpo_cordenadas[0].x + grosor, y: cuerpo_cordenadas[0].y })
                dibujarCabesa()

                //console.log(cuerpo_cordenadas)
                break;
            case 'Norte':
                cuerpo_cordenadas.unshift({ x: cuerpo_cordenadas[0].x, y: cuerpo_cordenadas[0].y - grosor })
                dibujarCabesa()

                //console.log(cuerpo_cordenadas)
                break;
            case 'Oeste':
                cuerpo_cordenadas.unshift({ x: cuerpo_cordenadas[0].x - grosor, y: cuerpo_cordenadas[0].y })
                dibujarCabesa()

                //console.log(cuerpo_cordenadas)
                break;
            case 'Sur':
                cuerpo_cordenadas.unshift({ x: cuerpo_cordenadas[0].x, y: cuerpo_cordenadas[0].y + grosor })
                dibujarCabesa()

                //console.log(cuerpo_cordenadas)
                break;
            default:

                break;
        }
        // ctx.clearRect(0, 0, ancho, largo)
        // dibujarFondo()
        // dibujarTodoElCuerpo(cuerpo_cordenadas)
        // dibujarManzana(manzanas_cordenadas)
        // dibujarCabesa()


    }

}

function dibujarCabesa() {//dibujaremos al cabesa y borraremos la cola
    dibujarCuadrados(cuerpo_cordenadas[0].x, cuerpo_cordenadas[0].y, grosor, grosor, colorAleatorio());
    ctx.clearRect(cuerpo_cordenadas[cuerpo_cordenadas.length - 1].x, cuerpo_cordenadas[cuerpo_cordenadas.length - 1].y, grosor, grosor);
    manzanaComida()
    puntaje.innerHTML = `puntaje: ${puntage}`

}

function manzanaComida() {
    var comido = false
    if (manzanas_cordenadas[0].x == cuerpo_cordenadas[0].x &&
        manzanas_cordenadas[0].y == cuerpo_cordenadas[0].y) {
        puntage++
        comido = true
    }
    // manzanas_cordenadas.forEach( element => {
    //     if(element.x == cuerpo_cordenadas[0].x &&
    //         element.y == cuerpo_cordenadas[0].y){
    //         puntage ++

    //         //alert('nuevo puntaje' + puntage)
    //         //dibujarManzana(cuerpo_cordenadas)
    //         //element = {...manzanas_cordenadas}
    //         //dibujarManzana(cuerpo_cordenadas)
    //         return comido = true
    //     }
    // })
    if (!comido) {
        cuerpo_cordenadas.pop()
    } else {
        manzanas_cordenadas[0] = 0
        dibujarManzana(cuerpo_cordenadas)
    }
    return comido

}

function dibujarTodoElCuerpo(array) {

    array.forEach(element => {
        dibujarCuadrados(element.x, element.y, grosor, grosor, colorAleatorio())
    });


}

function dibujarManzana(array) {//el array es el array con los puntos del curpo, para saber donde no poner manzanas
    if (manzanaComida()) {


        const x_aleatorio = aleatorio(0, parseInt(ancho / grosor)) * 15;
        //aleatorio(0, parseInt(ancho/ grosor)) * 15
        const y_aleatorio = aleatorio(0, parseInt(ancho / grosor)) * 15

        array.forEach(element => {
            if (element.x == x_aleatorio &&
                element.y == y_aleatorio) {
                alert('lkdjkj')
                return dibujarManzana(array);

            }
            else if (element.x !== x_aleatorio &&
                element.y !== y_aleatorio) {
                ctx.clearRect(0, 0, ancho, largo)//borramos todo
                dibujarFondo();
                dibujarTodoElCuerpo(cuerpo_cordenadas)//dibujamos la cuadriculo y el cuerpo
                dibujarCuadrados(x_aleatorio, y_aleatorio, grosor, grosor, 'red')//dibujamos las manzanas
            }

        });
        manzanas_cordenadas.unshift({ x: x_aleatorio, y: y_aleatorio })
        console.log(`Mansana ${manzanas_cordenadas.length}`, manzanas_cordenadas)
    }

}


function aleatorio(inferior, superior) {
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}

function colorAleatorio() {

    hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
    color_aleatorio = "#";
    for (i = 0; i < 6; i++) {
        posarray = aleatorio(0, hexadecimal.length)
        color_aleatorio += hexadecimal[posarray]
    }
    return 'black'
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
    dibujarCuadricula(grosor, canvas)
    dibujarCuadricula(grosor * 5, canvas)
    dibujarCuadricula(grosor * 5, canvas)
}
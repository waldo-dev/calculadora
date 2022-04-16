// Defino las variables
const botonNumeros = document.getElementsByName('number');
const botonOperacion = document.getElementsByName('operator');
const botonIgual = document.getElementById('resultado');
const botonDelete = document.getElementById('borrar');
let result = document.getElementById('display');
let opeActual = '';
let opeAnterior = '';
let operacion = null;

function calcular(){
    var calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    // verifico que las constantes sean numeros
    if(isNaN(anterior) || isNaN(actual)) return;
    switch(operacion){
        case '+': calculo = anterior + actual;
        break;
        case '-': calculo = anterior - actual;
        break;
        case 'x': calculo = anterior * actual;
        break;
        case '÷': calculo = anterior / actual;
        break;
        default: return;
    }
    opeActual = calculo; 
    operacion = undefined;
    opeAnterior = '';
};

// op es la operacion ingresada
function selectOperacion(op) {
    // verifico si la operacion actual tiene algo ingresado 
    if(opeActual === '') return;
    // si la anterior tiene algo llamamos a la funcion calcular
    if (opeAnterior !== '') {
        calcular();
    }
    // La variable operacion ahora toma un valor de string para poder mostrarse en la pantalla
    operacion = op.toString();
    // operacion anterior tomara el valor de operacion actual
    opeAnterior = opeActual;
    // operacion actual volvera a tener nada
    opeActual = '';  
};
 
// num es el numero ingresado 
function agregarNumero(num){
    // transformo los valores actuales a string para poder mostrarlos en el input
    opeActual = opeActual.toString() + num.toString();
    // Escribo en la pantalla con la funcion actualizar display
    actualizarDisplay();
};

// la funcion eliminar solo retorna a las variables a su valor original
function eliminar(){
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
};

// el valor del input es la operacion actual
function actualizarDisplay(){
    result.value = opeActual
};

// Botones de lus numeros
//forEach recorre el arreglo botonNumeros
botonNumeros.forEach(function(boton){
    boton.addEventListener('click', function(){
        agregarNumero(boton.innerText);
        console.log(boton.innerText)
    })
});

// Botones de operaciones
botonOperacion.forEach(function(boton){
    // evento para tomar click y la operacion se agrega a traves de una funcion
    boton.addEventListener('click', function(){
        selectOperacion(boton.innerText);
    })
});



// boton de igual
botonIgual.addEventListener('click', function(){
    // Llamo a la funcion calcular
    calcular();
    //Llamo a la funcion actualizar display
    actualizarDisplay();
    
});

// Boton para eliminar
botonDelete.addEventListener('click', function(){
    // llamo a la funcion eliminar
    eliminar();
    // Llamo a la funcion para actualizar la pantalla
    actualizarDisplay();
});

// siempre que se cargue la pagina se borrara lo que haya en la pantalla
eliminar();
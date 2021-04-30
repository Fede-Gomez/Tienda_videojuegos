let ordenCompra = new Array();
let filtrosAplicados = new Array();
let juegosEnCarrito = new Array();
let listadoGenero = new Array();
var ordenPrecioElegido;
var generoElegido;


function cargarInicioSitio(){
    cargarHeader();
    cargarBody();
}

function cargarHeader(){
    cargarLista();
    cargarCarrito();
}

function cargarBody(){
    cargarFiltros();
    cargarProductosSinFiltro();
}


function limpiarListaJuegos(){
    let listaLimpiar = document.getElementById("bodyCatalogo");
    let catalogo = document.getElementById("catalogo");
    listaLimpiar.parentNode.removeChild(listaLimpiar);
}

function cargarLista() {
    let listaHecha = JSON.parse(localStorage.getItem("listaJuegosPedido"));
    localStorage.clear();
        
    if(listaHecha!=null){
        for(const a of listaHecha){
            ordenCompra.push(new videojuego(a.id,a.nombre,a.precio,a.genero,a.rutaImg,a.cantidad));
            generarStructOrdenCompra(a.id);
        }
    }
}

$(document).ready(function(){
    $("button").prop("disables",true);
});

$(document).on("load",function(){
    $("button").prop("disables",false);
});
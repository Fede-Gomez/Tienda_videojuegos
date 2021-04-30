function cargarCarrito(){
    
    generarStructCarrito();
    
    let total = 0;
    if(ordenCompra.length != 0 ){
        for(let a of ordenCompra){
            total += a.precio * a.cantidad;
        }
        crearBotonFinalizarCompra();
        numTotal.innerHTML += total;
    }else{
        numTotal.innerHTML += total;
        generarNuevaOrdenCompra();
    }
    numProductos.innerHTML = ordenCompra.length;
    botonesCarrito();

}

function agregarCarrito(id){
        if(ordenCompra.find(idJuego=>idJuego.id==id)){
        }
        else{
            ordenCompra.push(listaVideoJuegos.find(idJuego=>idJuego.id==id));
            generarStructOrdenCompra(id);
            let btnFinalizarCompra = document.getElementById("finalizarCompra");
            if(btnFinalizarCompra == null){
                crearBotonFinalizarCompra();
            }
        }
        $("#msjItemAgregadoAlCarrito").fadeIn("slow",function(){
            msjAgregarAlCarrito(ordenCompra.find(idJuego=>idJuego.id==id));
        }).delay("slow").fadeOut("slow");
//para que no quede nada escrito si agrega otra cosa al carrito        
        $("#msjItemAgregadoAlCarrito").html("");
        carritoItems();
        sumarDelCarrito(id);
        actualizarStorage();
}
 
function sumarDelCarrito(id){
    let juego = ordenCompra.find(idJuego=>idJuego.id==id);
    juego.vender();
    actuaCantDeJuego(juego,"suma");
}

function restarDelCarrito(id){
    let juego = ordenCompra.find(idJuego=>idJuego.id==id);
    juego.restarUnoCarrito();
    if(juego.cantidad == 0){
        quitarDelCarrito(juego.id);
        carritoItems();
        actualizarStorage();
    }
        actuaCantDeJuego(juego,"resta");
}

function actuaCantDeJuego(juego,operacion){
    $(`#cant${juego.id}`).html(`Cantidad: ${juego.cantidad}`);
    actualizarStorage();
    actualizarCarritoTotalPagar(juego.id,operacion);
}

function quitarDelCarrito(id){
//busco el objeto juego del id    
    let juego = ordenCompra.find(idJuego => idJuego.id==id);
// busco el indice donde se encuentra el juego que busque
    let indice = ordenCompra.indexOf(juego);
// borrando el juego de la orden de compra
    ordenCompra.splice(indice,1);
    actualizarStorage();
    quitarDeLaLista(id);
}

function quitarDeLaLista(id){
    $(`#item${id}`).remove(`#item${id}`);
    let lista = document.getElementById("listaOrdenCompra");

    if(!lista.children.length){
        $("#finalizarCompra").remove("#finalizarCompra");
        $("#carritoProductos").remove("#carritoProductos");
        $("#carritoTotal").remove("#carritoTotal");
        $("#verMasCarrito").remove("#verMasCarrito");
        cargarCarrito();
    }
}

function actualizarStorage(){
    localStorage.clear();
    const juegoJson = JSON.stringify(ordenCompra);
    localStorage.setItem("listaJuegosPedido",juegoJson);
}

function carritoItems(){
    let divCarritoProducto = document.getElementById("carritoProductos");
    let numProductos = document.getElementById("numProductos"); 
    numProductos.remove(numProductos);
    var spanItems = document.createElement("span");
    spanItems.setAttribute("id","numProductos");
    spanItems.innerHTML = ordenCompra.length;
    divCarritoProducto.append(spanItems);
}
    
    function actualizarCarritoTotalPagar(id,operacion){
            
        let divCarritoProductoTotal = document.getElementById("carritoTotal")
        let numTotal = document.getElementById("numTotal");
        
        let total = parseFloat(numTotal.innerHTML);
        numTotal.remove(numTotal);

        let spanTotal = document.createElement("span");
        spanTotal.setAttribute("id","numTotal");

        if(operacion == "suma")
            total += listaVideoJuegos.find(idJuego=>idJuego.id==id).precio; 
        else
            total -= listaVideoJuegos.find(idJuego=>idJuego.id==id).precio;

            if(total <= 0)
                total = 0;

        spanTotal.innerHTML = total;

        divCarritoProductoTotal.append(spanTotal);
    }

    function botonesCarrito(){
        $("#btnAbrirCarrito").on("click", function () {
            $("#btnAbrirCarrito").hide();
            $("#btnCerrarCarrito").show();
            $("#ordenCompra").fadeIn();
        });
        $("#btnCerrarCarrito").on("click", function () {
            $("#btnAbrirCarrito").show();
            $("#btnCerrarCarrito").hide();
            $("#ordenCompra").fadeOut();
        });
    }

    function generarStructOrdenCompra(id) {
        let juego = ordenCompra.find(idJuego=>idJuego.id==id);
        let carritoVacio = document.getElementById("carritoVacio");
        if(carritoVacio!=null){
            carritoVacio.parentNode.removeChild(carritoVacio);
        }
        $("#listaOrdenCompra").append( `<li class="li" id="item${juego.id}">
                                            <img class="imgOrdenCompra" width="100px" height="100px" src="${juego.rutaImg}"></img>
                                            <div>
                                                <p class="nomOrdenCompra" id="nom${juego.id}">Nombre: ${juego.nombre}</p>
                                                <p class="cantidad" id="cant${juego.id}">Cantidad: ${juego.cantidad}</p>
                                            </div>
                                            <button id="sumar${juego.id}" class="btn btn-success">+</button>
                                            <button id="restar${juego.id}" class="btn btn-warning">-</button>
                                            <button id="quitar${juego.id}" class="btn btn-danger">x</button>
                                        </li>
                                    `);    
        $(`#quitar${juego.id}`).on("click",function(){
            quitarDelCarrito(`${juego.id}`);
        });
        $(`#restar${juego.id}`).on("click",function(){
            restarDelCarrito(`${juego.id}`);
        });
        $(`#sumar${juego.id}`).on("click",function(){
            sumarDelCarrito(`${juego.id}`);
        });
        
    }

    function msjAgregarAlCarrito(juego){
        $("#msjItemAgregadoAlCarrito").html(`   <p>${juego.nombre}</p>
                                                <p>${juego.precio}</p>
                                            `);
    }

    function crearBotonFinalizarCompra(){
        let nuevoBtnFinalizarCompra = document.createElement("button");
        nuevoBtnFinalizarCompra.setAttribute("id","finalizarCompra");
        let link = document.createElement("a");
        link.setAttribute("href","ultimoPasoCompra.html");
        link.setAttribute("class","btn btn-link");
        link.innerHTML = "Finalizar Compra";
        nuevoBtnFinalizarCompra.appendChild(link);
        let listaOrdenCompra = document.getElementById("ordenCompra");
        listaOrdenCompra.appendChild(nuevoBtnFinalizarCompra);
    }

    function generarStructCarrito(){
        let carrito = document.getElementById("carrito");
        
        // parte de cant de productos
        let carritoProductos = document.createElement("div");
        let spanProductos = document.createElement("span");
        let spanNumProductos = document.createElement("span");
        spanProductos.innerHTML = "Productos: ";
        spanNumProductos.setAttribute("id","numProductos");
        carritoProductos.setAttribute("id","carritoProductos");
        
        //parte de total de productos
        let carritoTotal = document.createElement("div");
        carritoTotal.setAttribute("id","carritoTotal");
        let spanTotal = document.createElement("span");
        spanTotal.innerHTML = "Total: ";
        let spanNumTotal = document.createElement("span");
        spanNumTotal.setAttribute("id","numTotal");

        //parte de ver carrito
        let verMasCarrito = document.createElement("div");
        verMasCarrito.setAttribute("id","verMasCarrito");
        let btnAbrirCarrito = document.createElement("button");
        btnAbrirCarrito.setAttribute("id","btnAbrirCarrito");
        btnAbrirCarrito.setAttribute("class","btn btn-primary btn-sm");
        btnAbrirCarrito.innerHTML = "Ver carrito";

        let btnCerrarCarrito = document.createElement("button");
        btnCerrarCarrito.setAttribute("id","btnCerrarCarrito");
        btnCerrarCarrito.setAttribute("class","btn btn-primary btn-sm");
        btnCerrarCarrito.innerHTML = "Cerrar carrito";
        
        // agregando todo
        carrito.appendChild(carritoProductos);
        carrito.appendChild(carritoTotal);
        carritoProductos.appendChild(spanProductos);
        carritoProductos.appendChild(spanNumProductos);
        carritoTotal.appendChild(spanTotal);
        carritoTotal.appendChild(spanNumTotal);
        carrito.appendChild(verMasCarrito);
        verMasCarrito.appendChild(btnAbrirCarrito);
        verMasCarrito.appendChild(btnCerrarCarrito);
    }

    function generarNuevaOrdenCompra(){
        let ordenCompra = document.getElementById("ordenCompra");
        let nuevoCarritoVacio = document.createElement("p");
        nuevoCarritoVacio.innerHTML = "Agrega un producto a la lista";
        nuevoCarritoVacio.setAttribute("id","carritoVacio");
        ordenCompra.appendChild(nuevoCarritoVacio);

    }
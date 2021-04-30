function cargarProductosSinFiltro(){
    generarContenedorDeCards();
    for(const juego of listaVideoJuegos){
        generarCardJuego(juego);
    }
}

function cargarProductosConFiltro(){


    const listaVideojuegosFiltrado = listaVideoJuegos.filter(genero => generoElegido == genero.genero);
    filtrosAplicados = listaVideojuegosFiltrado;    

// cargar el array sino se aplico ningun filtro en el genero    
    if(filtrosAplicados == ""){
        for(const a of listaVideoJuegos){
            filtrosAplicados.push(a);
        }
    }

    switch(ordenPrecioElegido){
        case "mayor":   filtrosAplicados.sort((a,b) => b.precio - a.precio);
                            break;
        case "menor":   filtrosAplicados.sort((a,b) => a.precio - b.precio);
                        break;                             
        default: break;                
    }

    generarContenedorDeCards();
        for(const juego of listaVideojuegosFiltrado){
            generarCardJuego(juego);
        }
}

function generarContenedorDeCards(){
    let catalogo = document.getElementById("catalogo");
    let cajonGrandeCard = document.createElement("div");
    cajonGrandeCard.setAttribute("id","bodyCatalogo");
    cajonGrandeCard.setAttribute("class","row row-cols-1 row-cols-md-3");
    catalogo.appendChild(cajonGrandeCard);    
}

function generarCardJuego(juego){
    let cajonMedianoCard = document.createElement("div");
    let cajonCard = document.createElement("div");
    let imgCard = document.createElement("img");
    let bodyCard = document.createElement("div");
    let tituloCardBody = document.createElement("h5");
    let precioCardBody = document.createElement("p");
    let botonAgregarCardBody = document.createElement("button");
    cajonGrandeCard = document.getElementById("bodyCatalogo");

    cajonGrandeCard.appendChild(cajonMedianoCard);
    cajonMedianoCard.appendChild(cajonCard);
    cajonCard.appendChild(imgCard);
    cajonCard.appendChild(bodyCard);
    bodyCard.appendChild(tituloCardBody);
    bodyCard.appendChild(precioCardBody);
    bodyCard.appendChild(botonAgregarCardBody);

    cajonMedianoCard.setAttribute("class","col mb-4");
    cajonCard.setAttribute("class","card h-100");
    bodyCard.setAttribute("class","card-body");
    tituloCardBody.setAttribute("class","card-title");
    precioCardBody.setAttribute("class","card-text");
    imgCard.setAttribute("src",`${juego.rutaImg}`);
    imgCard.setAttribute("class","card-img-top");
    botonAgregarCardBody.setAttribute("class","btn btn-primary btn-sm");
    
    botonAgregarCardBody.innerHTML = "Agregar al carrito";
    tituloCardBody.innerHTML = `${juego.nombre}`;
    precioCardBody.innerHTML = `$${juego.precio}`; 

    botonAgregarCardBody.addEventListener("click",function(){agregarCarrito(`${juego.id}`)});
}
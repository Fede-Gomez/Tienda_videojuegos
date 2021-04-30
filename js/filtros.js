function cargarFiltros(){
    filtrosGenero();
    filtrosRangoPrecio();
}


function filtrosRangoPrecio(){

    let filtros = document.getElementById("filtros");
    
// creando etiquetas    
    let filtrosOrden = document.createElement("div");
    let listaOrdenPrecio = document.createElement("ul");
    let filtrosMayorPrecio = document.createElement("li");
    let filtrosMenorPrecio = document.createElement("li");
    let botonFiltrar = document.createElement("button");
    let tituloFiltroOrden = document.createElement("h5");
    let cajonLiMayor = document.createElement("div");
    let cajonLiMenor = document.createElement("div");
    let botonInputMenor = document.createElement("input");
    let botonInputMayor = document.createElement("input");

// agregando al html
    filtrosOrden.appendChild(tituloFiltroOrden);
    filtros.appendChild(filtrosOrden);
    filtrosOrden.appendChild(listaOrdenPrecio);
    listaOrdenPrecio.appendChild(cajonLiMayor);
    listaOrdenPrecio.appendChild(cajonLiMenor);
    cajonLiMayor.appendChild(botonInputMayor);
    cajonLiMayor.appendChild(filtrosMayorPrecio);
    cajonLiMenor.appendChild(botonInputMenor);
    cajonLiMenor.appendChild(filtrosMenorPrecio);
    filtrosOrden.appendChild(botonFiltrar);

// div y class de etiqetas    
    filtrosOrden.setAttribute("id","filtrosOrden");
    tituloFiltroOrden.innerHTML= "Ordenar";
    botonFiltrar.innerHTML = "Ordenar";
    botonFiltrar.setAttribute("id","btnFiltrarPrecio");
    botonFiltrar.setAttribute("class","btn btn-primary btn-sm");
    botonInputMenor.setAttribute("type","radio");
    botonInputMayor.setAttribute("type","radio");
    botonInputMenor.setAttribute("name","orden");
    botonInputMayor.setAttribute("name","orden");
    botonInputMenor.setAttribute("value","menor");
    botonInputMayor.setAttribute("value","mayor");
    filtrosMayorPrecio.setAttribute("class","li");
    filtrosMenorPrecio.setAttribute("class","li");

//  escribiendo en html
    filtrosMayorPrecio.innerHTML = "Mayor precio";
    filtrosMenorPrecio.innerHTML = "Menor precio";

//eventos de botones    
    let ordenElegido = document.getElementsByName("orden");
    $("#btnFiltrarPrecio").click( function(){
        for(let a of ordenElegido){
            if(a.checked == true){
                ordenPrecioElegido = a.value;
                limpiarListaJuegos();
                cargarProductosConFiltro();
            }
        }
    })
}

function filtrosGenero(){
// buscar etiqetas en html    
    let filtros = document.getElementById("filtros");

// creando etiquetas    
    let filtrosGenero = document.createElement("div");
    let filtrosTituloGenero = document.createElement("h5");
    let ulListaGeneros = document.createElement("ul");
    let botonFiltrar = document.createElement("button");

// agregando al html
    filtros.appendChild(filtrosGenero);
    filtrosGenero.appendChild(filtrosTituloGenero);
    filtrosGenero.appendChild(ulListaGeneros);

// div y class de etiqetas    
    filtrosGenero.setAttribute("id","filtrosGenero");

// contenido de etiquetas
    filtrosTituloGenero.innerHTML = "Genero";
    
//for para obtener todos los generos de todos los juegos     
    for(const juego of listaVideoJuegos){
        if(!listadoGenero.find(a => a == `${juego.genero}`))
            listadoGenero.push(`${juego.genero}`);
    }
//for para agregar la lista de generos que saque antes al html    
    for(const a of listadoGenero){
//crear elementos        
        
        let liGenero = document.createElement("li");
        let divGenero = document.createElement("div");
        let botonSeleccion = document.createElement("input");

// ponerle las clases necesarias
        botonSeleccion.setAttribute("type","radio");
        botonSeleccion.setAttribute("name","filtrosGenero");
        botonSeleccion.setAttribute("value",a);
        liGenero.setAttribute("id","genero-"+a);
        liGenero.setAttribute("class","li");
        botonFiltrar.setAttribute("class","btn btn-primary btn-sm");
        botonFiltrar.setAttribute("id","filtrarPorGenero");    
//agregar contenido a la etiqeta
        liGenero.innerHTML = a;
        botonFiltrar.innerHTML = "Buscar";

//agregar las etiqetas al html
        divGenero.appendChild(botonSeleccion);
        divGenero.appendChild(liGenero);
        ulListaGeneros.appendChild(divGenero);
        divGenero.appendChild(liGenero);
    }
//eventos de botones    
    let inputsGenero = document.getElementsByName("filtrosGenero");
    filtrosGenero.appendChild(botonFiltrar);
    $("#filtrarPorGenero").on("click", function(){
        for(let a of inputsGenero){
            if(a.checked == true){
                generoElegido = a.value;
                limpiarListaJuegos();
                cargarProductosConFiltro();
            }
        }
    });
}


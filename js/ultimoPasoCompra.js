let ordenCompra = new Array();
let totalAPagar = 0;
listaOrdenDeCompra();
datosComprador();
envioDeDatos();

function listaOrdenDeCompra(){
    let listaHecha = JSON.parse(localStorage.getItem("listaJuegosPedido"));
    localStorage.clear();
    for(const a of listaHecha){
        ordenCompra.push(new videojuego(a.id,a.nombre,a.precio,a.genero,a.rutaImg,a.cantidad));
        totalAPagar += a.totalPagar;
    }
        generarStructListaCompra();
}

function generarStructListaCompra(){

    let container = document.createElement("div");

    for(let a of ordenCompra){
        let containerJuego = document.createElement("div");
        containerJuego.setAttribute("class","productoLista");

        let imgJuego = document.createElement("img");
        imgJuego.setAttribute("src",`${a.rutaImg}`);
        imgJuego.setAttribute("width","200px");
        imgJuego.setAttribute("height","100px");

        let nombreJuego = document.createElement("p");
        let precioJuego = document.createElement("p");
        nombreJuego.innerHTML = `${a.nombre}`;
        precioJuego.innerHTML = `${a.precio}`;
        
        containerJuego.appendChild(imgJuego);
        containerJuego.appendChild(nombreJuego);
        containerJuego.appendChild(precioJuego);
        container.appendChild(containerJuego);    
    }

    let listaOrdenDeCompra = document.getElementById("listaOrdenCompra");

    listaOrdenDeCompra.appendChild(container);
  
}

function datosComprador(){
    boxCuotas();
    envioDeDatos();
}

function boxCuotas(){
    let boxCuotas = document.getElementById("boxCuotas");
    let select = document.createElement("select");
    let opcion1 = document.createElement("option");
    let opcion3 = document.createElement("option");
    let opcion6 = document.createElement("option");
    let opcion12 = document.createElement("option");
    
    opcion1.innerHTML = "1 pago de: " + totalAPagar;
    opcion3.innerHTML = "3 pago de: " + (totalAPagar/3);
    opcion6.innerHTML = "6 pago de: " + (totalAPagar/6);
    opcion12.innerHTML = "12 pago de: " + (totalAPagar/12);

    opcion1.setAttribute("value",totalAPagar.toString());
    opcion3.setAttribute("value",(totalAPagar/3).toString());
    opcion6.setAttribute("value",(totalAPagar/6).toString());
    opcion12.setAttribute("value",(totalAPagar/12).toString());
    opcion1.setAttribute("id","op1");
    opcion3.setAttribute("id","op3");
    opcion6.setAttribute("id","op6");
    opcion12.setAttribute("id","op12");
    opcion1.setAttribute("name","cuota");
    opcion3.setAttribute("name","cuota");
    opcion6.setAttribute("name","cuota");
    opcion12.setAttribute("name","cuota");

    select.appendChild(opcion1);
    select.appendChild(opcion3);
    select.appendChild(opcion6);
    select.appendChild(opcion12);

    boxCuotas.appendChild(select);
}

function envioDeDatos(){

    let nom = document.getElementById("nombre");
    let ape = document.getElementById("apellido");
    let tel = document.getElementById("telefono");
    let mail = document.getElementById("email");
    let cuota = document.getElementsByName("cuota");
    let numTarjCred = document.getElementById("creditCardNumber");
    let nomTarjCred = document.getElementById("creditCardName");
    let cvcTarjCred = document.getElementById("creditCardCVC");
    let desTarjCred = document.getElementById("creditCardDesde");
    let hasTarjCred = document.getElementById("creditCardHasta");

    let cuotaElegida;
    for(let a of cuota){
        if(a.selected == true){
            cuotaElegida = a.value;
        }
    }
    const infoPost = {  nombre: nom.value, 
                        apellido: ape.value, 
                        telefono: tel.value,
                        email: mail.value,
                        cuota: cuotaElegida,
                        numeroTarjetaCred: numTarjCred.value,
                        nombreTarjetaCred: nomTarjCred.value,
                        cvcTarjetaCred: cvcTarjCred.value,
                        desdeTarjetaCred: desTarjCred.value,
                        hastaTarjetaCred: hasTarjCred.value
                    };

    const urlGet = "https://jsonplaceholder.typicode.com/posts";
    $("#enviar").on("click",function(){
        $.post(urlGet,infoPost,(respuesta,estado)=>{
            if(estado === "success"){
                $("body").prepend(` <div
                                        Guardado: ${respuesta.nombre};
                                    </div>`);
            }
        });

        agradecimiento();
    });
    
}

function agradecimiento (){
    let mail = document.getElementById("email");
    let cuota = document.getElementsByName("cuota");
    let cuotaElegida;
    for(let a of cuota){
        if(a.selected == true){
            cuotaElegida = a.value;
        }
    }
    $("#bodyUltimoPaso").html(  ` <h3>Muchas gracias por la compra!</h3>
                                    <p>El pago se realizo con éxito</p>
                                    <p>Corroborá las instrucciones de retiro en tu correo: <span>${mail.value}</span></p>
                                    <p>Pagaste: ${totalAPagar} en ${cuotaElegida}</p>
                                `)
}
                
class videojuego{
    constructor(id,             nombre,         precio,
                genero,         rutaImg,        cantidad){

        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.genero = genero;
        this.stock = true;
        this.venta = false;
        this.rutaImg = rutaImg;
        this.totalPagar = 0;
        this.cantidad = cantidad;
    }
    

    vender() {
        this.cantidad++;
        this.totalPagar += this.precio;
    }

    restarUnoCarrito(){
        this.cantidad--;
        this.totalPagar -= this.precio;
    }

    getNombre(){
        return this.nombre;
    }

    getCantidad(){
        return this.cantidad;
    }

    getStock(){
        return this.stock;
    }

    venderJuego(){
        this.venta = true;
    }
}

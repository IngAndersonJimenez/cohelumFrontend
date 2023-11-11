export class Aliado {

    private urlLogo: String;
    private nombre: String;

    constructor(urlLogo: String, nombre: String) {
        this.urlLogo = urlLogo;
        this.nombre = nombre;
    }

    getUrlLogo() {
        return this.urlLogo;
    }

    getNombre() {
        return this.nombre;
    }

    setUrlLogo(urlLogo: String) {
        this.urlLogo = urlLogo
    }

    setNombre(nombre: String) {
        this.nombre = nombre;
    }

}
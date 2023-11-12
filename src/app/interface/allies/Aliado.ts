export class Aliado {

    private urlLogo: string;
    private nombre: string;
    private urlPaginaWeb: string;
    private direccion: string;
    private ciudad: string;
    private telefono: string;

    constructor(urlLogo: string, nombre: string, urlPaginaWeb: string, direccion: string, ciudad: string, telefono: string) {
        this.urlLogo = urlLogo;
        this.nombre = nombre;
        this.urlPaginaWeb = urlPaginaWeb;
        this.direccion = direccion;
        this.ciudad = ciudad
        this.telefono = telefono;
    }

    getUrlLogo(): string {
        return this.urlLogo;
    }

    getNombre(): string {
        return this.nombre;
    }


    getUrlPaginaWeb(): string {
        return this.urlPaginaWeb;
    }

    getDireccion(): string {
        return this.direccion;
    }

    getCiudad(): string {
        return this.ciudad;
    }

    getTelefono(): string {
        return this.telefono;
    }


    setUrlLogo(urlLogo: string) {
        this.urlLogo = urlLogo
    }

    setNombre(nombre: string) {
        this.nombre = nombre;
    }

    setUrlPaginaWeb(urlPaginaWeb: string) {
        this.urlPaginaWeb = urlPaginaWeb
    }

    setDireccion(direccion: string) {
        this.direccion = direccion;
    }

    setCiudad(ciudad: string) {
        this.ciudad = ciudad;
    }

    setTelefono(telefono: string) {
        this.telefono = telefono;
    }

}
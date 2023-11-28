import { City } from "./City";

export class Aliado {

    private urlLogo: string;
    private nombre: string;
    private urlPaginaWeb: string;
    private direccion: string;
    private ciudad: City;
    private telefono: string;

    constructor(urlLogo: string, nombre: string, urlPaginaWeb: string, direccion: string, ciudad: City, telefono: string) {
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

    getCiudad(): City {
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

    setCiudad(ciudad: City) {
        this.ciudad = ciudad;
    }

    setTelefono(telefono: string) {
        this.telefono = telefono;
    }

}
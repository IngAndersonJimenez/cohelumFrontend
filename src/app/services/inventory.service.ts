import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NotificationService } from "../notifications/notification.service";
import { environment } from "../environments/environment";
import { Inventory } from "../interface/products/Inventory";
import { catchError, map, Observable } from "rxjs";
import { LoginService } from "./login.service";
import { InventoryCategory } from "../interface/products/inventoryCategory";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService, private loginService: LoginService) {

    }

    createProduct(inventory: Inventory): Observable<Inventory> {
        const formData: FormData = new FormData();
        console.log('Inventory object:', inventory);
        formData.append('name', inventory.name);
        formData.append('price', inventory.price.toString());
        formData.append('unitsAvailable', inventory.unitsAvailable.toString());
        formData.append('characteristic', inventory.characteristic);
        formData.append('description', inventory.description)
        formData.append('datasheet', inventory.datasheet);
        formData.append('image', inventory.image);
        const headers = new HttpHeaders({
            'Authorization': `${this.getToken()}`,

        });

        return this.http.post<Inventory>(`${environment.apiUrl}api/v1/inventory/createFull`, formData, { headers }).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError("Error en la solicitud", "Vuelve a intentar");
                throw error;
            }),
            map(result => {
                console.log(result);
                if (result != null) {
                    console.log("Llego");
                    this.notificationService.showSuccess("Registro exitoso", "Bienvenido");
                } else {
                    this.notificationService.showError("Registro fallido", "Vuelve a intentar");
                }
                return result;
            })
        );
    }

    getToken(): string {
        let token: string = '';
        this.loginService.userCurrent.subscribe(data => {
            console.log("Token: ")
            console.log(data)
            token = data.token
        })
        return token;
    }

    getCategory(token?: string): Observable<InventoryCategory[]> {

        let headers = new HttpHeaders({})

        if (token != null) {
            headers = new HttpHeaders({
                'Authorization': `${token}`
            });
        } else {
            headers = new HttpHeaders({
                'Authorization': `${this.getToken()}`
            });
        }

        return this.http.get<InventoryCategory[]>(environment.apiUrl + 'api/v1/inventoryCategory/getAll', { headers });
    }
}

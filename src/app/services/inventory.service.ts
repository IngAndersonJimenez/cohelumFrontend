import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NotificationService } from "../notifications/notification.service";
import { environment } from "../environments/environment";
import { Inventory } from "../interface/products/Inventory";
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";
import { LoginService } from "./login.service";
import { InventoryCategory } from "../interface/products/inventoryCategory";
import { Product } from "../interface/products/Product";
import { CategoryProducts } from "../interface/products/CategoryProducts";
import { Category } from "../interface/Category";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    private isActiveInventory: boolean = false;
    private isActiveInventoryMemory = new BehaviorSubject(false);
    public isActiveInventoryCurrent = this.isActiveInventoryMemory.asObservable();

    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService, private loginService: LoginService) {

    }

    createProduct(formData: FormData): Observable<Inventory> {
        const headers = new HttpHeaders({
            'Authorization': `${this.getToken()}`,
        });

        return this.http.post<Inventory>(`${environment.apiUrl}api/v1/`, formData, { headers }).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError("Error en la solicitud", "Vuelve a intentar");
                throw error;
            }),
            map(result => {
                console.log(result);
                if (result != null) {
                    console.log("Llego");
                    this.notificationService.showSuccess("Registro exitoso", "El producto se ha creado correctamente");
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

    getCategoryAll(token?: string): Observable<CategoryProducts[]> {

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

        return this.http.get<CategoryProducts[]>(environment.apiUrl + 'api/v1/inventoryCategory/getCategoryAll', { headers });
    }

    createCategory(inventoryCategory: InventoryCategory): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': this.getToken(),
        });

        const url = `${environment.apiUrl}api/v1/inventoryCategory/create`;

        return this.http.post<InventoryCategory>(url, inventoryCategory, { headers }).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError("Error en la solicitud", "Vuelve a intentar");
                throw error;
            }),
            tap(result => {
                console.log(result);
                if (result != null) {
                    this.notificationService.showSuccess("Registro exitoso", "La categoría se ha creado correctamente");
                } else {
                    this.notificationService.showError("Error en la creación", "Vuelve a intentar");
                }
            })
        );
    }

    updateCategory(inventoryCategory: InventoryCategory): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': this.getToken(),
        });

        const url = `${environment.apiUrl}api/v1/inventoryCategory/update?idCategory=${inventoryCategory.idCategory}`;


        return this.http.put(url, inventoryCategory, { headers }).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError("Error en la solicitud", "Vuelve a intentar");
                throw error;
            }),
            tap(result => {
                console.log(result);
                if (result != null) {
                    this.notificationService.showSuccess("Actualización exitosa", "La categoría se ha actualizado correctamente");
                } else {
                    this.notificationService.showError("Error en la actualización", "Vuelve a intentar");
                }
            })
        );
    }


    getInventoryByName(name: string): Observable<Product> {
        const headers = new HttpHeaders({
            Authorization: `${this.getToken()}`,
        });
        const url = `${environment.apiUrl}api/v1/inventory/searchByName/${name}`;

        return this.http.get<Product>(url, { headers }).pipe(
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError('Error en la solicitud', 'Vuelve a intentar');
                throw error;
            }),
            tap((result) => {
                console.log(result);
                if (result != null) {
                    this.notificationService.showSuccess('Consulta exitosa', 'Bienvenido');
                } else {
                    this.notificationService.showError('Registro fallido', 'Vuelve a intentar');
                }
            })
        );
    }

    createCategoryAndImage(formData: FormData): Observable<Category> {
        console.log('Datos que llegan al servicio:', formData);
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.getToken());

        return this.http.post<Category>(`${environment.apiUrl}api/v1/inventoryCategory/create/categoryImage`, formData, {
            headers: headers,
        });
    }

    activeSectionInventoty(status: boolean) {
        console.log("activeSectionInventoty")
        this.isActiveInventoryMemory.next(status); 
    }

   /* getStatusSectionInventory(): boolean {
        return this.isActiveInventoryMemory;
    }*/

}

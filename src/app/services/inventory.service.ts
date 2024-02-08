import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NotificationService } from "../notifications/notification.service";
import { environment } from "../environments/environment";
import { Inventory } from "../interface/products/Inventory";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import { LoginService } from "./login.service";
import { InventoryCategory } from "../interface/products/inventoryCategory";
import { CategoryProducts } from "../interface/products/CategoryProducts";
import { Category } from "../interface/Category";
import { InventoryImage } from "../interface/InventoryImage";
import { ProductFull } from "../interface/products/ProductFull";


@Injectable({
    providedIn: 'root'
})
export class InventoryService {


    private isActiveInventoryMemory = new BehaviorSubject(false);
    public isActiveInventoryCurrent = this.isActiveInventoryMemory.asObservable();
    private selectedCategoryId: number | null = null;
    private selectedInventoryDetails: any | null = null;
    private isActiveUsMemory = new BehaviorSubject(false);
    public isActiveUsCurrent = this.isActiveUsMemory.asObservable();
    private inventoryImagesSubject = new BehaviorSubject<{ [idInventory: number]: string[] }>({});
    public inventoryImages$ = this.inventoryImagesSubject.asObservable();


    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService, private loginService: LoginService) {

    }

    createProduct(formData: FormData): Observable<Inventory> {
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
                if (result != null) {
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

    getInventoryByName(name: string): Observable<ProductFull> {
        const headers = new HttpHeaders({
            Authorization: `${this.getToken()}`,
        });
        const url = `${environment.apiUrl}api/v1/inventory/searchByName/${name}`;

        return this.http.get<ProductFull>(url, { headers }).pipe(
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError('Error en la solicitud', 'Vuelve a intentar');
                throw error;
            }),
            tap((result) => {
                if (result != null) {
                    this.notificationService.showSuccess('Datos del producto', 'Consulta exitosa!');
                } else {
                    this.notificationService.showError('Registro fallido', 'Vuelve a intentar');
                }
            })
        );
    }

    createCategoryAndImage(formData: FormData): Observable<Category> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.getToken());
        return this.http.post<Category>(`${environment.apiUrl}api/v1/inventoryCategory/create/categoryImage`, formData, {
            headers: headers,
        });
    }

    activeSectionInventoty(status: boolean) {
        this.isActiveInventoryMemory.next(status);
    }

    activeSectionUs(status: boolean) {
        this.isActiveUsMemory.next(status);
    }


    getInventoryAll(token?: string): Observable<any> {
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

        return this.http.get<CategoryProducts[]>(environment.apiUrl + 'api/v1/inventory', { headers });
    }


    createImageProduct(idInventory: number, imageFile: string, fileName: string): Observable<InventoryImage> {
        const formData: FormData = new FormData();
        formData.append('image', imageFile);
        formData.append('fileName', fileName);

        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.getToken());

        return this.http.post<InventoryImage>(
            `${environment.apiUrl}api/v1/inventoryImage/create/${idInventory}`, formData, { headers: headers, });
    }


    updateImageProduct(formData: FormData, idInventoryImage: number, fileName: string): Observable<InventoryImage> {
        const headers = new HttpHeaders({
            'Authorization': `${this.getToken()}`,
        });

        // Agrega el nombre del archivo al FormData
        formData.append('fileName', fileName);

        return this.http.put<InventoryImage>(`${environment.apiUrl}api/v1/inventoryImage/update/${idInventoryImage}`, formData, { headers }).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError("Error en la solicitud", "Vuelve a intentar");
                return throwError(error);
            }),
            map(result => {
                this.notificationService.showSuccess("Actualización exitoso", "Imagen Actualizada correctamente!");
                return result;
            })
        );
    }




    updateCategory(idCategory: number, statusCategory: boolean,description:string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': this.getToken(),
        });

        const url = `${environment.apiUrl}api/v1/inventoryCategory/update?idCategory=${idCategory}`;

        const body = {
            active: statusCategory,
            description: description
        };

        return this.http.put(url, body, { headers }).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError("Error en la solicitud", "Vuelve a intentar");
                throw error;
            }),
            tap(result => {
                this.notificationService.showSuccess("Actualización exitosa", "La categoría se ha actualizado correctamente");

            })
        );
    }

    updateCategoryImage(idCategory: number, image: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', image);

        const headers = new HttpHeaders({
            'Authorization': this.getToken(),
        });

        const url = `${environment.apiUrl}api/v1/categoryImage/update/${idCategory}`;


        return this.http.put(url, formData, { headers });
    }

    updateProduct(formData: FormData, idInventoryId: number): Observable<ProductFull> {
        const headers = new HttpHeaders({
            'Authorization': `${this.getToken()}`,
        });

        return this.http.put<ProductFull>(`${environment.apiUrl}api/v1/inventory/updateFull/${idInventoryId}`, formData, { headers }).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                this.notificationService.showError("Error en la solicitud", "Vuelve a intentar");
                throw error;
            }),
            map(result => {
                if (result != null) {
                    this.notificationService.showSuccess("Actualización exitoso", "El producto se ha actualizado correctamente");
                } else {
                    this.notificationService.showError("Actualización fallido", "Vuelve a intentar");
                }
                return result;
            })
        );
    }


    setSelectedCategoryId(categoryId: number) {
        this.selectedCategoryId = categoryId;
    }

    getSelectedCategoryId(): number | null {
        return this.selectedCategoryId;
    }

    setSelectedInventoryDetails(details: any) {
        this.selectedInventoryDetails = details;
    }

    getSelectedInventoryDetails(): any | null {
        return this.selectedInventoryDetails;
    }



    setImages(idInventory: number, images: string[]): void {
        const currentImages = this.inventoryImagesSubject.value;
        currentImages[idInventory] = images;
        this.inventoryImagesSubject.next(currentImages);
    }

    getImages(): { [idInventory: number]: string[] } {
        return this.inventoryImagesSubject.value;
    }



}

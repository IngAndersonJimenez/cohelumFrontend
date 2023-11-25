import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationService} from "../notifications/notification.service";
import {Contact} from "../interface/Contact";
import {catchError, map, Observable, tap} from "rxjs";
import {environment} from "../environments/environment";
import {LoginService} from "./login.service";
import {InventoryCategory} from "../interface/products/inventoryCategory";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService,
              private loginService:LoginService
  ) {}

  getTokenPublic(contact: Contact): Observable<string> {
    return this.loginService.getTokenPublicS()
        .pipe(
            map((response) => {
              console.log('Contacto creado con éxito:', response);
              return response.token;
            }),
            catchError((error) => {
              console.error('Error al generar el token:', error);
              throw error;
            })
        );
  }


  createContact(formData: FormData, token:string): Observable<Contact>{
    console.log('createContact:', formData, token);
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    const url = `${environment.apiUrl}api/v1/requestContact/create`;
    return this.http.post<Contact>(url,formData,{ headers })
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

  getContact(token?: string):Observable<Contact[]>{
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

      return this.http.get<Contact[]>(environment.apiUrl + 'api/v1/requestContact/list', { headers });
  }

}

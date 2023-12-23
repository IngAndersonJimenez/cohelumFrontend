import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {InventoryComment} from "../interface/comment/InventoryComment";
import {LoginService} from "./login.service";
import {environment} from "../environments/environment";
import {NotificationService} from "../notifications/notification.service";
import {InventoryCategory} from "../interface/products/inventoryCategory";
import {InventoryComments} from "../interface/comment/InventoryComments";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private loginService: LoginService,private notificationService: NotificationService) { }

  getToken(): string {
    let token: string = '';
    this.loginService.userCurrent.subscribe(data => {
      token = data.token
    })
    return token;
  }

  createInventoryComment(inventoryComment: InventoryComments,token?:string): Observable<any> {
    const url = `${environment.apiUrl}api/v1/inventoryComment/create`;
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
    return this.http.post<any>(url, inventoryComment,{ headers }).pipe(
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

  getComment(token?:string):Observable<InventoryComment[]>{
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
    return this.http.get<InventoryComment[]>(environment.apiUrl + 'api/v1/inventoryComment/getCommentAll', { headers });
  }



}

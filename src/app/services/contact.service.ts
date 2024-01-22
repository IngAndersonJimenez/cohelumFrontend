import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationService} from "../notifications/notification.service";
import {Contact} from "../interface/Contact";
import {BehaviorSubject, catchError, map, Observable, Subject, tap} from "rxjs";
import {environment} from "../environments/environment";
import {LoginService} from "./login.service";
import {ResponseMessageDTO} from "../interface/header/ResponseMessageDTO";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private newMessageCountSubject = new BehaviorSubject<number>(0);
    newMessageCount$ = this.newMessageCountSubject.asObservable();
    private unreadMessages: ResponseMessageDTO[] = [];
    newMessageCount: number = 0;

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService,
              private loginService:LoginService
  ) {}

    updateNewMessageCount(count: number): void {
        this.newMessageCountSubject.next(count);
    }

  getTokenPublic(contact: Contact): Observable<string> {
    return this.loginService.getTokenPublicS()
        .pipe(
            map((response) => {
              return response.token;
            }),
            catchError((error) => {
              console.error('Error al generar el token:', error);
              throw error;
            })
        );
  }


  createContact(formData: FormData, token:string): Observable<Contact>{
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    const url = `${environment.apiUrl}api/v1/requestContact/create`;
    return this.http.post<Contact>(url,formData,{ headers })
  }

    getToken(): string {
        let token: string = '';
        this.loginService.userCurrent.subscribe(data => {
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

    getContactIsNotRead(isNotRead: boolean, token:string): Observable<ResponseMessageDTO[]> {
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
        const url = `${environment.apiUrl}api/v1/requestContact/notifications/${isNotRead}`;
        return this.http.get<ResponseMessageDTO[]>(url,{ headers });
    }

    updateStatusRead(status: boolean, idContact: number, token: string): Observable<any> {
        let headers = new HttpHeaders({});

        if (token != null) {
            headers = new HttpHeaders({
                'Authorization': `${token}`
            });
        } else {
            headers = new HttpHeaders({
                'Authorization': `${this.getToken()}`
            });
        }

        const url = `${environment.apiUrl}api/v1/requestContact/notifications/update/${status}/${idContact}`;

        return this.http.put(url, {}, { headers }).pipe(
            // Notificar al servicio compartido después de una actualización exitosa
            tap(() => {
                this.updateNewMessageCount(status ? this.newMessageCount - 1 : this.newMessageCount);
                this.newMessageCountSubject.next(this.newMessageCount);
            })
        );
    }


    createWarranty(formData: FormData,token?: string) : Observable<any>{
        const headers = new HttpHeaders({
            'Authorization': `${token}`
        });
        return this.http.post(`${environment.apiUrl}api/v1/warranty/create`,formData,{headers})
    }

    getWarranty(token?: string):Observable<any>{
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

        return this.http.get(`${environment.apiUrl}api/v1/warranty/getWarrantyAll`,{headers})
    }

}

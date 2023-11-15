import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestLogin } from '../interface/RequestLogin';
import {BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { NotificationService } from '../notifications/notification.service';
import {ResponseLogin} from "../interface/ResponseLogin";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private responseLogin:ResponseLogin = {token:''}
  private userMemory = new BehaviorSubject(this.responseLogin);
  public userCurrent = this.userMemory.asObservable();
  constructor(private http: HttpClient,private router:Router, private notificationService:NotificationService) { }


    login(requestLogin: RequestLogin): Observable<any> {
        console.log(requestLogin);

        return this.http.post<any>(environment.apiUrl + 'login', requestLogin).pipe(
            map(result => {
                console.log(result);
                if (result != null && result.token) {
                    console.log("Llego");
                    const responseLogin: ResponseLogin = { token: result.token };
                    this.userMemory.next(responseLogin);
                    this.notificationService.showSuccess("Login exitoso", "Bienvenido");
                    this.router.navigate(['/cohelum/corporate/dashboard']);
                }
            })
        );
    }
}

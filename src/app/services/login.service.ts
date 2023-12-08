import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestLogin } from '../interface/RequestLogin';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { NotificationService } from '../notifications/notification.service';
import { ResponseLogin } from "../interface/ResponseLogin";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private responseLogin: ResponseLogin = { token: '' }
    private userMemory = new BehaviorSubject(this.responseLogin);
    public userCurrent = this.userMemory.asObservable();

    private responseLoginPubic: ResponseLogin = { token: '' }
    private userMemoryPublic = new BehaviorSubject(this.responseLoginPubic);
    public userCurrentPublic = this.userMemoryPublic.asObservable();

    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

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

    getTokenPublic(): Observable<any> {
        console.log("Creando public token");
        let requestLogin: RequestLogin = { emailUser: 'prueba@gmail.com', password: '1010' }
        return this.http.post<ResponseLogin>(environment.apiUrl + 'login', requestLogin).pipe(
            map(result => {
                console.log("result token public");
                console.log(result);
                if (result != null && result.token) {
                    console.log("Llego public token");
                    const responseLogin: ResponseLogin = { token: result.token };
                }
            })
        );
    }

    getTokenPublicS(): Observable<ResponseLogin> {
        let requestLogin: RequestLogin = { emailUser: 'prueba@gmail.com', password: '1010' }
        return this.http.post<ResponseLogin>(environment.apiUrl + 'login', requestLogin).pipe(
            map(result => {
                const responseLogin: ResponseLogin = { token: result.token };
                return responseLogin;
            })
        );
    }

}

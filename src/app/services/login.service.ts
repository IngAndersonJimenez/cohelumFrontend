import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestLogin } from '../interface/RequestLogin';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

    private tokenGeneral: ResponseLogin = { token: '' }

    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

    login(requestLogin: RequestLogin): Observable<any> {

        let requestLoginEncry: RequestLogin = 
        { emailUser: btoa(requestLogin.emailUser.toString()), password: btoa(requestLogin.password.toString()) }

        return this.http.post<any>(environment.apiUrl + 'login', requestLoginEncry).pipe(
            map(result => {
                if (result != null && result.token) {
                    const responseLogin: ResponseLogin = { token: result.token };
                    this.userMemory.next(responseLogin);
                    this.notificationService.showSuccess("Login exitoso", "Bienvenido");
                    this.router.navigate(['corporate/dashboard']);
                }
            })
        );
    }


    getTokenPublic(): Observable<ResponseLogin> {

        let requestLogin: RequestLogin = { emailUser: btoa('public@cohelum.com'), password: btoa('figq36L6v2O7DIz') }
        return this.http.post<ResponseLogin>(environment.apiUrl + 'login', requestLogin).pipe(
            map(result => {
                const responseLogin: ResponseLogin = { token: result.token };
                return responseLogin;
            })
        );
    }

}

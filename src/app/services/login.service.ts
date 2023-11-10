import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestLogin } from '../interface/RequestLogin';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { NotificationService } from '../notifications/notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient,private router:Router, private notificationService:NotificationService) { }

  postToken() {
    return this.http.post(
      'https://nodejs.org/api/url.html#the-whatwg-url-api',
      {},
    );
  }

    login(requestLogin: RequestLogin): Observable<any>{
      console.log(requestLogin)

      return this.http.post<any>(environment.apiUrl + 'login', requestLogin).pipe(
        map(result =>{
          console.log(result)
          if (result != null ){
            console.log("Llego")
            this.notificationService.showSuccess("Login exitoso","Bienvenido")
            this.router.navigate(['/cohelum/authenticated/content-user/dashboard']);
          }
        })
      )
    }
}

import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {catchError, map, Observable} from "rxjs";
import {SettingTP} from "../interface/settings/SettingTP";
import {NotificationService} from "../notifications/notification.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private loginService:LoginService,private http: HttpClient,private notificationService:NotificationService) { }

  getToken(): string {
    let token: string = '';
    this.loginService.userCurrent.subscribe(data => {
      token = data.token
    })
    return token;
  }

  createSettingTP(settingTP:SettingTP):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`,
    });
    return this.http.post(`${environment.apiUrl}api/v1/SettingTP/create`, settingTP, { headers }).pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          this.notificationService.showError("Error en la creación de la nueva imagen", "Vuelve a intentar");
          throw error;
        }),
        map(result => {
          if (result != null) {
            this.notificationService.showSuccess("Registro exitoso", "La imagen se ha creado correctamente");
          } else {
            this.notificationService.showError("Registro fallido", "Vuelve a intentar");
          }
          return result;
        })
    );
  }
  createImageSettingTP(idSettingTP: number, storageFolder: string, file: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`,
    });

    const formData = new FormData();
    formData.append('storageFolder', storageFolder);
    formData.append('imageSettingTP', file);

    console.log('Contenido de FormData:', formData);
    return this.http.post(`${environment.apiUrl}api/v1/SettingTP/createImage/${idSettingTP}`, formData, { headers });
  }

  getSlide(artefact: string){
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`,
    });
    return this.http.get<SettingTP>(`${environment.apiUrl}api/v1/SettingTP/${artefact}`, { headers });
  }
}

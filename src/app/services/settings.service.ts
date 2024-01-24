import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import { SettingTP } from "../interface/settings/SettingTP";
import { NotificationService } from "../notifications/notification.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private visitorCount = new BehaviorSubject<number>(0);
  visitorCount$ = this.visitorCount.asObservable();

  constructor(private loginService: LoginService, private http: HttpClient, private notificationService: NotificationService) { }

  increaseVisitorCount() {
    const currentCount = this.visitorCount.value;
    this.visitorCount.next(currentCount + 1);
  }
  // Método agregado para devolver el observable
  getVisitorCount$() {
    return this.visitorCount$;
  }

  getToken(): string {
    let token: string = '';
    this.loginService.userCurrent.subscribe(data => {
      token = data.token
    })
    return token;
  }

  createSettingTP(settingTP: SettingTP): Observable<any> {
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
    return this.http.post(`${environment.apiUrl}api/v1/SettingTP/createImage/${idSettingTP}`, formData, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        this.notificationService.showError("Error en la creación de la nueva imagen", "Vuelve a intentar");
        throw error;
      }),
      map(result => {
        if (result != null) {
          this.notificationService.showSuccess("Imagen añadida exitosamente", "La imagen se ha creado correctamente");
        }
        return result;
      })
    );
  }

  getSlide(artefact: string) {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`,
    });
    return this.http.get<SettingTP>(`${environment.apiUrl}api/v1/SettingTP/${artefact}`, { headers });
  }

  updateStatusSettingTP(idSettingTP: number, statusSettingTP: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`,
    });
    const url = `${environment.apiUrl}api/v1/SettingTP/updateStatus/${idSettingTP}?statusSettingTP=${statusSettingTP}`;
    return this.http.put(url, null, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        this.notificationService.showError("Error en la eliminación del carrusel", "Vuelve a intentar");
        throw error;
      }),
      map(result => {
        if (result != null) {
          this.notificationService.showSuccess("Eliminación exitoso", "La imagen se ha creado eliminado correctamente");
        }
        return result;
      })
    );
  }

  updateSettingTP(settingTP: SettingTP, idSettingTP: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`,
    });
    return this.http.put(`${environment.apiUrl}api/v1/SettingTP/updateSettingTP/${idSettingTP}`, settingTP, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        this.notificationService.showError("Error al actualizar del carrusel", "Vuelve a intentar");
        throw error;
      }),
      map(result => {
        if (result != null) {
          this.notificationService.showSuccess("Actualización exitoso", "el carrusel se ha actualizado correctamente");
        }
        return result;
      })
    );
  }

  getElementsByArtefact(artefact: string, token?: string) {
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
    return this.http.get<Array<SettingTP>>(`${environment.apiUrl}api/v1/SettingTP/${artefact}`, { headers });
  }


}

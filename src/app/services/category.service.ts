import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {InventoryCategory} from "../interface/products/inventoryCategory";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Router} from "@angular/router";
import {NotificationService} from "../notifications/notification.service";
import {LoginService} from "./login.service";
import {SubCategory} from "../interface/products/SubCategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService, private loginService: LoginService) {

  }

  getToken(): string {
    let token: string = '';
    this.loginService.userCurrent.subscribe(data => {
      token = data.token
    })
    return token;
  }


  getSubcategory(token?:string):Observable<SubCategory>{

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

    return this.http.get<SubCategory>(environment.apiUrl + 'api/v1/inventorySubCategory/getSubCategoryAll', { headers });
  }

  createInventorySubCategory(subCategory: SubCategory): Observable<SubCategory> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.getToken());

    return this.http.post<SubCategory>(`${environment.apiUrl}api/v1/inventorySubCategory/create`,subCategory,{headers})
  }

  updateInventorySubCategory(idSubcategory:number,statusCategory:boolean,description:string,idCategory:number):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.getToken());

    const body = {
      active: statusCategory,
      description: description,
      idCategory:idCategory
    };
    return this.http.put<any>(`${environment.apiUrl}api/v1/inventorySubCategory/update?idSubcategory=${idSubcategory}`,body,{headers})
  }

}

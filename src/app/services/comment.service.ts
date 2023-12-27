import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, Subject} from "rxjs";
import {InventoryComment} from "../interface/comment/InventoryComment";
import {LoginService} from "./login.service";
import {environment} from "../environments/environment";
import {NotificationService} from "../notifications/notification.service";
import {InventoryComments} from "../interface/comment/InventoryComments";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments: InventoryComments[] = [];
  private commentsSubject = new Subject<InventoryComments[]>();


  constructor(private http: HttpClient, private loginService: LoginService,private notificationService: NotificationService) { }

  getToken(): string {
    let token: string = '';
    this.loginService.userCurrent.subscribe(data => {
      token = data.token
    })
    return token;
  }

  createInventoryComment(inventoryCommentDTO: any,token?:string): Observable<any> {
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
    return this.http.post(url, inventoryCommentDTO, { headers })
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

  getCommentById(idInventory: number, token?: string): Observable<InventoryComments> {
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

    return this.http.get<InventoryComments>(`${environment.apiUrl}api/v1/inventoryComment/${idInventory}`, { headers });
  }



  setComments(comments: InventoryComments[]) {
    this.comments = comments;
    this.commentsSubject.next(comments);
  }

  getComments(): Observable<InventoryComments[]> {
    return this.commentsSubject.asObservable();
  }

}

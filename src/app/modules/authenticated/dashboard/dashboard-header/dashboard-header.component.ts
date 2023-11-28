import { Component, HostListener, Input, OnInit } from '@angular/core';
import { notifications, userItems } from 'src/app/interface/header-dummy-data';
import { Router } from "@angular/router";
import { ContactService } from "../../../../services/contact.service";
import { ResponseMessageDTO } from "../../../../interface/header/ResponseMessageDTO";
import {mergeMap, of, switchMap, tap} from "rxjs";

interface RouteMapping {
  [key: string]: string;
}

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  newMessageCount = 0;

  canShowSearchAsOverlay = false;
  notifications = notifications;
  userItems = userItems;
  messageNotifications: ResponseMessageDTO[] = [];


  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    // Realizar la llamada al servicio para obtener mensajes no leídos
    this.fetchUnreadMessages();

    // Verificar si hay mensajes no leídos cada cierto intervalo (por ejemplo, cada 5 minutos)
    setInterval(() => {
      this.fetchUnreadMessages();
    }, 300000); // 300000 milisegundos = 5 minutos
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innverWidth: number) {
    if (innverWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  navigateTo(route: string) {
    const routeMapping: RouteMapping = {
      'Profile': '/profile',
      'Settings': '/settings',
      'Lock screen': '/lock-screen',
      'Logout': '/cohelum/login'
    };

    const targetRoute = routeMapping[route];

    if (targetRoute) {
      this.router.navigate([targetRoute]);
    } else {
      console.error(`No se encontró una ruta para ${route}`);
    }
  }

  fetchUnreadMessages() {
    const token = this.contactService.getToken();
    this.contactService.getContactIsNotRead(false, token).pipe(
        tap((data: any) => {
          if (data && data.responseDTO) {
            this.messageNotifications = data.responseDTO.idContact.map((id: number, index: number) => ({
              idContact: id,
              name: data.responseDTO.name[index]
            }));

            this.newMessageCount = this.messageNotifications.length;
          } else {
            console.warn('La propiedad responseDTO no está presente en la respuesta.');
          }
        })
    ).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Error al obtener mensajes no leídos:', error);
      }
    });
  }

  markNotificationAsRead(idContact: number) {
    const token = this.contactService.getToken();
    this.contactService.getContactIsNotRead(true, token).subscribe(
        () => {
          this.messageNotifications = this.messageNotifications.filter(notification => notification.idContact !== idContact);
          this.newMessageCount = this.messageNotifications.length;
        },
        (error) => {
          console.error('Error al marcar la notificación como leída:', error);
        }
    );
  }



}

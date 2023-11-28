import {ChangeDetectorRef, Component, HostListener, Input, OnInit} from '@angular/core';
import { notifications, userItems } from 'src/app/interface/header-dummy-data';
import { Router } from "@angular/router";
import { ContactService } from "../../../../services/contact.service";
import { ResponseMessageDTO } from "../../../../interface/header/ResponseMessageDTO";
import {tap} from "rxjs";

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


  constructor(private router: Router, private contactService: ContactService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.contactService.newMessageCount$.subscribe((count) => {
      this.newMessageCount = count;
    });
    this.fetchUnreadMessages();
    setInterval(() => {
      this.fetchUnreadMessages();
    }, 30000);
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
            this.contactService.newMessageCount = this.newMessageCount;
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

  markNotificationAsRead(idContact: number): void {
    const token = this.contactService.getToken();
    this.contactService.updateStatusRead(true, idContact, token).subscribe(() => {
      this.newMessageCount = Math.max(0, this.newMessageCount - 1);
      this.contactService.newMessageCount = this.newMessageCount;
      this.navigateToMessageDetails();
    });
  }


  navigateToMessageDetails(): void {
    this.router.navigate(['/corporate/contact']);
  }
}

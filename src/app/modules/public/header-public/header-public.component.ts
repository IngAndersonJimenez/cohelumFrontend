import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {InventoryService} from 'src/app/services/inventory.service';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-header-public',
    templateUrl: './header-public.component.html',
    styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent implements OnInit {

    items: MenuItem[] | undefined;
    isDropdownOpen = false;
    menuVisible = false;

    constructor(public router: Router, private scroller: ViewportScroller, private inventoryService: InventoryService, private renderer: Renderer2) {
    }

    navegateLogin() {
        this.router.navigateByUrl('cohelum/login');
    }

    goTo(position: any) {
        this.scroller.scrollToAnchor(position);
        this.activateSectionInventory();
    }

    scrollToDiv(target: HTMLElement) {
        target.scrollIntoView();
    }

    activateSectionInventory() {
        this.inventoryService.activeSectionInventoty(false);
    }


    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
        ];
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }


    toggleMenu() {
        const navbar = document.getElementById('navbarButtonsExample');

        if (this.menuVisible) {
            this.renderer.removeClass(navbar, 'show');
        } else {
            this.renderer.addClass(navbar, 'show');
        }

        this.menuVisible = !this.menuVisible;
    }

    closeMenu() {
        const navbar = document.getElementById('navbarButtonsExample');
        this.renderer.removeClass(navbar, 'show'); // Oculta el menú
        this.menuVisible = false; // Actualiza el estado del menú
    }

    navegateUs() {
        this.router.navigateByUrl('cohelum/us');
    }

}

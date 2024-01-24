import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { InventoryService } from 'src/app/services/inventory.service';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/interface/products/Category';
import {CategoryService} from "../../../services/category.service";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent  implements OnInit{

    pathImage: string = environment.sourceImage;
    urlLogo : string = this.pathImage + "/imagenes/home/logo.png";
    categories: Array<Category> = [];
    category: Array<any> = [];

  items: MenuItem[] | undefined;
    isDropdownOpen = false;
    menuVisible = false;


  constructor(public router: Router, private scroller: ViewportScroller, private inventoryService:InventoryService,
              private renderer: Renderer2,private categoryService:CategoryService, private loginService:LoginService, private activatedRoute: ActivatedRoute) {
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              this.handleFragment();
          }
      });
  }
    private handleFragment() {
        this.activatedRoute.fragment.subscribe((fragment) => {
            if (fragment === 'inventorySeccion') {
            }
        });
    }

  navegateLogin() {
    this.router.navigateByUrl('corporate/login');
  }

  goTo(position: any) {
    this.scroller.scrollToAnchor(position);
    this.activateSectionInventory();
  }

  activateSectionInventory() {
    this.inventoryService.activeSectionInventoty(false);
  }

  activateSectionUs() {
    this.inventoryService.activeSectionUs(false);
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
    this.getTokenPublic()

}

    private getTokenPublic() {
        this.loginService.getTokenPublicS().subscribe(data => {
            this.getCategories(data.token);
        });
    }

    private getCategories(token: string) {
        let response: any;
        this.inventoryService.getCategoryAll(token).subscribe(data => {
            response = data;
            this.category = response.responseDTO.categoryFullDTOList;
        });
    }


    selectCategory(category: any) {
        // Filtrar por descripción específica
        const filteredCategory = this.category.find((c: any) =>
            c.getInventoryCategoryDTO.description.toLowerCase().includes('cata electrodomesticos')
        );

        console.log('Categoría filtrada:', filteredCategory); // Agrega este console.log para depurar

        if (filteredCategory) {
            let categorySelected: Category = new Category('','',0);
            categorySelected.setIdCategory(filteredCategory.getInventoryCategoryDTO.idCategory);
            categorySelected.setDescription(filteredCategory.getInventoryCategoryDTO.description);
            this.categoryService.setSelectedCategory(categorySelected);
            console.log('Categoría refiltrada:', categorySelected);
        }

    }





    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }



    toggleMenu() {
        const navbar = document.getElementById('navbarButtonsExample');
        const menuToggle = document.getElementById('menuToggle');

        if (this.menuVisible) {
            this.renderer.removeClass(navbar, 'show');
            this.renderer.removeClass(menuToggle, 'active');
        } else {
            this.renderer.addClass(navbar, 'show');
            this.renderer.addClass(menuToggle, 'active');
        }

        this.menuVisible = !this.menuVisible;
    }


    closeMenu() {
        const navbar = document.getElementById('navbarButtonsExample');
        this.renderer.removeClass(navbar, 'show'); // Oculta el menú
        this.menuVisible = false; // Actualiza el estado del menú
    }



}

import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { InventoryService } from 'src/app/services/inventory.service';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/interface/products/Category';
import { CategoryService } from "../../../services/category.service";
import { LoginService } from "../../../services/login.service";

@Component({
    selector: 'app-header-public',
    templateUrl: './header-public.component.html',
    styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent implements OnInit {

    pathImage: string = environment.sourceImage;
    urlLogo: string = this.pathImage + "/imagenes/home/logo.png";
    categories: Array<Category> = [];
    category: Array<any> = [];
    isDropdownOpen = false;
    menuVisible = false;

    constructor(public router: Router, private scroller: ViewportScroller, private inventoryService: InventoryService,
        private renderer: Renderer2, private categoryService: CategoryService, private loginService: LoginService, private activatedRoute: ActivatedRoute) {
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
        this.getTokenPublic()
    }

    private getTokenPublic() {
        this.loginService.getTokenPublic().subscribe(encryptedToken => {
            this.getCategories(encryptedToken.token);
        });
    }


    private getCategories(token: string) {
        let response: any;
        this.inventoryService.getCategoryAll(token).subscribe(data => {
            response = data;
            this.category = response.responseDTO.categoryFullDTOList;
        });
    }


    selectCategoryCata() {
        const filteredCategory = this.category.find((c: any) =>
            c.getInventoryCategoryDTO.description.toLowerCase().includes('cata electrodomesticos')
        );

        if (filteredCategory) {
            let categorySelected: Category = new Category('', '', 0);
            categorySelected.setIdCategory(filteredCategory.getInventoryCategoryDTO.idCategory);
            categorySelected.setDescription(filteredCategory.getInventoryCategoryDTO.description);
            this.categoryService.setSelectedCategory(categorySelected);
        }
    }

    selectCategory(category: any) {
        let categorySelected: Category = new Category('', '', 0);
        categorySelected.setIdCategory(category.getInventoryCategoryDTO.idCategory);
        categorySelected.setDescription(category.getInventoryCategoryDTO.description);
        this.categoryService.setSelectedCategory(categorySelected);
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

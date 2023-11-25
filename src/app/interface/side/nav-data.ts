import {INavbarData} from "./helper";

export const navbarData:INavbarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fa-solid fa-house',
    label: 'Dashboard'
  },
  {
    routerLink: 'inventory',
    icon: 'fas fa-cubes',
    label: 'Inventario',
    items:[
      {
        routerLink: 'Category',
        label: 'Categoria'
      },
      {
        routerLink: 'Products',
        label: 'Productos',
        items: [
          {
            routerLink: 'Create-products',
            label: 'Crear producto'
          },
          {
            routerLink: 'Consult-product',
            label: 'Consultar producto'
          }
        ]
      }
    ]
  },
  {
    routerLink: 'Contact',
    icon: 'fas fa-envelope',
    label: 'Mensajes'
  },

];

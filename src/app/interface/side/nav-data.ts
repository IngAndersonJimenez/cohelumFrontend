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
        routerLink: 'dashboard/category',
        label: 'Categoría'
      },
      {
        routerLink: 'sub-category',
        label: 'SubCategoría'
      },
      {
        routerLink: 'products',
        label: 'Productos',
        items: [
          {
            routerLink: 'create-products',
            label: 'Crear producto'
          },
          {
            routerLink: 'consult-product',
            label: 'Consultar producto'
          }
        ]
      }
    ]
  },
  {
    routerLink: 'contact',
    icon: 'fas fa-envelope',
    label: 'Mensajes'
  },

];

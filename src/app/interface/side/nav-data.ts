import {INavbarData} from "./helper";

export const navbarData:INavbarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fa-solid fa-house',
    label: 'Dashboard'
  },
  {
    routerLink: 'setting',
    icon: 'fa-solid fa-gear',
    label: 'Configuración'
  },
  {
    routerLink: 'setting-section',
    icon: 'fas fa-folder',
    label: 'Sección 2'
  },
  {
    routerLink: 'inventory',
    icon: 'fas fa-cubes',
    label: 'Inventario',
    items:[
      {
        routerLink: 'category',
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
  }


];

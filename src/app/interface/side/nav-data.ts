import {INavbarData} from "./helper";

export const navbarData:INavbarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fa-solid fa-house',
    label: 'Dashboard'
  },
  {
    routerLink: 'inventario',
    icon: 'fas fa-cubes',
    label: 'Inventario',
    items: [
      {
        routerLink: 'inventario/categoria',
        label: 'Categoria',
        icon: 'fas fa-folder',
        items:[
          {
            routerLink: 'inventario/crear-categoria',
            label: 'Crear categoria'
          },
          {
            routerLink: 'inventario/listar-categoria',
            label: 'Listar categoria'
          }
        ]
      },
      {
        routerLink: 'inventario/agregar',
        label: 'Agregar inventario',
      },
      {
        routerLink: 'inventario/actualizar',
        label: 'Actualizar inventario'
      },
      {
        routerLink: 'inventario/listar',
        label: 'Listar inventario'
      },
    ]
  },

];

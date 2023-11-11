import { Component } from '@angular/core';
import { Ally } from 'src/app/interface/allies/Ally';
import { Aliado } from 'src/app/interface/allies/Aliado';

@Component({
  selector: 'app-allies-public',
  templateUrl: './allies-public.component.html',
  styleUrls: ['./allies-public.component.scss']
})
export class AlliesPublicComponent {

  listaAliados: Array<Aliado> = [];

  constructor() {
    this.listaAliados.push(new Aliado(
      'src/assets/image/ourAllies/logodecornuevoblancol.png',
      'Logo1'
    )
    );

    this.listaAliados.push(new Aliado(
      'src/assets/image/ourAllies/logodecornuevoblancol.png',
      'Logo1'
    )
    );

  }


}

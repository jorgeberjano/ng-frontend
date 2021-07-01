import { Component, OnInit } from '@angular/core';
import { GesContexto } from 'projects/ges-crud/src/lib/servicios/ges-contexto';
import { GesService } from 'projects/ges-crud/src/lib/servicios/ges.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html', 
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {
  public contexto: GesContexto;

  constructor(private servicioGes: GesService) {    
  }

  ngOnInit() {
    this.contexto = this.servicioGes.contexto;
  }

}

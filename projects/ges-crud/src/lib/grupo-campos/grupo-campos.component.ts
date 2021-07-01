import { Component, OnInit, Input } from '@angular/core';
import { Campo } from '../servicios/interfaces';
import { from } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ges-grupo-campos',
  templateUrl: './grupo-campos.component.html',
  styleUrls: ['./grupo-campos.component.scss']
})
export class GrupoCamposComponent implements OnInit {

  @Input() public campos: Array<Campo>;
  @Input() public camposDisponibles: Array<Campo>;
  public camposNoSeleccionados: Array<Campo>;

  constructor() {

  }

  ngOnInit() {
    this.camposNoSeleccionados = this.camposDisponibles.filter(campo => !this.esCampoSeleccionado(campo.idCampo));
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.campos, event.previousIndex, event.currentIndex);
  }

  cambioEnCampo(indice: number, cambio: any) {
    if (cambio.accion === 0) {
      this.eliminarCampo(indice);
    } else {
      this.conmutarCampos(indice, indice + cambio.accion);
    }
  }

  conmutarCampos(i: number, j: number) {
    if (i >= 0 && i < this.campos.length && j >= 0 && j < this.campos.length ) {
      const aux = this.campos[i];
      this.campos[i] = this.campos[j];
      this.campos[j] = aux;
    }
  }

  onAgregarCampo(campoAgregado: Campo) {
    this.camposNoSeleccionados = this.camposNoSeleccionados.filter(campo => campo.idCampo !== campoAgregado.idCampo);
    this.campos.push(campoAgregado);
  }

  eliminarCampo(i: number) {
    this.camposNoSeleccionados.push(this.campos[i]);
    this.campos.splice(i, 1);
  }

  private esCampoSeleccionado(idCampo: string): any {
    return this.campos.find(campo => campo.idCampo === idCampo) != null;
  }
}

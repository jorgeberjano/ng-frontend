import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GesService } from '../servicios/ges.service';
import { Consulta, Campo } from '../servicios/interfaces';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'ges-configuracion-campos',
  templateUrl: './configuracion-campos.component.html',
  styleUrls: ['./configuracion-campos.component.scss']
})
export class ConfiguracionCamposComponent implements OnInit {
  private consulta: Consulta;
  public camposSeleccionados: Array<Campo>;
  public titulo: string;
  private idConsulta: string;
  public camposDisponibles: Array<Campo>;
  public camposNoSeleccionados: Array<Campo>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioGes: GesService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.idConsulta = params.get('idConsulta');
        this.inicializar();
      }
    );
  }

  public inicializar() {

    const estado = this.servicioGes.contexto.getEstadoConsulta(this.idConsulta);
    if (estado) {
      this.consulta = estado.consulta;
      this.titulo = 'Configuración de ' + estado.consulta.nombreEnPlural;
      this.camposSeleccionados = estado.campos;
      this.camposDisponibles = this.consulta.campos;
      this.camposNoSeleccionados = this.camposDisponibles.filter(campo => !this.esCampoSeleccionado(campo.idCampo));
    }
  }

  onAceptar() {
    console.log('Aceptar');
    this.servicioGes.contexto.setCamposConsulta(this.idConsulta, this.camposSeleccionados);
    this.router.navigate(['/crud', this.idConsulta]);
  }

  onCancelar() {
    console.log('Cancelar');
    this.router.navigate(['/crud', this.idConsulta]);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.camposSeleccionados, event.previousIndex, event.currentIndex);
  }

  cambioEnCampo(indice: number, cambio: any) {
    if (cambio.accion === 0) {
      this.eliminarCampo(indice);
    } else {
      this.conmutarCampos(indice, indice + cambio.accion);
    }
  }

  conmutarCampos(i: number, j: number) {
    if (i >= 0 && i < this.camposSeleccionados.length && j >= 0 && j < this.camposSeleccionados.length ) {
      const aux = this.camposSeleccionados[i];
      this.camposSeleccionados[i] = this.camposSeleccionados[j];
      this.camposSeleccionados[j] = aux;
    }
  }

  onAgregarCampo(campoAgregado: Campo) {
    this.camposNoSeleccionados = this.camposNoSeleccionados.filter(campo => campo.idCampo !== campoAgregado.idCampo);
    this.camposSeleccionados.push(campoAgregado);
  }

  eliminarCampo(i: number) {
    this.camposNoSeleccionados.push(this.camposSeleccionados[i]);
    this.camposSeleccionados.splice(i, 1);
  }

  esCampoSeleccionado(idCampo: string): any {
    return this.camposSeleccionados.find(campo => campo.idCampo === idCampo) != null;
  }
}

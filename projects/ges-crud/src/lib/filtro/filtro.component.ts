import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Filtro, CondicionFiltro, Campo, Consulta, EstadoConsulta } from '../servicios/interfaces';
import { GesService } from '../servicios/ges.service';


@Component({
  selector: 'ges-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {
  public titulo: string;
  public filtro: Filtro;
  public campos: Array<Campo>;
  public consulta: Consulta;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioGes: GesService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.cargarFiltro(params.get('idConsulta')));
  }

  private cargarFiltro(idConsulta: string) {
    const estadoConsulta: EstadoConsulta = this.servicioGes.contexto.getEstadoConsulta(idConsulta);
    if (!estadoConsulta) {
      this.router.navigate(['/error'], { relativeTo: this.route, state: { mensaje: 'No existe la consulta ' + idConsulta } });
    }
    this.consulta = estadoConsulta.consulta;
    this.titulo = "Filtro de " + estadoConsulta.consulta.nombreEnPlural;
    this.filtro = estadoConsulta.filtro;
    this.campos = estadoConsulta.consulta.campos;
  }

  public onAgregarCondicion(campo: Campo): void {
    if (!this.filtro) {
      this.filtro = { condiciones: [] };
    }

    const condicion = {
      indice: this.filtro.condiciones.length,
      campo: campo,
      operador: '',
      valor: ''
    };
    this.filtro.condiciones.push(condicion);
  }
  public onEliminarCondicion(condicion: CondicionFiltro): void {
    this.filtro.condiciones.splice(condicion.indice, 1);
    this.ajustarIndicesCondiciones();
  }

  private ajustarIndicesCondiciones() {
    let i = 0;
    this.filtro.condiciones.forEach(condicion => condicion.indice = i++);
  }

  public onLimpiar() {
    this.filtro.condiciones = [];
  }

  public onAceptar() {
    this.servicioGes.contexto.setFiltroConsulta(this.consulta.idConsulta, this.filtro);
    this.router.navigate(['/crud', this.consulta.idConsulta]);
  }

  public onCancelar() {
    this.router.navigate(['/crud', this.consulta.idConsulta]);
  }
}

import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GesService } from '../servicios/ges.service';
import { EditorCamposComponent } from '../editor-campos/editor-campos.component';
import { Consulta } from '../servicios/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';

@Component({
  selector: 'ges-editor-entidad',
  templateUrl: './editor-entidad.component.html',
  styleUrls: ['./editor-entidad.component.scss']
})
export class EditorEntidadComponent implements OnInit, AfterViewInit {

  @ViewChild('editorCampos', {static: false}) editorCampos: EditorCamposComponent;
  @Input() editando = false;
  @Input() validando = false;
  esperando = false;
  consulta: Consulta;
  clave: string;
  modificacion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private servicioGes: GesService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const idConsulta = params.get('idConsulta');
        this.consulta = this.servicioGes.contexto.getConsulta(idConsulta);
        this.clave = params.get('clave');
        this.inicializar();
      }
    );
  }

  // Aqui esta accesible el componente hijo
  ngAfterViewInit () {
    this.inicializar();
  }

  public inicializar() {

    if (!this.consulta) {
      return;
    }
    if (this.clave) {
      this.modificacion = true;
      this.cargarEntidad();
    } else {
      this.modificacion = false;
      this.editando = true;
      this.editorCampos.crearFormulario(null);
    }
  }

  public cargarEntidad() {
    this.esperando = true;    
    this.servicioGes.obtenerEntidad(this.consulta, this.clave)
    .then(
      entidad => {        
        this.editorCampos.crearFormulario(entidad);
         this.esperando = false;
      })
    .catch(err => this.reportarError(err));
  }

  public ejecutarAccion(accion: string) {
    switch (accion) {
      case 'cancelar':
        if (this.modificacion) {
          this.editando = false;
        } else {
          this.volver();
        }
        break;
      case 'atras':
        this.volver();
        break;
      case 'modificar':
        this.editando = true;
        break;
      case 'guardar':
        this.guardarEntidad();
        break;
      case 'borrar':
        this.borrarEntidad();
        break;
    }
  }

  private guardarEntidad() {

    this.validando = true;
    this.editando = false;
    
    const entidad = this.editorCampos.getValores();
    if (entidad === null) {
      this.reportarError("Alguno de los valores no es válido")
      return;
    }
    const promesa = this.modificacion ?
      this.servicioGes.modificarEntidad(this.editorCampos.consulta, this.clave, entidad) :
      this.servicioGes.insertarEntidad(this.editorCampos.consulta, entidad);

    promesa.then(resp => { this.modificacion = true; this.editorCampos.entidadGuardada(resp); });
    promesa.catch(err => this.reportarError(err));
  }

  private borrarEntidad() {
    const modalRef = this.modalService.open(ConfirmacionModalComponent);
    modalRef.componentInstance.titulo = 'Confirmación de borrado';
    modalRef.componentInstance.mensaje = 'Se va a borrar el ' + this.consulta.nombreEnSingular;
    modalRef.result.then(resultado => this.procesarConfirmacionBorrado(resultado));
  }

  private procesarConfirmacionBorrado(resultado: string) {

    if (resultado !== 'aceptar') {
      return;
    }

    this.servicioGes.borrarEntidad(this.editorCampos.consulta, this.clave).then(
      resp => this.volver()
    ).catch(
      err => this.reportarError(err)
    );
  }

  get titulo() {
    if (!this.editorCampos || !this.editorCampos.consulta) {
      return "";
    }
    const prefijo = !this.editando ? 'Visualizar ' : (this.modificacion ? 'Modificar ' : 'Crear ');
    return prefijo + this.editorCampos.consulta.nombreEnSingular;
  }


  private reportarError(err: any): void {
    const mensaje = this.servicioGes.contexto.getMensajeError(err);

    this.router.navigate(['/error'], { relativeTo: this.route, state: { mensaje: mensaje } });
  }

  private volver() {
    this.router.navigate(['/crud', this.consulta.idConsulta]);
  }
 
}

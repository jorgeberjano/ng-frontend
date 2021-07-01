import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EditorCamposComponent } from 'projects/ges-crud/src/lib/editor-campos/editor-campos.component';
import { GesService } from 'projects/ges-crud/src/lib/servicios/ges.service';
import { Consulta } from 'projects/ges-crud/src/lib/servicios/interfaces';
import { EditorFotoComponent } from '../editor-foto/editor-foto.component';
import { IrisService } from '../servicios/iris.service';

@Component({
  selector: 'app-editor-persona',
  templateUrl: './editor-persona.component.html',
  styleUrls: ['./editor-persona.component.css']
})
export class EditorPersonaComponent implements OnInit {

  @ViewChild('editorCampos', { static: false }) editorCampos: EditorCamposComponent;
  @ViewChild('editorFoto', { static: false }) editorFoto: EditorFotoComponent;

  @Input() editando = false;
  @Input() validando = false;
  esperando = true;
  consulta: Consulta;
  clave: string;
  modificacion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioGes: GesService,
    private servicioIris: IrisService) {
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
  ngAfterViewInit() {
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
          this.cargarFoto();
        })
      .catch(err => this.reportarError(err));
  }

  public cargarFoto() {

    this.servicioIris.obtenerFotoPersona(this.clave)
      .then(
        foto => {
          this.editorFoto.cargarImagen(foto);
          this.esperando = false;
        })
      .catch(err => this.reportarError(err));
  }

  public guardarFoto() {
    if (!this.editorFoto.modificada) {
      return;
    }
    this.servicioIris.guardarFotoPersona(this.clave, this.editorFoto.archivo)
      .then()
      .catch(err => this.reportarError(err));
  }

  public ejecutarAccion(accion: string) {
    switch (accion) {
      case 'cancelar':
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
    promesa.then(resp => this.entidadGuardada(resp));
    promesa.catch(err => this.reportarError(err));
  }

  private entidadGuardada(nuevosValores: any) {
    this.guardarFoto();
    this.editorCampos.entidadGuardada(nuevosValores);
  }

  private borrarEntidad() {
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

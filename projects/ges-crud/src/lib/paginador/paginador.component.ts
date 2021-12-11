import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faFastBackward, faStepBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ges-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent implements OnInit {

  @Input() totalItems: number;
  @Input() itemsPorPagina: number;
  public paginaActual = 0;
  @Output() pagina: EventEmitter<number> = new EventEmitter();

  faFastBackward = faFastBackward;
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;
  faFastForward = faFastForward;

  constructor() { }

  ngOnInit() {
  }

  get numeroPaginas() {
    if (!this.totalItems || !this.itemsPorPagina) {
      return 0;
    }
    return Math.ceil(this.totalItems / this.itemsPorPagina);
  }

  public onCambioPagina(accion: string) {
    switch (accion) {
      case 'primera':
        this.irAPagina(0);
        break;
      case 'anterior':
        this.irAPagina(this.paginaActual - 1);
        break;
      case 'siguiente':
        this.irAPagina(this.paginaActual + 1);
        break;
      case 'ultima':
        this.irAPagina(this.numeroPaginas - 1);
        break;
    }
  }

  private irAPagina(pagina: number) {
    if (pagina < 0 || pagina >= this.numeroPaginas) {
      return;
    }
    this.paginaActual = pagina;
    this.pagina.emit(pagina);
  }

}

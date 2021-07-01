import { Component, OnInit, Input } from '@angular/core';
import { NgbDropdown, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ NgbDropdown, NgbDropdownMenu ]
})
export class MenuComponent implements OnInit {

  @Input() public consultas: Array<object>;
  @Input() public sinopticos: Array<object> = [
     { nombre: "Sinóptico de prueba", id: "prueba"},
     { nombre: "Visor de peso", id: "visor-peso"} 
  ];

  public isNavbarCollapsed = true;

  constructor() {
  }

  public asignarConsultas(metadatos: Array<object>) {
    this.consultas = metadatos;
  }

  ngOnInit() {
  }

  mostrarConsulta(idConsulta: string) {
    console.log('Consulta: ' + idConsulta);
  }

}

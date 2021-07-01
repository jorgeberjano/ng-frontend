import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editor-foto',
  templateUrl: './editor-foto.component.html',
  styleUrls: ['./editor-foto.component.css']
})
export class EditorFotoComponent implements OnInit {
  @Input() editando: boolean;
  public imagen: any;
  public modificada: boolean = false;
  public archivo: File;

  constructor() { }

  ngOnInit() {
  }

  public cargarImagen(blob: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagen = reader.result;
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  public onFotoModificada(event: any) {
    console.log(event);

    if (!event.target.files) {
      return;
    }

    this.archivo = event.target.files[0];

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagen = event.target.result;
      this.modificada = true;
    }
    reader.readAsDataURL(this.archivo);
  }

}

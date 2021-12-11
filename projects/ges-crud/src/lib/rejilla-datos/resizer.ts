import { Campo } from '../servicios/interfaces';

export class Resizer {
  campo: Campo;
  campoResize: Campo;
  pressed: boolean;
  startX: number;
  startWidth: number;

  public mouseDown(event: MouseEvent, campo: Campo) {
    this.campo = campo;
    this.pressed = true;
    this.startX = event.x;
    this.startWidth = campo.longitud * 10;
    //console.log("Down");
  }
  public mouseMove(event: MouseEvent): void {
    if (this.pressed) {
      if (event.buttons === 0) {
        this.pressed = false;
        //console.log("Move-Up");
        return;
      }
      let width = this.startWidth + (event.x - this.startX);
      if (width > 0) {
        this.campo.longitud = width / 10;
      }
      //console.log("Move");
    }
  }

  public mouseUp(event: MouseEvent): void {     
    this.pressed = false;
    //console.log("Up");
  }
}
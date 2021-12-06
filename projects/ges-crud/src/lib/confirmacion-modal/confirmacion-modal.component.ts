import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.scss']
})
export class ConfirmacionModalComponent implements OnInit {

  public titulo: string;
  public mensaje: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

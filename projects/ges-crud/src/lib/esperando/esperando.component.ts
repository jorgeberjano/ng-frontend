import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ges-esperando',
  templateUrl: './esperando.component.html',
  styleUrls: ['./esperando.component.scss']
})
export class EsperandoComponent implements OnInit {

  faSpinner = faSpinner;

  constructor() { }

  ngOnInit() {
  }
}

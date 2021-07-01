import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ges-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public mensaje: string;

  constructor(private route: ActivatedRoute, public router: Router) {
    this.mensaje = this.router.getCurrentNavigation().extras.state.mensaje;
  }

  ngOnInit() {
    // this.route.paramMap.subscribe(
    //    (params: ParamMap) => this.mensaje = params.get('mensaje')       
    // );
  }
}

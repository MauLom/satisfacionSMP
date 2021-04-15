import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-surveys',
  templateUrl: './access-surveys.component.html',
  styleUrls: ['./access-surveys.component.scss']
})
export class AccessSurveysComponent implements OnInit {

  claveId: String = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  goToSurveysMain() {
    if (0 < Number.parseInt(this.claveId.toString())) {
      console.log("llena los campos")
    } else {
      this.router.navigate(["/surveysMain"], { queryParams: { clave: this.claveId } });
    }
  }
}

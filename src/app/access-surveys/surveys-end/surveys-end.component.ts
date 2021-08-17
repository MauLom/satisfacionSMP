import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-surveys-end',
  templateUrl: './surveys-end.component.html',
  styleUrls: ['./surveys-end.component.scss']
})
export class SurveysEndComponent implements OnInit {

  pinParticipante = "0000";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe(params =>{
      this.pinParticipante =  params['pin'];
     })

  }

}

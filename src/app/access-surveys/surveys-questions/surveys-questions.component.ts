import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-surveys-questions',
  templateUrl: './surveys-questions.component.html',
  styleUrls: ['./surveys-questions.component.scss']
})
export class SurveysQuestionsComponent implements OnInit {

  claveSurvey: Number = 0;
  claveUser: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase


  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.claveSurvey = params['clave'];
        this.claveUser = params['userId']
      })

    let getInfo = this.db.database.ref('survey/' + this.claveSurvey).once('value').then(
      snapshot => {
        console.log("snapshot val", snapshot.val())
      }
    )
  }

}

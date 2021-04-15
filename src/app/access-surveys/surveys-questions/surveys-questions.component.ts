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


  respArr: Array<Number> = []

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
  }

  logAnswers(idxAnswer:number, doLog:boolean, clasificacion:number) {
    let userName = "";
    if (doLog) {
      let getInfo = this.db.database.ref('users/' + this.claveUser).once('value').then(
        snapshot => {
          userName = snapshot.val().nombre + ' ' + snapshot.val().apellido;
          this.db.database.ref('survey/' + this.claveSurvey + '/answers/' + this.claveUser).set({
            user: userName,
            responses: [0, 0, 0, 0],
            pinToWin: 56
          })
        })
    } else {
      if(null !=  this.respArr[idxAnswer]){
        this.respArr[idxAnswer] = clasificacion
      }else {
        this.respArr.push(clasificacion);
      }
    }

  }
}

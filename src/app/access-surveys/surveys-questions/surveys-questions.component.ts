import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatTabGroup } from '@angular/material/tabs';
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

  pinGenerado: boolean = false;

  pinParticipante: number = 0;

  tabQuestionsIndex: number = 0;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.claveSurvey = params['clave'];
        this.claveUser = params['userId']
      })
  }

  logQuestions() {
    let userName = "";
    console.log("alo", this.tabQuestionsIndex)
    if (this.tabQuestionsIndex >= 5) {
      let randomPin = Math.floor((Math.random() * (999 - 10 + 1)) + 10);;
      let getInfo = this.db.database.ref('users/' + this.claveUser).once('value').then(
        snapshot => {
          userName = snapshot.val().nombre + ' ' + snapshot.val().apellido;
          this.db.database.ref('survey/' + this.claveSurvey + '/answers/' + this.claveUser).set({
            user: userName,
            responses: this.respArr,
            pinToWin: randomPin
          })
          this.pinParticipante = randomPin;
          this.pinGenerado = true;
        })
    }else{
      this.goNextTab()
    }
  }

  goNextTab() {
    this.tabQuestionsIndex = (this.tabQuestionsIndex + 1);
  }

  logAnswers(idxAnswer: number, doLog: boolean, clasificacion: number, goNext: boolean) {
    let userName = "";
    if (doLog) {
      let randomPin = Math.floor((Math.random() * (999 - 10 + 1)) + 10);;
      let getInfo = this.db.database.ref('users/' + this.claveUser).once('value').then(
        snapshot => {
          userName = snapshot.val().nombre + ' ' + snapshot.val().apellido;
          this.db.database.ref('survey/' + this.claveSurvey + '/answers/' + this.claveUser).set({
            user: userName,
            responses: this.respArr,
            pinToWin: randomPin
          })
          this.pinParticipante = randomPin;
          this.pinGenerado = true;
        })
    } else {
      if (null != this.respArr[idxAnswer]) {
        this.respArr[idxAnswer] = clasificacion
      } else {
        this.respArr.push(clasificacion);
      }
    }
    if (goNext) {
      this.goNextTab();
    }
  }
}

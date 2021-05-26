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
  respArr: Array<any> = []
  numeroPreguntas = 9;
  textoPregunta6 = "";
  textoPregunta7 = "";
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
    for (let i = 0; i < this.numeroPreguntas; i++) {
      this.respArr.push({ hasAnswer: false, value: 0, index: i })
    }
  }

  saveAnswers(indice: number, valuacion: any, goNext?: boolean, doLog?: boolean) {
    this.respArr[indice].value = valuacion;
    this.respArr[indice].hasAnswer = true;
    if (goNext) {
      this.goNextTab();
    }
    if (doLog) {
      let userName = "";
      let randomPin = Math.floor((Math.random() * (999 - 10 + 1)) + 10);;
      let getInfo = this.db.database.ref('users/' + this.claveUser).once('value').then(
        snapshot => {
          userName = snapshot.val().nombre + ' ' + snapshot.val().apellido;
          this.db.database.ref('survey/' + this.claveSurvey + '/answers/' + this.claveUser).set({
            user: userName,
            responses: this.respArr,
            pinToWin: randomPin
          })
          this.db.database.ref('survey/' + this.claveSurvey + '/noParticipantes').once('value').then(snapshot => {
            let noPartActual: any = snapshot.val();
            noPartActual = Number.parseInt(noPartActual)
            noPartActual++
            this.db.database.ref('survey/' + this.claveSurvey).update({
              noParticipantes: noPartActual
            })
          })
          this.pinParticipante = randomPin;
          this.pinGenerado = true;
        })

    }
  }

  goNextTab() {
    this.tabQuestionsIndex = (this.tabQuestionsIndex + 1);
  }

}

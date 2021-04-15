import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  objBase: Object | undefined;

  arrSurveys: Array<any> | undefined;

  logParticipantes: Object | undefined;

  surveys: Observable<any[]> | undefined;

  showGanador: boolean = false;
  nameGanador: String = "";
  pinGanador: Number = 0;

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.surveys = db.list('survey/252525/answers').valueChanges()
  }

  ngOnInit(): void {
    let getInfo = this.db.database.ref('survey/').once('value').then(
      snapshot => {
        this.arrSurveys = Object.entries(snapshot.val());
        this.objBase = (snapshot.val())['1690'];
      }
    )

    // this.db.database.ref('survey/').orderByKey().on('child_added', snapshot => {
    //   this.logParticipantes = snapshot.val()?.answers;
    // })

  }

  goToGenerateSurvey() {
    this.router.navigate(["/admingsurvey"]);
  }

  obtenerPromedio() {
    this.arrSurveys?.forEach(
      element => {
        let idRespuestas: Array<any> = [];
        let getDetailEachSurveyAnswers = this.db.database.ref('survey/' + element[0] + '/answers').once('value').then(
          snapshot => {
            console.log("snapshot", snapshot.val())
            Object.entries(snapshot.val())?.forEach(
              each => {
                idRespuestas.push(each[0])
              })
            let promedios: Array<number> = []
            idRespuestas.forEach(cadaUno => {
              console.log("Cada Uno", cadaUno)
              let idxPromedios: number = 0;
              let arrAuxSetRespuestas: Array<number> = snapshot.val()[cadaUno].responses;
              arrAuxSetRespuestas.forEach(cadaRespuestaUsuario => {
                if (idxPromedios == 0) {
                  promedios.push(Number.parseInt(cadaRespuestaUsuario.toString()));

                } else {
                  // promedios[idxPromedios] = promedios[idxPromedios]+cadaRespuestaUsuario;
                }
                idxPromedios++;
              })
            })
            console.log("Arr con promedios :", promedios);
          })

        /*Para saber el 100% de la respuesta, debo  multiplicar el maxClasificacion por el numero de participantes */
        /* */
      })
  }

  obtenerGanador() {
    this.arrSurveys?.forEach(
      element => {
        let idParticipantes: Array<any> = [];
        let getDetailEachSurveyAnswers = this.db.database.ref('survey/' + element[0] + '/answers').once('value').then(
          snapshot => {
            Object.entries(snapshot.val())?.forEach(
              each => {
                idParticipantes.push(each[0])
              })

            let randomParticipant = Math.floor((Math.random() * (idParticipantes.length - 0 + 0)) + 0);;
            
            console.log("El ganador es:", snapshot.val()[idParticipantes[randomParticipant]].user);
            console.log("Con el pin", snapshot.val()[idParticipantes[randomParticipant]].pinToWin);

          })
      })
  }

  checkParticipantes() {

  }
}

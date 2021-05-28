import { Component, Input, OnInit } from '@angular/core';
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
  arrSurveys: Array<any> = [];
  logParticipantes: Object | undefined;
  surveys: Observable<any[]> | undefined;
  showGanador: boolean = false;
  nameGanador: String = "";
  pinGanador: Number = 0;
  surveyDetalle = 0;
  detalleSeleccionado = false;

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let getInfo = this.db.database.ref('survey/').once('value').then(
      snapshot => {
        Object.entries(snapshot.val()).forEach(cadaSorteoEnBD => {
          let detalleSorteo: any = cadaSorteoEnBD[1];
          if (detalleSorteo.status == 1) {
            this.arrSurveys?.push(cadaSorteoEnBD)
          }
        })
        //this.arrSurveys = Object.entries(snapshot.val());
        this.objBase = (snapshot.val())['1690'];
      }
    )
  }

  goToGenerateSurvey() {
    this.router.navigate(["/admingsurvey"]);
  }

  obtenerGanador() {
    let idParticipantes: any = [];
    let getDetailEachSurveyAnswers = this.db.database.ref('survey/' + this.surveyDetalle + '/answers').once('value').then(
      snapshot => {
        Object.entries(snapshot.val())?.forEach(
          each => {
            idParticipantes.push(each[0])
          })
        let randomParticipant = Math.floor((Math.random() * (idParticipantes.length - 0 + 0)) + 0);;
        this.nameGanador = snapshot.val()[idParticipantes[randomParticipant]].user;
        this.pinGanador = snapshot.val()[idParticipantes[randomParticipant]].pinToWin;
        this.db.database.ref('survey/' +  this.surveyDetalle).update({
          status: 0,
          winner: this.pinGanador,
          endDate: new Date()
        });
        this.showGanador = true;
      })
  }

  seleccionSorteo(idSorteo: number) {
    this.surveyDetalle = idSorteo;
    this.surveys = this.db.list("survey/" + idSorteo?.toString() + "/answers").valueChanges()
    this.detalleSeleccionado = true;
  }

  detalleSeleccionadoToFalse() {
    this.detalleSeleccionado = !this.detalleSeleccionado;
  }
}


import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


interface Answer {
  hasAnswer: boolean,
  index: number,
  value: number
}

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
  animations: []
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

  slctdTab = 0;

  arrSorteosInactivos: Array<any> = []

  numero_equis= 90;

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
          } else if (detalleSorteo.status == 0) {
            this.arrSorteosInactivos?.push(cadaSorteoEnBD)
          }
        })
        //Inicia proceso para obtener puntajes
        this.getPorcentajes();
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
        this.db.database.ref('survey/' + this.surveyDetalle).update({
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

  changeTab(idx: number) {
    this.slctdTab = idx;
  }

  getPorcentajes() {
    this.arrSorteosInactivos.forEach(eaSorteo => {
      let porcentaje_maestro = 0;
      let porcentaje_staff = 0;
      let porcentaje_curso = 0;
      let noParticipantes = Object.keys(eaSorteo[1].answers).length;
      // 5 es la evaluacion maxima de cada pregunta
      let calificacion_max = 5 * noParticipantes;
      let cada_participante_arr: string[] = Object.keys(eaSorteo[1].answers)
      for (let i = 0; i < Object.keys(eaSorteo[1].answers).length; i++) {
        let id_participantes = cada_participante_arr[i];
        let nombre_participante: string = eaSorteo[1].answers[id_participantes].user;
        let resps_participantes = eaSorteo[1].answers[id_participantes].responses;

        porcentaje_maestro += this.procesarRespuestas(resps_participantes, [0, 1, 2], 5);
        porcentaje_staff += this.procesarRespuestas(resps_participantes, [3, 6], 5);
        porcentaje_curso += this.procesarRespuestas(resps_participantes, [4, 5], 5);

      }
      let obj_porcentajes = { 'porc_maestro': porcentaje_maestro, 'porc_staff': porcentaje_staff, 'porc_curso': porcentaje_curso }
      eaSorteo.push(obj_porcentajes)
    })
    console.log("Arr Inactivos: ", this.arrSorteosInactivos);
  }

  procesarRespuestas(respuestas: Answer[], preguntas: Number[], calficacion_max: Number): number {
    let suma_respuestas = 0
    preguntas.forEach(ea => {
      let idx: number = Number.parseInt(ea.toString());
      let cada_respuesta = respuestas[idx];
      Number.isNaN(cada_respuesta.value) ? console.error("Is not a number") : suma_respuestas += cada_respuesta.value
    })
    return suma_respuestas;

  }


}


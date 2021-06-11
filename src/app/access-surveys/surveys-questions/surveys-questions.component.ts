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
  pregSlctIdx: number | undefined;
  pregSlctTipo: any | undefined;
  pregSlctTxt: String | undefined;
  pinGenerado: boolean = false;
  pinParticipante: number = 0;
  tabQuestionsIndex: number = 0;

  arrValuaciones: Array<any> = [
    {
      valor:"1",
      slctd: false
    },
    {
      valor:"2",
      slctd: true
    },
    {
      valor:"3",
      slctd: false
    },
    {
      valor:"4",
      slctd: false
    },
    {
      valor:"5",
      slctd: false
    },
  ];

  arrPreguntas: Array<any> = [
    {
      preg:"<b>Califica la información teórica que recibiste por parte del Maestro Parrillero</b>(Técnicas de cocción, tipos y usos de asadores y combustibles, tips, control de   temperaturas, etc).",
      tipo: 1
    },
    {
      preg:"Califica el método de enseñanza del Maestro Parrillero(manejo del grupo, indicaciones, seguimiento, etc).",
      tipo: 1
    },
    {
      preg:"Del 1 al 5: ¿Consideras que el Maestro Parrillero resolvió todas tus dudas?",
      tipo: 1
    },
    {
      preg:"Califica la atención que recibiste por parte del staff SMP </b>&nbsp;(líder de tienda, apoyos de cocina, aprendices, coordinadores).",
      tipo: 1
    },
    {
      preg:"Califica sabor, tiempos de elaboración y presentación del menú degustado en el curso",
      tipo: 1
    },
    {
      preg:"Del 1 al 5, ¿consideras que el precio del curso es justo a la experiencia recibida por parte de la SMP? (precio vs calidad).",
      tipo: 1
    },
    {
      preg:"Califica las instalaciones del capítulo donde tomaste el curso.",
      tipo: 1
    },
    {
      preg:"¿Qué comentario/sugerencia nos puedes dar para mejorar tu experiencia?",
      tipo: 2
    },
    {
      preg:"¿Alguna temática, receta o técnica que quiseras que tomemos en cuenta para futuros cursos?",
      tipo: 2
    }
  ];

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

    this.avanzarPregunta(0)
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

  avanzarPregunta(idx: number) {

    this.pregSlctIdx = idx;
    this.pregSlctTipo = this.arrPreguntas[0].tipo;
    this.pregSlctTxt = this.arrPreguntas[0].preg;

  }

}

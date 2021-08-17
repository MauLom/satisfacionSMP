import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

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
  pregSlctIdx: number = 0;
  pregSlctTipo: any | undefined;
  pregSlctTxt: String | undefined;
  pinGenerado: boolean = false;
  pinParticipante: number = 0;
  tabQuestionsIndex: number = 0;
  txtOpinions = "";

  numberSelected = 0;

  arrValuaciones: Array<any> = [
    {
      idx: 1,
      valor: "1",
      slctd: false
    },
    {
      idx: 2,
      valor: "2",
      slctd: true
    },
    {
      idx: 3,
      valor: "3",
      slctd: false
    },
    {
      idx: 4,
      valor: "4",
      slctd: false
    },
    {
      idx: 5,
      valor: "5",
      slctd: false
    },
  ];

  arrPreguntas: Array<any> = [
    {
      preg: "<b>Califica la información teórica que recibiste por parte del Maestro Parrillero</b>(Técnicas de cocción, tipos y usos de asadores y combustibles, tips, control de   temperaturas, etc).",
      tipo: 1
    },
    {
      preg: "<b>Califica el método de enseñanza del Maestro Parrillero</b>(manejo del grupo, indicaciones, seguimiento, etc).",
      tipo: 1
    },
    {
      preg: "Del 1 al 5: <b>¿Consideras que el Maestro Parrillero resolvió todas tus dudas?</b>",
      tipo: 1
    },
    {
      preg: "<b>Califica la atención que recibiste por parte del staff SMP </b>&nbsp;(líder de tienda, apoyos de cocina, aprendices, coordinadores).",
      tipo: 1
    },
    {
      preg: "Califica <b>sabor, tiempos de elaboración y presentación del menú</b> degustado en el curso",
      tipo: 1
    },
    {
      preg: "Del 1 al 5, <b>¿consideras que el precio del curso es justo a la experiencia recibida por parte de la SMP? (precio vs calidad).</b>",
      tipo: 1
    },
    {
      preg: "Califica las instalaciones del capítulo donde tomaste el curso.",
      tipo: 1
    },
    {
      preg: "¿Qué comentario/sugerencia nos puedes dar para mejorar tu experiencia?",
      tipo: 2
    },
    {
      preg: "¿Alguna temática, receta o técnica que quiseras que tomemos en cuenta para futuros cursos?",
      tipo: 2
    }
  ];
  constructor(
    private router: Router,
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
      this.respArr.push({ value: 0, index: i })
    }

    this.avanzarPregunta(-1)
  }

  saveAnswers() {
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
        this.router.navigate(['/surveysEnd'], { queryParams: {pin:this.pinParticipante }})
      })
  }

  goNextTab() {
    this.tabQuestionsIndex = (this.tabQuestionsIndex + 1);
  }

  slctValuacion(i: any) {
    this.numberSelected = i + 1;
    let circlesNo: any;
    if (document.getElementById("noCircle" + i) != null) {
      circlesNo = document.getElementById("noCircle" + i);
    }
    circlesNo.className += "valSlctd";

    this.respArr[this.pregSlctIdx].value = i;
    setTimeout(() => {
      this.avanzarPregunta(this.pregSlctIdx);
    }, 500);

    circlesNo.className = "row justify-content-center numbersUnSelected";
  }

  getOpinion(idx: number, value: string, last?: boolean) {
    console.log("idx", idx)
    console.log("opinion", value);
    this.respArr[idx].value = value;
    this.txtOpinions = "";
    if (!last) {
      this.avanzarPregunta(idx);
    }
  }

  avanzarPregunta(idx: number) {
    this.numberSelected = 0;
    let aux = idx + 1;
    this.pregSlctIdx = aux;
    this.pregSlctTipo = this.arrPreguntas[aux].tipo;
    this.pregSlctTxt = this.arrPreguntas[aux].preg;
  }
  endSurvey(a: number, b: string) {
    this.getOpinion(a, b, true);
    console.log(this.respArr);
    this.saveAnswers();
   
  }
}

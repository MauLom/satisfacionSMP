import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-admin-generate-survey',
  templateUrl: './admin-generate-survey.component.html',
  styleUrls: ['./admin-generate-survey.component.scss']
})
export class AdminGenerateSurveyComponent implements OnInit {

  slctdCapitulo: any = "";
  slctdMaestro: any = "";
  slctdDate: any = "";

  arrCapitulos: Array<String> = [];
  arrMaestros: Array<String> = [];

  pinGenerado =false;
  pin:Number | undefined;
  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {

    let getInfo = this.db.database.ref('capitulos/').once('value').then(
      snapshot => {
        this.arrCapitulos = snapshot.val()
      }
    )

    let getInfo2 = this.db.database.ref('maestrosParrilleros/').once('value').then(
      snapshot => {
        this.arrMaestros = snapshot.val()
      }
    )
  }

  generarPin() {
    let randomId = Math.floor((Math.random() * (99999 - 10000 + 1)) + 1000);
    this.db.database.ref('survey/' + randomId).set({
      maestro: this.slctdMaestro,
      capitulo: this.slctdCapitulo,
      fecha: this.slctdDate,
      template: "main"
    });
    this.pinGenerado=true;
    this.pin=randomId;
  }
}

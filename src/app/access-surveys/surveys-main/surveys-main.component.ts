import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-surveys-main',
  templateUrl: './surveys-main.component.html',
  styleUrls: ['./surveys-main.component.scss']
})
export class SurveysMainComponent implements OnInit {

  claveEncontrada:boolean | undefined;
  claveABuscar:String | undefined;
  userNameInpt:String = "";
  userSurNameInpt:String = "";
  userEmailInpt:String = "";
  userId:Number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params =>{
        this.claveABuscar = params['clave'];
      })
    let getInfo = this.db.database.ref('survey/'+ this.claveABuscar).once('value').then(
      snapshot => {
        this.claveEncontrada = null == snapshot.val()? false:true;
      }
    )
  }

  goToURL(data: any[]){
    this.router.navigate(data);
  }
  goToSurveys(){
    this.router.navigate(["/client"]);
  }

  writeUserData(userName:String, userSurName:String, userEmail:String){
    let randomId = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);;
    this.db.database.ref('users/' + randomId).set({
      nombre: userName,
      apellido:userSurName,
      email: userEmail
    });
    this.router.navigate(["/questions"], { queryParams: { clave: this.claveABuscar, userId: randomId}});
  }
}

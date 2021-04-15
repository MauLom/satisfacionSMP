import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {


  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  goToGenerateSurvey(){
    this.router.navigate(["/admingsurvey"]); 
  }
}

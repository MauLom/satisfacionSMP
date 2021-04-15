import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-admin',
  templateUrl: './access-admin.component.html',
  styleUrls: ['./access-admin.component.scss']
})
export class AccessAdminComponent implements OnInit {

  adminUser: String = "";
  adminEmail: String = "";

  wrongCredentials = false;

  mainUser: String = "";
  mainAdmin: String = "";

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit(): void {
    let getInfo = this.db.database.ref('admins/0').once('value').then(
      snapshot => {
        this.mainUser = snapshot.val().user;
        this.mainAdmin = snapshot.val().mail;
      })
  }

  goToAdminMain() {
    if (this.adminUser.toLocaleLowerCase() === this.mainUser.toLocaleLowerCase() && this.adminEmail.toLocaleLowerCase() === this.mainAdmin.toLocaleLowerCase()) {
      this.router.navigate(["/adminMain"]);
    }
  }
}

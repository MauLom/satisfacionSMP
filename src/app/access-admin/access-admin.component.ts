import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-admin',
  templateUrl: './access-admin.component.html',
  styleUrls: ['./access-admin.component.scss']
})
export class AccessAdminComponent implements OnInit {

  adminUser:String ="";
  adminEmail:String ="";

  constructor() { }

  ngOnInit(): void {
  }

  

}

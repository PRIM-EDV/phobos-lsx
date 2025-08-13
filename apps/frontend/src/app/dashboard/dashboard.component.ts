import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {

  public view: string = "DHBRD";
  public tab: string = "GNRL";

  constructor(public readonly auth: AuthService) { }

  ngOnInit(): void {
  }

}

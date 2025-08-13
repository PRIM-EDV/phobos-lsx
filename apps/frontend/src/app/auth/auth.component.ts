import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend/backend.service';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: false
})
export class AuthComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  public async login() {
    try {
      await this.authService.login(this.username, this.password);
      await this.router.navigateByUrl('/dashboard');
    }
    catch(e){

    }
  }

}

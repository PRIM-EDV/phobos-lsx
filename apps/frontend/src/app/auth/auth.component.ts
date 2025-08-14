import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { PhButton, PhButtonList, PhForm, PhInput, PhWindow } from '@phobos/elements';

@Component({
    selector: 'app-auth',
    imports: [
      CommonModule,
      PhButton,
      PhInput,
      PhWindow,
      PhForm,
      PhButtonList
    ],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true
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

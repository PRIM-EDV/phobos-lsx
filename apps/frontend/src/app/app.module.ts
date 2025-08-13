import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { DroneControlModule } from './drone-control/drone-control.module';

declare global {
  interface Window {
    __env: {
      lsxServerHostname: string,
      lsxServerPort: string
    }
  }
}


@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        AuthModule,
        BrowserModule,
        DashboardModule,
        DroneControlModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

import { Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { DroneComponent } from './drone/drone.component';
import { authzGuard } from './auth/authz.guard';
import { TechnicalComponent } from './technical/technical.component';
import { EventComponent } from './event/event.component';

export const routes: Routes = [
  {
    path: 'general',
    component: GeneralComponent,
    canActivate: [authzGuard],
    data: {
      roles: ['admin'],
      view: 'LSX',
      tab: 'GNRL'
    },
  },
  {
    path: 'drone',
    component: DroneComponent,
    canActivate: [authzGuard],
    data: {
      roles: ['admin'],
      view: 'LSX',
      tab: 'DRONE'
    },
  },
  {
    path: 'event',
    component: EventComponent,
    canActivate: [authzGuard],
    data: {
      roles: ['admin']
    },
  },
  {
    path: 'technical',
    component: TechnicalComponent,
    canActivate: [authzGuard],
    data: {
      roles: ['tec', 'admin']
    }
  }
];

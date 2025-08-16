import { Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { DroneComponent } from './drone/drone.component';

export const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    {
        path: 'general',
        component: GeneralComponent
    },
    {
        path: 'drone',
        component: DroneComponent
    }
];

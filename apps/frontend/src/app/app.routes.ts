import { Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    {
        path: 'general',
        component: GeneralComponent
    },
    {
        path: 'db',
        component: DashboardComponent
    }
];

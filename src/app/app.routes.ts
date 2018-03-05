
import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { OtherComponent } from './pages/other/other.component';



// Routes
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
    },
    {
        path: 'overview',
        component: OverviewComponent
    },
    {
        path: 'other',
        component: OtherComponent
    },


];

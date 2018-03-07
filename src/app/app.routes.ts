
import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { AdvancedComponent } from './pages/advanced/advanced.component';



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
        path: 'advanced',
        component: AdvancedComponent
    }


];

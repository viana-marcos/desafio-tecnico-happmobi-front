import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { AdminAuthGuard } from './core/guards/admin-auth-guard';
import { LeasingAuthGuard } from './core/guards/leasing-auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'new-user', component: NewUserComponent },
    {
        path: 'admin-area', loadChildren: () => import('./pages/admin-area/admin-area.module')
            .then(m => m.AdminAreaModule),
            canActivate: [AdminAuthGuard]
    },
    {
        path: 'leasing-area', loadChildren: () => import('./pages/leasing-area/leasing-area.module')
            .then(m => m.LeasingAreaModule),
            canActivate: [LeasingAuthGuard]
    },
];

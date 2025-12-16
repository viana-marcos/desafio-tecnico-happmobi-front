
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppService } from '../services/app.service';

export const LeasingAuthGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const appService = inject(AppService);
    const router: Router = inject(Router);
    const token = localStorage.getItem('authToken');
    if (token) {
        const user = userService.decodeJwt(token);
        if (user.admin) {
            appService.showToast("Area apenas para locadores logados");
            router.navigate(['/login']);
            return false;
        }
        return true;
    } else {
        appService.showToast("Area apenas para locadores logados");
        return false
    }

};
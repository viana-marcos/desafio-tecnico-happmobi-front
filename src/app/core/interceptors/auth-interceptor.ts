
import { UserService } from '../services/user.service';

import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
        const userService: UserService = inject(UserService) as UserService;        
        const authToken = userService.getAuthorizationToken();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
    return next(authReq);
};
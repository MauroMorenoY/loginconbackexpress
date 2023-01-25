import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  canActivate(): Observable<boolean>  | boolean  {
    return this.authservice.validartoken()
    .pipe(
      tap(validar => {
        if (!validar){
          this.router.navigateByUrl('/auth')
        }
      })
    );
  }
  canLoad(): Observable<boolean > | boolean {
    return this.authservice.validartoken()
    .pipe(
      tap(validar => {
        if (!validar){
          this.router.navigateByUrl('/auth')
        }
      })
    );;
  }

  constructor(private authservice : AuthService,
    private router : Router){

  }
}

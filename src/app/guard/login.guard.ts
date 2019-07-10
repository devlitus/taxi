import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router, public platform: Platform, private storage: Storage) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot,

  ): boolean {
    if (this.platform.is("cordova")) {
      // Telef
      this.storage.get("clave").then(val => {
        if (val === null) {
          console.log("login guard true", state);
          return true
        } else {
          this.router.navigate(['/home'])
          console.log("login guard false ", val);
          return false
        }
      })
    } else {
      // Escritorio
      if (!localStorage.getItem('clave')) {
        return true
      } else {
        this.router.navigate(['/home'])
        return false
      }
    }
  }

}

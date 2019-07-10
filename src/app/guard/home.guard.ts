import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router, private platform: Platform, private storage: Storage) { }
  canActivate(next: ActivatedRouteSnapshot,  state: RouterStateSnapshot,

  ): boolean {
    if (this.platform.is("cordova")){
      // Telf
      this.storage.get("clava").then(val => {
        if(val === null){
          this.router.navigate(['/login']);
          console.log("home guard treu", state.url);
          return false
        }else{
          console.log("home guard treu", val);
          return true
        }
      })
    }else{
      // Escritorio
      if (!localStorage.getItem('clave')){
        this.router.navigate(['/login']);
        return false
      }else{
        return true
      }
    }
  }

}

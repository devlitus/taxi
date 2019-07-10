import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  clave: string;
  user: any = {};
  private doc: Subscription;

  constructor(
    private afDB: AngularFirestore,
    private storage: Storage,
    private platform: Platform
  ) { }

  verificarUsuario(clave: string) {
    clave = clave.toLocaleLowerCase();
    return new Promise((resolve, reject) => {
      this.doc = this.afDB.doc(`/usuarios/${clave}`)
        .valueChanges().subscribe(data => {
          if (data) {
            // Correcto hay usuario
            this.clave = clave;
            this.user = data;
            this.guradarStorage()
            resolve(true)
          } else {
            // Incorrecto credenciales incorrectas
            resolve(false)
          }
        })

    })
  }
  guradarStorage() {
    if (this.platform.is("cordova")) {
      // Telf
      this.storage.set("clave", this.clave);
    } else {
      // Escritorio
      localStorage.setItem('clave', this.clave);
    }
  }
  cargarStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        // Telf
        this.storage.get("clave").then(val => {
          if (val) {
            this.clave = val;
            console.log(this.clave)
            resolve(true);
          } else {
            resolve(false);
          }
        })
      } else {
        // Escritorio
        if (localStorage.getItem('clave')) {
          this.clave = localStorage.getItem('clave');
          resolve(true);
        } else {
          resolve(false);
        }
      }
    })
  }

  borrarUsuario(){
    this.clave = null;
    if(this.platform.is("cordova")){
      this.storage.remove("clave");
    }else{
      localStorage.removeItem("clave");
    }
    this.doc.unsubscribe();
  }

  
}

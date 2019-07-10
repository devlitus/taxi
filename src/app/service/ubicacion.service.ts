import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  taxista: AngularFirestoreDocument<any>
  private watch: Subscription

  constructor(
    private geolocation: Geolocation, 
    public _usuarioService: UsuarioService,
    private afDB: AngularFirestore,
    private platform: Platform,
    private storage: Storage
    ) {

  }
  iniciarTaxista() {
    if (this.platform.is("cordova")){
      // Telf
      this.storage.get("clave").then(val => {
        this.taxista = this.afDB.doc(`/usuarios/${val}`)  
      })
    }else {
      // Escritorio
      this.taxista = this.afDB.doc(`/usuarios/${localStorage.getItem("clave")}`)
    }
  }

  iniciarGeoLocalizacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.taxista.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,

      });
      this.watch = this.geolocation.watchPosition().subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        this.taxista.update({
          lat: data.coords.latitude,
          lng: data.coords.longitude,

        });
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  detenerUbicacion() {
    try {
      this.watch.unsubscribe()
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UbicacionService } from '../service/ubicacion.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lat: number;
  lng: number;
  user: any = {}
  constructor(
    public _localizacionServ: UbicacionService,
    private _usuarioServer: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit() {
    this._localizacionServ.iniciarGeoLocalizacion();
    this._localizacionServ.iniciarTaxista();
    this._localizacionServ.taxista.valueChanges()
      .subscribe(data => {
        this.user = data
        // console.log(data);
      });
  }

  salir() {
    this._localizacionServ.detenerUbicacion();
    this._usuarioServer.borrarUsuario();
    this.router.navigateByUrl("/login")
  }

}

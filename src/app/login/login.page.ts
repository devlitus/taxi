import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides
  slidesOpts = {
    slidesPerView: 1
  }


  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _userService: UsuarioService
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }
  async mostrarInput() {
    const alert = await this.alertCtrl.create({
      header: 'Ingrese el Usuario!',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: "Username"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.verificarUsuario(data.username)
          }
        }
      ]
    });

    await alert.present()
  }
  ingresar() {

  }
  async verificarUsuario(clave: string) {
    const loading = await this.loadingCtrl.create({
      message: "Verificando"
    })
    this._userService.verificarUsuario(clave).then(isExist => {
      loading.dismiss();
      if (isExist) {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      } else {
        this.alert()
      }
    })
    await loading.present()
  }
  async alert (){
    let alert = await this.alertCtrl.create({
      header: 'Usuario Incorrecto!',
      subHeader: 'Hable con el administrador o intente de nuevo',
      buttons: ["Aceptar"]
    })
    await alert.present()
  }


}


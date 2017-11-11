import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { UserModel } from '../../models/user-model';
import { HomePage } from '../../pages/home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userModel: UserModel;
  open=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: AuthProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public database: DatabaseProvider) {
    this.userModel = new UserModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signIn() {
    let loading = this.loadingCtrl.create({
        content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.auth.signInWithEmailAndPassword(this.userModel).then(result => {
        loading.dismiss();
              this.database.getShop(result.uid).once('value', (shop)=>{
                console.log(shop);
                if(shop.val() == undefined){
                this.alert('Aun no estas aliado', 'Parese que aun no estas registrado como un aliado');
                this.auth.logout();
                }else{
                this.navCtrl.setRoot(HomePage);
                this.navCtrl.popToRoot();
                }
              });   
    }).catch(error => {
        loading.dismiss();
        console.log(error);
        this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    });
  }

 alert(title: string, message: string) {
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
      });
      alert.present();
  }

}

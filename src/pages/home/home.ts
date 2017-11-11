import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { OrderPage } from '../order/order';
import  moment from 'moment';
import { Firebase } from '@ionic-native/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab: string = 'pending';

  pendingOrders: Array<any> = [];
  acceptedOrders: Array<any> = [];
  constructor(public navCtrl: NavController, public db: DatabaseProvider, public auth: AuthProvider, private platform: Platform, public alertCtrl: AlertController, public firebase: Firebase) {
    console.log('UID: ',this.auth.getUser().uid);
    this.firebase.grantPermission();
    this.firebase.onTokenRefresh().subscribe(token=>{
      this.db.setToken(this.auth.getUser().uid, token);
    });
    this.db.getOrders(this.auth.getUser().uid).subscribe(ss=>{
      console.log(ss);
      this.pendingOrders = [];
      this.acceptedOrders =[];
      ss.forEach(order=>{
        if(order.status == 'pending'){
          this.pendingOrders.push(order);
        }else{
          if(order.status != 'recived' && order.status != 'rated' && order.status != 'refused'){
            this.acceptedOrders.push(order);
          }
        }
      });
    });
  }
  pushOrder(id){
    this.navCtrl.push(OrderPage, {
      id:id
    });
  }

}
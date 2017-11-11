import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { BillingPage } from '../../pages/billing/billing';
import  moment from 'moment';

/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orderId:string;
  order:any;
  status: string;
  cart:Array<any>= [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
    this.orderId = this.navParams.get('id');
    this.db.getOrderById(this.orderId).subscribe(order=>{
      console.log(order);
      this.order = order;
      this.cart = order.cart;
      console.log(this.order.cart)
      this.getOrderStatus();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  getOrderStatus(){
    switch(this.order.status){
      case 'pending':
                      this.status = "Pendiente a aprobacion..."
                      break;
      case 'accepted':
                      this.status = "Te estamos asignando un Bliper...";
                      break;
      case 'refused':
                      this.status = "Rechazado";
                      break;
      case 'assigned':
                      this.status = "El Bliper va en camino...";
                      break;
      case 'inShop': 
                      this.status = "El Bliper va a entregar..."
                      break;
      case 'arrived': 
                      this.status = "El Bliper llego ala direccion"
                      break;
      case 'recived':
                      this.status = 'Entregado';
                      break;
    }
  }
  acceptOrder(){
    this.db.acceptOrder(this.orderId).then(ss=>{
      this.getOrderStatus()
    });
    
  }
  refuseOrder(){
    this.db.refuseOrder(this.orderId).then(ss=>{
      this.getOrderStatus();
    });
  }
  pushBilling(){
    this.navCtrl.push(BillingPage, {
      billing: this.order.billing
    })
  }

}

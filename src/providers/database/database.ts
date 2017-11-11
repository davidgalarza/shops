import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public db: AngularFireDatabase) {
    console.log('Hello DatabaseProvider Provider');
  }

  getShop(uid: string){
    return this.db.database.ref('/commerces/' + uid);
  }
  setBliperProfile(uid: string, phone: number, transport: string){
    this.db.database.ref('/blipers/' + uid + '/phone').set(phone);
    this.db.database.ref('/blipers/' + uid + '/transport').set(transport);
    this.db.database.ref('/blipers/' + uid + '/active'). set(true);
  }
  setToken(uid, token){
    return this.db.database.ref('/commerces/' + uid + '/token').set(token);
  }

  getOrdersRef(){
     return this.db.database.ref('/pruebaGeo/');
  }
  getOrders(shopId:string){
    return this.db.list('/orders',{
      query: {
        orderByChild: 'commerceId',
        equalTo: shopId
      }
    });
  }
  getOrderById(id:string){
    return this.db.object('/orders/'+id);
  }
  acceptOrder(id:string){
    return this.db.database.ref('/orders/'+id+'/status').set('accepted');
  }
  refuseOrder(id:string){
    return this.db.database.ref('/orders/'+id+'/status').set('refused');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BillingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
})
export class BillingPage {
  billingInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.billingInfo = this.navParams.get('billing');
    console.log(this.billingInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillingPage');
  }

}

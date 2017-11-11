import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { DatePicker } from '@ionic-native/date-picker';
import  * as moment from 'moment';


/**
 * Generated class for the AnalyticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
})
export class AnalyticsPage {
  myOrders: Array<any> = [];
  numOfOrders: number = 0;
  numOfAcceptedOrders: number = 0;
  numOfIncompletedOrders: number = 0;
  numOfRefusedOrders: number = 0;

  sales: number = 0;
  commission: number = 0;
  iniDate: any;
  finishDate: any;
  initDataS: string;
  finishDateS: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, public auth: AuthProvider, private datePicker: DatePicker) {
    this.db.getOrders(this.auth.getUser().uid).subscribe((orders)=>{
      this.myOrders = orders;
      this.updateData();
    });
    moment.locale('es');
    this.iniDate = moment().date(1);
    this.initDataS = this.iniDate.format('ll');
    this.finishDate = moment().add('months', 1).date(0);
    this.finishDateS = this.finishDate.format('ll');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalyticsPage');
  }
  changeInitDate(){
    moment()
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.iniDate = date;
        this.initDataS = moment(date).format('ll');
        this.updateData();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  changeFinishDate(){
    moment()
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
        this.finishDate = date;
        this.finishDateS = moment(date).format('ll');
        this.updateData();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  updateData(){
    this.numOfOrders = 0;
    this.numOfAcceptedOrders= 0;
    this.numOfIncompletedOrders = 0;
    this.numOfRefusedOrders = 0;
  
    this.sales = 0;
    this.commission = 0;

    this.myOrders.forEach(order=>{
      let orderDate = moment(order.time);
      if(orderDate.isBetween(this.iniDate, this.finishDate)){
        this.numOfOrders++;
        if(order.status != 'pending' && order.status != 'refused'){
          this.numOfAcceptedOrders++;
          this.sales += order.products_total;
          if(order.status != 'recived' && order.status != 'rated'){
            this.numOfIncompletedOrders++;
          }
        }else{
          if(order.status == 'refused'){
            this.numOfRefusedOrders++;
          }else{
            this.numOfIncompletedOrders++;
          }
        }
      }
    });
    this.commission = this.sales * 0.09;
  }
}

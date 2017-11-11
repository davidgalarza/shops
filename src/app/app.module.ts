import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// Pages

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPageModule } from '../pages/login/login.module';
import { OrdersPageModule } from '../pages/orders/orders.module';
import { OrderPageModule } from '../pages/order/order.module';
import { BillingPageModule } from '../pages/billing/billing.module';
import { AnalyticsPageModule } from '../pages/analytics/analytics.module';
// Providers
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';
import { Push } from '@ionic-native/push';
// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { MomentModule } from 'angular2-moment';

import { DatePicker } from '@ionic-native/date-picker';

export const firebaseConfig = {
  apiKey: "AIzaSyD5-GtfArEanLasYBxACCsKZCAwX_lQp3I",
  authDomain: "atiempo-5533e.firebaseapp.com",
  databaseURL: "https://atiempo-5533e.firebaseio.com",
  projectId: "atiempo-5533e",
  storageBucket: "atiempo-5533e.appspot.com",
  messagingSenderId: "212855483806"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    OrdersPageModule,
    OrderPageModule,
    BillingPageModule,
    AnalyticsPageModule,
    RoundProgressModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatabaseProvider,
    Push,
    Firebase,
    DatePicker
  ]
})
export class AppModule {}

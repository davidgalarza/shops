import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { AuthProvider } from '../providers/auth/auth'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  zone: NgZone
  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: AuthProvider, public push: Push, public alertCtrl: AlertController) {
    this.initializeApp();
    this.zone = new NgZone({});
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage, icon:'md-planet' },
      { title: 'Estadisticas', component: AnalyticsPage, icon:'md-list' },
      {title: 'Cerrar sesión', component: null, icon:'md-log-out'}
    ];

  }

  initializeApp() {
    const unsubscribe = this.auth.getAuth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.component) {
      this.nav.setRoot(page.component);
  } else {
      // Since the component is null, this is the logout option
      // ...
      this.auth.logout();
      
      // redirect to home
      this.nav.setRoot(LoginPage);
  }
  }
  
}

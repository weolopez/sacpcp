import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {ListPage} from './pages/list/list';
import {LogonPage} from './pages/logon/logon';
import * as firebase from 'firebase';
import {FIREBASE_PROVIDERS, AuthProviders, AuthMethods, AngularFire} from 'angularfire2'

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = TabsPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public af: AngularFire
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Logon', component: LogonPage },
      { title: 'Home', component: TabsPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    const
      fbConf = {
        apiKey: "AIzaSyA0K2ZncwedgeS8enAzBx89p-8WxPecvrU",
        authDomain: "sacpcp-89085.firebaseapp.com",
        databaseURL: "https://sacpcp-89085.firebaseio.com",
        storageBucket: "sacpcp-89085.appspot.com",
        provider: AuthProviders.Google,
        method: AuthMethods.Redirect
      };
    const myFirebaseAuthConfig = {
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    }
    firebase.initializeApp(fbConf);
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
   login() {
    this.af.auth.login();
  }
}

ionicBootstrap(MyApp);

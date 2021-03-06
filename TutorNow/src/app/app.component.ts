import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Meteor } from 'meteor/meteor';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChooseServicePage } from '../pages/choose-service/choose-service';
import { ProviderSummaryPage } from '../pages/provider-summary/provider-summary';
import { ClientSummaryPage } from '../pages/client-summary/client-summary';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { InProgressPage } from '../pages/in-progress/in-progress';
import { GalleryPage } from '../pages/gallery/gallery';
import { RoutingPage } from '../pages/routing/routing';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.rootPage = Meteor.user() ? HomePage : LoginPage;

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Find a Tutor', component: HomePage },
      //{ title: 'Choose Services', component: ChooseServicePage },
      { title: 'Be a Tutor', component: ListPage },
      //{ title: 'Provider Summary', component: ProviderSummaryPage },
      //{ title: 'Client Summary', component: ClientSummaryPage },
      { title: 'Account Settings', component: AccountSettingsPage },
      //{ title: 'Tutoring In Progress', component: InProgressPage },
      //{ title: 'Gallery', component: GalleryPage},
      //{ title: 'Routing', component: RoutingPage },


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

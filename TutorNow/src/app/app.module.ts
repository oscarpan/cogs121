import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { LoginService } from '../services/login';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChooseServicePage } from '../pages/choose-service/choose-service';
import { ProviderSummaryPage } from '../pages/provider-summary/provider-summary';
import { ClientSummaryPage } from '../pages/client-summary/client-summary';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChooseServicePage,
    ProviderSummaryPage,
    ClientSummaryPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbbL-N6oKQCmzBdAwtLzJ6jz9yB9Uwmkk'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChooseServicePage,
    ProviderSummaryPage,
    ClientSummaryPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LoginService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

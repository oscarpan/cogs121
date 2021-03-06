import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';

import { LoginService } from '../services/login';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChooseServicePage } from '../pages/choose-service/choose-service';
import { ProviderSummaryPage } from '../pages/provider-summary/provider-summary';
import { ClientSummaryPage } from '../pages/client-summary/client-summary';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { ClientRequestPage } from '../pages/client-request/client-request';
import { InProgressPage } from '../pages/in-progress/in-progress';
import { RoutingPage } from '../pages/routing/routing';

import { DirectionsMapDirective } from '../pages/routing/directions';

import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera'


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
    AccountSettingsPage,
    ClientRequestPage,
    InProgressPage,
    RoutingPage,
    DirectionsMapDirective,
  ],
  imports: [
    Ionic2RatingModule,
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
    AccountSettingsPage,
    ClientRequestPage,
    InProgressPage,
    RoutingPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ImagePicker,
    Camera,
    LoginService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

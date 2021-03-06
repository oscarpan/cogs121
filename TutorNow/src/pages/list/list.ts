import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { Providers } from 'api/collections/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { TutorLocations } from 'api/collections/tutor-locations';
import { Observable, Subscription } from 'rxjs';
import { Request, Acknowledge } from 'api/models';
import { Requests } from 'api/collections/requests';
import { Acknowledges } from 'api/collections/acknowledges';
import { InProgressPage } from '../in-progress/in-progress';
import { RoutingPage } from '../routing/routing';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit, OnDestroy {
  intervalObs: Subscription;
  isActive:boolean = false;
  position:Position;
  lat:number;
  lng:number;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, 
    private platform:Platform, private geolocation: Geolocation) {

  }

  private observeHandle;

  ngOnInit() : void {
    this.intervalObs = this.reloadLocation().flatMapTo(
      Observable.interval(5000).timeInterval()).subscribe(() => {this.reloadLocation();});
  }

  ngOnDestroy() {
    if(this.intervalObs) {
      this.intervalObs.unsubscribe();
    }
    if(this.observeHandle) {
      this.observeHandle.stop();
    }
  }

  reloadLocation() {
    return Observable.fromPromise(
      this.geolocation.getCurrentPosition().then((position) => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        if(this.isActive) {
          this.publishLocation();
        }
        Meteor.users.update(Meteor.userId(),{$set: {'profile.lat': position.coords.latitude, 'profile.lng': position.coords.longitude}});
      }
    ));
  }

  startObservingRequests() {
    const cursor = Requests.find({
      requesteeId: Meteor.userId()
    });

    let alertCtrl = this.alertCtrl;
    let navCtrl = this.navCtrl;
    let observeHandle = cursor.observe({
      added(req:Request) {
        if(req.requesteeId === Meteor.userId()) {
          let requester:Meteor.User = Meteor.users.findOne(req.requesterId);
          let alert =  alertCtrl.create({
            title: 'Incoming request',
            subTitle: 'Request from ' + requester.profile.name,
            buttons: [
              {
                text: 'Reject',
                role: 'cancel',
                handler: () => {
                  Acknowledges.insert({
                    requesterId: req.requesterId,
                    requesteeId: req.requesteeId,
                    handshake: req.handshake,
                    accepted: false
                  });
                  Requests.remove(req._id);
                }
              },
              {
                text: "Accept",
                handler: () => {
                  const acknowledgeId = Acknowledges.collection.insert({
                    requesterId: req.requesterId,
                    requesteeId: req.requesteeId,
                    handshake: req.handshake,
                    accepted: true
                  });
                  console.log("created", acknowledgeId);
                  observeHandle.stop();
                  Requests.remove(req._id);

                  let navTransition = alert.dismiss();

                  navTransition.then(() => {
                    // push new view and join session
                    navCtrl.setRoot(RoutingPage, {
                      acknowledgeId: acknowledgeId,
                    }, {
                      animate: true
                    })
                  })
                  return false;
                }
              },
            ]
          });
          alert.present();
          this.observeHandle = observeHandle;
        }
      }
    });
  }

  goOnline() : void {
    this.isActive = true;
    this.startObservingRequests();
  }

  goOffline() : void {
    this.isActive = false;
    Meteor.call('TutorLocations.setActive', false);
    if(this.observeHandle) {
      this.observeHandle.stop();
      this.observeHandle = false;
    }
  }

  publishLocation() : void {
    Meteor.call('TutorLocations.publishLocation', this.lat, this.lng);
  }

  public customStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwPush , SwUpdate } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private snackBar: MatSnackBar,
              private swPush: SwPush,
              private swUpdate: SwUpdate,
              private http: HttpClient) {

  }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      // You might be online
      (document.querySelector('body') as any).style = '';
    } else {
      // 100% Sure you are offline
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }

  subscribeToPush() {
    Notification.requestPermission( permission => {
      if (permission === 'granted') {
        // tslint:disable-next-line: max-line-length
        this.swPush.requestSubscription({ serverPublicKey: 'BDba0XsWDVT6Qx9yAHTUeQL_RQ-TbmV2V349bKVP5BNiLaObYO8UkY0QWYSQZ45t-vvvmMisqEekXo_ILKL560c'})
        .then(sub => this.sendToServer(sub))
        .catch(err => console.error('Could not subscribe to notifications', err));
      }
    });
  }
  sendToServer(params: any) {
    this.http.post('http://localhost:3000/notifications', { notification : params }).subscribe();
  }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {
        const snackBarRef = this.snackBar.open('There is an update available', 'Install Now', {duration: 4000});
        snackBarRef.onAction().subscribe(() => {
          this.swUpdate.activateUpdate().then(() => location.reload());
        });
      });
    }
    this.swUpdate.checkForUpdate();


    // Checking Network Status
    this.updateNetworkStatusUI();
    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);

    if ((navigator as any).standalone === false) {
      // This is an iOS device and we are in the browser
      this.snackBar.open('You can add this PWA to the Home Screen', '', { duration: 3000 });
    }
    if ((navigator as any).standalone === undefined) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          const sb = this.snackBar.open('Do you want to install this App?', 'Install',
            {duration: 5000});
          sb.onAction().subscribe( () => {
             (event as any).prompt();
             (event as any).userChoice.then( result => {
                if (result.outcome === 'dismissed') {
                  // TODO: Track no installation
                } else {
                  // TODO: It was installed
                }
             });
          });
          return false;
        });
      }
    }
  }
}

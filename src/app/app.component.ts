import { AuthService } from './auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedFeature = 'recipe';
  user: any;

  constructor(private authService: AuthService){}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: ' AIzaSyDT-S__Kw5r14IxAEMrfM6liCgfh10b4tw ',
      authDomain: 'course-project-38263.firebaseio.com'
    });
    // this.authService.keepLoggedInUser();
    console.log('Im first');
    this.user = this.authService.getUserName();
    console.log(this.user);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }


    ngOnDestroy(){
      this.authService.destroyUser();
    }
}

import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
  error: any;
  token: string;  

  constructor(public afAuth: AngularFireAuth,
              private router: Router) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(
      user => {
        if (user) {
          this.currentUser = user;
        }else {
          this.currentUser = null;
        }
      }
    );
  }

  getAuthState(){
    return this.authState;
  }

  signupUser(email: string, username: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
            console.log(this.error);
            console.log(this.currentUser);
          })
          .catch(
            error => {
              console.log(error);
              alert(error['message']);
              this.error = error;
            })
  }
  
  signinUser(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(
      response => {
                this.router.navigate(['/']);
                this.currentUser.getIdToken()
                  .then(
                    (token: string) => {
                      this.token = token;
                      console.log('My token is' + this.token);
                      if (this.token) {
                      localStorage.setItem('currentUser', JSON.stringify(
                        { username: this.currentUser.displayName, token: token }));
                      console.log('LocalStorage is true');
                    } else {
                      console.log('LocalStorage is false');
                      ;
                    }
                  }
                  )})      
            .catch(
              error => console.log(error)
            );
  }












  
  email: string;
  password: string;
  point: boolean;

  // constructor(private router: Router) {
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   this.token = currentUser && currentUser.token;
  // }

  // signinUser(email: string, password: string, point: boolean) {
  //   if (point){
  //   this.email = email;
  //   this.password = password;
  //   this.point = point;
  //   }
    
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         this.router.navigate(['/']);
  //         firebase.auth().currentUser.getIdToken()      
  //           .then(
  //             (token: string) => {
  //               this.token = token;
  //               console.log(firebase.auth().currentUser);
  //               console.log('My token is' + this.token);
  //               if (this.token) {
  //             localStorage.setItem('currentUser', JSON.stringify({ username: firebase.auth().currentUser.displayName, token: token }));
  //                 console.log('LocalStorage is true');
  //             } else {
  //               console.log('LocalStorage is false');
  //               ;
  //             }
  //           }
  //           )})      
  //     .catch(
  //       error => console.log(error)
  //     );
  // }

  // signinUser(email: string, password: string, point: boolean) {
  //   if (point){
  //   this.email = email;
  //   this.password = password;
  //   this.point = point;
  //   }
    
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         this.router.navigate(['/']);
  //         firebase.auth().currentUser.getIdToken()
  //         // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); 
  //       })         
  //           .then(
  //             (token: string) => {
  //               this.token = token;
  //               console.log(firebase.auth().currentUser);
  //               // console.log(this.token);
  //             //   if (this.token) {
  //      //     localStorage.setItem('currentUser', JSON.stringify({ username: firebase.auth().currentUser.displayName, token: token }));
  //             //     console.log('LocalStorage is true');
  //             // } else {
  //             //   console.log('LocalStorage is false');
  //             //   ;
  //             // }
  //           }
  //           )      
  //     .catch(
  //       error => console.log(error)
  //     );
  // }
  


  logout() {
    firebase.auth().signOut()
    this.token = null;
    this.error = undefined;
    this.email = null;
    this.password = null;
    this.point = null;
    localStorage.removeItem('currentUser');
    console.log(this.error);
    console.log(firebase.auth().currentUser);
  }
  destroyUser(){
    if (this.point) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }else {
      this.logout();
    }
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
  getUserName() {
    const user = firebase.auth().currentUser;
    console.log(user);    
    let author;
    if (user != null) {
      author = user.displayName;
      return author;
    }else{
      return null;
    }
    
  }
  getCurrentUserInfo(){
    const user = firebase.auth().currentUser;
    return (user);
  }

  setCurrentUserInfo(username: string, imagePath: string ) {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: username,
      photoURL: imagePath
    })
    .catch(
      error => console.log('Exoume auto to  ' +error)
    )
    this.router.navigate(['/profile']);
  }


}

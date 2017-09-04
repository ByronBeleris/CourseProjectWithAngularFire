import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  error: any;
  email: string;
  password: string;
  point: boolean;

  constructor(private router: Router) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  signupUser(email: string, username: string, password: string, photoUser: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: username,
          photoURL: photoUser
        });
        console.log(this.error);
        console.log(firebase.auth().currentUser);
      })
      .catch(
        error => {
          console.log(error);
          alert(error['message']);
          this.error = error;
        }
        

      );
      if ( this.error === undefined) {
      // this.router.navigate(['/']);               //  Problem with currentUser. Returns null
      // firebase.auth().currentUser.getIdToken()
      // .then(
      //   (token: string) => {
      //     this.token = token;
      //     console.log(firebase.auth().currentUser)}
      // )
      alert('Registration complete. Log in to continue')
      this.router.navigate(['/signin']);
      }

    }

  

  signinUser(email: string, password: string, point: boolean) {
    if (point){
    this.email = email;
    this.password = password;
    this.point = point;
    }
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()      
            .then(
              (token: string) => {
                this.token = token;
                console.log(firebase.auth().currentUser);
                console.log('My token is' + this.token);
                if (this.token) {
              localStorage.setItem('currentUser', JSON.stringify({ username: firebase.auth().currentUser.displayName, token: token }));
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

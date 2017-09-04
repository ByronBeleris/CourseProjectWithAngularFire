import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  author: string;
  image: any;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.author = this.authService.getCurrentUserInfo().displayName;
    if (this.authService.getCurrentUserInfo().photoURL != null){
      this.image = this.authService.getCurrentUserInfo().photoURL;
    }else{
      this.image = 'https://static.pexels.com/photos/5205/food-healthy-vegetables-potatoes.jpg';
    }
  }

  onSubmit( form: NgForm ) {
    const author = this.author;
    const image = form.value.image;
    this.image = image;
    this.authService.setCurrentUserInfo(author, image);
  }


}

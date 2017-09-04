// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent implements OnInit{
  show = false;
  showManage = false;
  author: string;
  image: any;
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  // onSaveData() {
  //   this.dataStorageService.storeRecipes()
  //     .subscribe(
  //       (response) => {
  //       // (response: HttpEvent<Object>) => {
  //         console.log(response);
  //         // console.log(response.type === HttpEventType.Response);
  //       }
  //     );
  // }

  // onFetchData() {
  //   this.dataStorageService.getMyRecipes();
  // }

  

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    
    this.author = this.authService.getCurrentUserInfo().displayName;
    if (this.authService.getCurrentUserInfo().photoURL != null){
      this.image = this.authService.getCurrentUserInfo().photoURL;
    }else{
      this.image = 'https://static.pexels.com/photos/5205/food-healthy-vegetables-potatoes.jpg';
    }
    console.log('From Header Log. User is: '+ this.author + this.image);
    return this.authService.isAuthenticated();
  }
  toggleCollapse() {
    this.show = !this.show;
  }
  toggleManage() {
    this.showManage = !this.showManage;
  }
  hideTog() {
    this.show = false;
    this.showManage = false;
  }
    
  ngOnInit(){
    
  }
   

    
}

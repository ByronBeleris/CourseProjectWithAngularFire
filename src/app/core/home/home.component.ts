import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user= '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUserName();
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {

  get user(){
    return this.authservice.usuar;
  }
  constructor(private route : Router, private authservice : AuthService){

  }


  logout(){
    this.route.navigateByUrl('/auth')
    this.authservice.logout();
  }
}

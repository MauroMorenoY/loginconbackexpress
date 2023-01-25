import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miformulario : FormGroup = this.fb.group({
    email : ['', [Validators.required , Validators.email ]],
    password : ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb : FormBuilder, 
    private route : Router,
    private authservice : AuthService){
  }

  login(){

    const {email, password} = this.miformulario.value;

    this.authservice.login(email,password)
    .subscribe(resp => {
      if(resp === true){
        this.route.navigateByUrl('/dashboard') 
      }
      else{
        Swal.fire({
          title: 'Error!',
          text: resp,
          icon: 'error',
          confirmButtonText: 'Bueno :,v'
        })

      }
  
    })
    
    // this.route.navigateByUrl('/dashboard')
  }
}

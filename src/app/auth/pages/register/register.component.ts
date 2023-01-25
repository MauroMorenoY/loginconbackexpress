import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  formulario : FormGroup = this.fb.group ({
    name : ['', [Validators.required]],
    email : ['', [Validators.required , Validators.email ]],
    password : ['', [Validators.required, Validators.minLength(6)]]

  })
  constructor(private fb : FormBuilder,private route : Router, private authservice : AuthService){

  }

  registro(){
    const {name, email,password } = this.formulario.value
    this.authservice.registro(name,email,password)
    .subscribe( resp => {if(resp === true) {
      Swal.fire({
        title: 'Registro exitoso',
        text: resp,
        icon: 'success',
        confirmButtonText: 'Bueno :v'
      })

      this.route.navigateByUrl('/auth')


    }
    else {
      Swal.fire({
        title: 'Esta cuenta ya existe',
        text: resp,
        icon: 'error',
        confirmButtonText: 'oh no :,,,v'
      })
    }
  
  
  } )
  
  }
}

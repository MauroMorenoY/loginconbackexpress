import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { authresponse, usuario } from '../interfaces/auth.interface';
import { environment } from '../../../../environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user! : usuario;
  private base : string = environment.baseUrl

  get usuar(){
    return {...this._user}
  }
  constructor(private http : HttpClient) { }


  registro(name : string, email: string, password : string){

    const body = {name,email,password}
    return this.http.post<authresponse>(`${this.base}/auth/new`, body)
    .pipe(
      map(res => res.ok),
      catchError(err => of(err.error.msg))
    )
  }

  login(email: string, password : string){

    const body = {email, password}
    return this.http.post<authresponse>(`${this.base}/auth`, body)
    .pipe(
      tap(resp =>{
        if (resp.ok){
          localStorage.setItem('token', resp.token!)
          this._user = {
            name : resp.name!,
            uid : resp.uid!,
            email : resp.email!
          }
           
        }
      }),
      map(res => res.ok),
      catchError(err => of(err.error.msg))
    );
  }

  validartoken(){
    const url = `${this.base}/auth/renew`;
    const headers = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<authresponse>(url , {headers})
    .pipe(
      map( resp => {
        localStorage.setItem('token', resp.token!)
        this._user = {
          name : resp.name!,
          uid : resp.uid!,
          email : resp.email!
        }
          
        return resp.ok
      }),
      catchError(err => of(false))
    )
  }

  logout(){
    localStorage.clear();
    // localStorage.removeItem('token')//elimina solo un elemento 
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { ApplicationSettings } from '@nativescript/core';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessApiService {
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  private url = 'https://api.abb.co.id/api/';
  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }

  // !--------------------------for Handle Error----------------
  handleError(error: HttpErrorResponse) {
    return throwError(error); 
  }

  get refresh() {
    return this._refresh;
  }

  // ! aksen dengan token
  getWithToken(apiUrl: any): Observable<any> {
    const token =  ApplicationSettings.getString('token');
    return this.http.get<any>(this.url + apiUrl, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        })
      }).pipe(
      catchError(this.handleError),
    );
  }

  getByIdWithToken(data: any, apiUrl: any): Observable<any> {
    const token =  ApplicationSettings.getString('token');
    return this.http.get<any>(this.url + apiUrl + data.id, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        })
      }).pipe(
      catchError(this.handleError),
    );
  }

  addWithToken(data: any, apiUrl: any): Observable<any> {
    const token =  ApplicationSettings.getString('token');
    return this.http.post<any>(this.url + apiUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
  // ! aksen dengan token
  // ! |
  // ! |
  // ! |
  // ! |
  // ! aksen tanpa token
  login(user: any): Observable<any> {
    return this.http.post<any>(this.url + 'auth/login', user, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
    ).pipe(
      catchError(this.handleError),
    );
  }

  resetPassword(user: any): Observable<any> {
    return this.http.post<any>(this.url + 'auth/resetpassword', user, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
    ).pipe(
      catchError(this.handleError),
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.url + 'auth/logout').pipe(
      catchError(this.handleError),
    );
  }
  // ! aksen tanpa token

}

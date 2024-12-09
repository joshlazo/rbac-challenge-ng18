import { Injectable, OnInit } from '@angular/core';
import { catchError, first, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    return this.http.post<any>('https://reqres.in/api/login/', { email, password })
  }

  register(credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    this.http.post<any>('https://reqres.in/api/register/', { email, password }).subscribe();
  }

  getUserById(id: string) {
    return this.http.get<any>(`https://reqres.in/api/users/${id}`)
      .pipe(
        first(),
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]);
        })
      )
  }

  getUsersData(page: number) {
    return this.http.get<any>(`https://reqres.in/api/users?page=${page}`)
      .pipe(
        first(),
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]);
        })
      )
  }

  getResourcesData(page: number) {
    return this.http.get<any>(`https://reqres.in/api/unknown?page=${page}`)
      .pipe(
        first(),
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]);
        })
      )
  }
}

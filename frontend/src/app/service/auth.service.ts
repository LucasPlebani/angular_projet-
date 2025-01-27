import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signupToApi(
    name: string,
    email: string,
    password: string
  ): Observable<string[]> {
    return this.http.post<any[]>(`${this.apiUrl}/signup`, {
      name,
      email,
      password,
    });
  }

  loginToApi(email: string, password: string): Observable<string[]> {
    return this.http.post<any[]>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }
}

// cors fait en sorte que les requêtes soient effectuées (sinon bloquées)
// faire un service auth pour gérer l'authentification
// apiUrl = 'http://localhost:3000';
// faire une fonction ts qui va utiliser la requête de node

// importer le httpClient dans le app, le httpclientmodule est déprécié
// https://angular.dev/api/common/http/HttpClient

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  titre: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/article`);
  }
}

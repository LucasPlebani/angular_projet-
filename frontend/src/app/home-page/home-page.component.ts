import { Component } from '@angular/core';
import { Article, ArticleService } from '../service/article.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des articles :', error);
      }
    );
  }
}

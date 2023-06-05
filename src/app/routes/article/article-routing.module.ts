import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCreateComponent } from './create/create.component';
import { ArticleListComponent } from './list/list.component';
import { ArticleTagsComponent } from './tags/tags.component';
import { ArticleCategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'create', component: ArticleCreateComponent },
  { path: 'list', component: ArticleListComponent },
  { path: 'tags', component: ArticleTagsComponent },
  { path: 'category', component: ArticleCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}

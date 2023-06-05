import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleCreateComponent } from './create/create.component';
import { ArticleListComponent } from './list/list.component';
import { ArticleTagsComponent } from './tags/tags.component';
import { ArticleCategoryComponent } from './category/category.component';
import { MarkdownModule } from 'ngx-markdown';

const COMPONENTS: any[] = [
  ArticleCreateComponent,
  ArticleListComponent,
  ArticleTagsComponent,
  ArticleCategoryComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, ArticleRoutingModule, MarkdownModule.forChild()],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class ArticleModule {}

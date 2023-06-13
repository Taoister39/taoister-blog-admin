import { PostCategoryService } from 'app/services/post-category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostCategory } from 'app/models/postCategory';
import { PostService } from 'app/services/post.service';
import { filter, map } from 'rxjs';
import { CodeEnum, POST_TYPE_ENUM } from 'constants/enum';

@Component({
  selector: 'app-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ArticleCreateComponent implements OnInit {
  content = '';

  reactiveForm = this.formBuilder.group({
    title: [''],
    description: [''],
    type: [POST_TYPE_ENUM.ORIGINAL],
    category: [''],
  });

  tagInputValue = '';
  categories: PostCategory[] = [];
  articleTypes = [
    {
      value: POST_TYPE_ENUM.ORIGINAL,
      label: '原創',
    },
    {
      value: POST_TYPE_ENUM.TRANSLATION,
      label: '翻譯',
    },
    {
      value: POST_TYPE_ENUM.TRANSSHIPMENT,
      label: '轉載',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private postCategoryService: PostCategoryService
  ) {}

  ngOnInit() {}

  publish() {
    if (!this.reactiveForm.valid) return;

    return;

    // this.postService.create();
  }

  getCategoryList() {
    this.postCategoryService
      .findMany({ name: this.reactiveForm.value.category || '' })
      .pipe(
        filter(res => res.code === CodeEnum.SUCCESS),
        map(res => res.data)
      )
      .subscribe(data => {
        this.categories = data.lists || [];
      });
  }

  inputCategoryChange() {
    this.getCategoryList();
  }
}

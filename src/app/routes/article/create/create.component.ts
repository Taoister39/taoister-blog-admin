import { MatSnackBar } from '@angular/material/snack-bar';
import { PostCategoryService } from 'app/services/post-category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostCategory } from 'app/models/postCategory';
import { PostService } from 'app/services/post.service';
import { filter, map } from 'rxjs';
import { CodeEnum, POST_TYPE_ENUM } from 'constants/enum';
import { PostTagService } from 'app/services/post-tag.service';
import { PostTag } from 'app/models/postTag';
import { CreatePostReq, Post, UpdatePostReq } from 'app/models/post';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ArticleCreateComponent implements OnInit {
  content = '';

  reactiveForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    type: [POST_TYPE_ENUM.ORIGINAL, Validators.required],
    category: [''],
    tag: [''],
  });

  categories: PostCategory[] = [];
  selectedCategories: PostCategory[] = [];

  tags: PostTag[] = [];
  selectedTags: PostTag[] = [];

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

  id: string | undefined = undefined;
  updatePost: Post | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private postCategoryService: PostCategoryService,
    private postTagService: PostTagService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams.id ?? undefined;
    this.updatePost = this.router.getCurrentNavigation()?.extras?.state?.post as Post;

    // console.log(this);
    if (this.id && this.updatePost) {
      this.reactiveForm.patchValue({
        title: this.updatePost?.title,
        description: this.updatePost?.description,
        type: this.updatePost?.type,
      });

      this.content = this.updatePost?.content ?? '';
      this.selectedTags = this.updatePost?.tags ?? [];
      this.selectedCategories = this.updatePost?.categories ?? [];
    }
  }

  update() {
    if (!this.reactiveForm.valid) return;
    const { title, description, type } = this.reactiveForm.value;

    const updatePostReq: UpdatePostReq = {
      title: title ?? '',
      description: description ?? '',
      type: type ?? POST_TYPE_ENUM.ORIGINAL,
      content: this.content,
    };
  }

  publish() {
    if (!this.reactiveForm.valid) return;
    if (this.content === '') {
      this.matSnackBar.open('請輸入文章', '關閉', { duration: 500 });
      return;
    }
    const { title, description, type } = this.reactiveForm.value;

    const createPostReq: CreatePostReq = {
      title: title ?? '',
      content: this.content,
      type: type ?? POST_TYPE_ENUM.ORIGINAL,
    };

    if (this.selectedCategories.length > 0) {
      createPostReq.categories = this.selectedCategories.map(item => item.id);
    }
    if (this.selectedTags.length > 0) {
      createPostReq.tags = this.selectedTags.map(item => item.id);
    }
    if (description) {
      createPostReq.description = description;
    }

    this.postService
      .create(createPostReq)
      .pipe(
        filter(res => res.code === CodeEnum.SUCCESS),
        map(res => res.data)
      )
      .subscribe(() => {
        this.matSnackBar.open('文章創建成功', '關閉', { duration: 500 });
        this.reactiveForm.reset();
        this.selectedTags = [];
        this.selectedCategories = [];
        this.content = '';
      });
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
  getTagList() {
    this.postTagService
      .findMany({ name: this.reactiveForm.value.tag || '' })
      .pipe(
        filter(res => res.code === CodeEnum.SUCCESS),
        map(res => res.data)
      )
      .subscribe(data => {
        this.tags = data.lists || [];
      });
  }

  onCategorySelected(category: PostCategory) {
    // 处理选项选择事件
    console.log(category);

    if (!this.selectedCategories.map(item => item.id).includes(category.id)) {
      this.selectedCategories.push(category);
      this.reactiveForm.patchValue({ category: '' });
    }
  }
  onTagSelect(tag: PostTag) {
    if (!this.selectedTags.map(item => item.id).includes(tag.id)) {
      this.selectedTags.push(tag);
      this.reactiveForm.patchValue({ tag: '' });
    }
  }

  removeSelectedCategory(category: PostCategory) {
    const index = this.selectedCategories.map(item => item.id).indexOf(category.id);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
  }
  removeSelectedTag(tag: PostTag) {
    const index = this.selectedTags.map(item => item.id).indexOf(tag.id);
    if (index >= 0) {
      this.selectedTags.splice(index, 0);
    }
  }
}

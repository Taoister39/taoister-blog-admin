import { CreatePostCategoryReq } from './../../../models/postCategory';
import { map, filter } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { FindManyPostCategoryReq, PostCategory } from 'app/models/postCategory';
import { PostCategoryService } from 'app/services/post-category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CodeEnum, IS_DELETED_ENUM } from 'constants/enum';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class ArticleCategoryComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: '文章分類id', field: 'id' },
    { header: '文章分類名字', field: 'name' },
    { header: '文章分類描述', field: 'description' },
    { header: '文章分類創建時間', field: 'createdAt', sortable: true },
    { header: '文章分類更新時間', field: 'updatedAt', sortable: true },
    { header: '軟刪除', field: 'isDeleted' },
    {
      header: '操作',
      field: 'operation',
      type: 'button',
      pinned: 'right',
      width: '180px',
      buttons: [
        {
          type: 'icon',
          text: 'edit',
          icon: 'edit',
          tooltip: '編輯',
          click: (rowData: PostCategory) => this.openUpdate(rowData),
        },
        {
          type: 'icon',
          text: 'delete',
          icon: 'delete',
          tooltip: '真刪除',
          color: 'warn',
          pop: {
            title: '確認要刪除？',
            description: '這個是真刪除',
          },
          click: (rowData: PostCategory) => this.deleteCategory(rowData.id),
        },
      ],
    },
  ];

  lists!: PostCategory[];
  isLoading = true;
  total = 0;

  isDeleted: IS_DELETED_ENUM = IS_DELETED_ENUM.NO;

  page = 0;
  perPageSize = 10;

  reactiveForm = this.formBuilder.group({
    id: [],
    name: [],
    isDeleted: [-1],
  });

  constructor(
    private postCategoryService: PostCategoryService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snacke: MatSnackBar
  ) {}

  toggleChangeIsDeleted(row: PostCategory) {
    this.postCategoryService
      .update(row.id, {
        isDeleted: row.isDeleted === IS_DELETED_ENUM.NO ? IS_DELETED_ENUM.YES : IS_DELETED_ENUM.NO,
      })
      .pipe(filter(res => res.code === CodeEnum.SUCCESS))
      .subscribe(() => this.updateList());
  }

  ngOnInit() {
    this.updateList();
  }

  deleteCategory(id: string) {
    this.postCategoryService
      .delete(id)
      .pipe(filter(res => res.code === CodeEnum.SUCCESS))
      .subscribe(_ => {
        this.snacke
          .open('刪除成功', '', { duration: 500 })
          .afterOpened()
          .subscribe(() => {
            this.updateList();
          });
      });
  }

  openCreate() {
    this.dialog
      .open(ArticleCategoryDialogComponent, {
        data: {
          isCreate: true,
        },
      })
      .afterClosed()
      .subscribe(() => this.updateList());
  }
  openUpdate(postCategory: PostCategory) {
    this.dialog
      .open(ArticleCategoryDialogComponent, {
        data: {
          isCreate: false,
          postCategory,
        },
      })
      .afterClosed()
      .subscribe(() => this.updateList());
  }

  searchCategory() {
    this.updateList();
  }

  pageChange(index: number) {
    this.page = index;
    this.updateList();
  }

  updateList() {
    this.isLoading = true;
    const findManyPostCategoryReq: FindManyPostCategoryReq = {
      offset: this.page,
      limit: this.perPageSize,
    };
    const { id, name, isDeleted } = this.reactiveForm.value;

    if (id) {
      findManyPostCategoryReq.id = id;
    }
    if (name) {
      findManyPostCategoryReq.name = name;
    }
    if (isDeleted !== -1) {
      findManyPostCategoryReq.isDeleted = isDeleted as IS_DELETED_ENUM;
    }

    this.postCategoryService
      .findMany(findManyPostCategoryReq)
      .pipe(
        filter(res => res.code === CodeEnum.SUCCESS),
        map(data => data.data)
      )
      .subscribe(response => {
        this.lists = response.lists || [];
        this.total = response.totalItems;

        this.isLoading = false;
      });
  }

  reset() {
    this.reactiveForm.reset({ isDeleted: IS_DELETED_ENUM.NO });
  }
}

interface ArticleCategoryDialogComponentProps {
  isCreate: boolean;
  postCategory: PostCategory;
}

@Component({
  templateUrl: './category-dialog.component.html',
})
export class ArticleCategoryDialogComponent implements OnInit {
  createCategoryForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  isClosed = false;

  constructor(
    private fb: FormBuilder,
    private postCategoryService: PostCategoryService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ArticleCategoryDialogComponentProps
  ) {}
  ngOnInit(): void {
    if (!this.data.isCreate) {
      this.createCategoryForm.setValue({
        name: this.data.postCategory.name,
        description: this.data.postCategory.description ?? '',
      });
    }
  }

  submit() {
    const { name, description } = this.createCategoryForm.value;

    if (!name) {
      this.snackBar.open('請輸入文章分類名');
      return;
    }

    const createPostCategoryReq: CreatePostCategoryReq = { name };
    if (description) createPostCategoryReq.description = description;

    if (this.data.isCreate) {
      this.postCategoryService
        .create(createPostCategoryReq)
        .pipe(
          filter(res => res.code === CodeEnum.SUCCESS),
          map(res => res.data)
        )
        .subscribe(data => {
          console.log(data);
          this.snackBar.open('提交成功', '', { duration: 500 });
          this.isClosed = true;
        });
    } else {
      const postCategory = this.data.postCategory;
      this.postCategoryService
        .update(postCategory.id, createPostCategoryReq)
        .pipe(
          filter(res => res.code === CodeEnum.SUCCESS),
          map(res => res.data)
        )
        .subscribe(_ => {
          this.snackBar.open('修改成功', '', { duration: 500 });
          this.isClosed = true;
        });
    }
  }
}

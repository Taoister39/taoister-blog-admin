import { FormBuilder, Validators } from '@angular/forms';
import { PostTagService } from './../../../services/post-tag.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { CreatePostTagReq, FindManyPostTagReq, PostTag } from 'app/models/postTag';
import { CodeEnum, IS_DELETED_ENUM } from 'constants/enum';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-article-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class ArticleTagsComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: '文章標籤id', field: 'id' },
    { header: '文章標籤名字', field: 'name' },
    { header: '裝標籤描述', field: 'description' },
    { header: '文章標籤創建時間', field: 'createdAt', sortable: true },
    { header: '文章標籤更新時間', field: 'updatedAt', sortable: true },
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
          click: (rowData: PostTag) => this.openUpdate(rowData),
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
          click: (rowData: PostTag) => this.deleteTag(rowData.id),
        },
      ],
    },
  ];

  lists!: PostTag[];
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
    private postTagService: PostTagService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snacke: MatSnackBar
  ) {}

  toggleChangeIsDeleted(row: PostTag) {
    this.postTagService
      .update(row.id, {
        isDeleted: row.isDeleted === IS_DELETED_ENUM.NO ? IS_DELETED_ENUM.YES : IS_DELETED_ENUM.NO,
      })
      .pipe(filter(res => res.code === CodeEnum.SUCCESS))
      .subscribe(() => this.updateList());
  }

  ngOnInit() {
    this.updateList();
  }

  deleteTag(id: string) {
    this.postTagService
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
      .open(ArticleTagDialogComponent, {
        data: {
          isCreate: true,
        },
      })
      .afterClosed()
      .subscribe(() => this.updateList());
  }
  openUpdate(postTag: PostTag) {
    this.dialog
      .open(ArticleTagDialogComponent, {
        data: {
          isCreate: false,
          postCategory: postTag,
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
    const findManyPostCategoryReq: FindManyPostTagReq = {
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

    this.postTagService
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

interface ArticleTagDialogComponentProps {
  isCreate: boolean;
  postCategory: PostTag;
}

@Component({
  templateUrl: './tag-dialog.component.html',
})
export class ArticleTagDialogComponent implements OnInit {
  createTagForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  isClosed = false;

  constructor(
    private fb: FormBuilder,
    private postTagService: PostTagService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ArticleTagDialogComponentProps
  ) {}
  ngOnInit(): void {
    if (!this.data.isCreate) {
      this.createTagForm.setValue({
        name: this.data.postCategory.name,
        description: this.data.postCategory.description ?? '',
      });
    }
  }

  submit() {
    const { name, description } = this.createTagForm.value;

    if (!name) {
      this.snackBar.open('請輸入文章標籤名');
      return;
    }

    const createPostCategoryReq: CreatePostTagReq = { name };
    if (description) createPostCategoryReq.description = description;

    if (this.data.isCreate) {
      this.postTagService
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
      this.postTagService
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

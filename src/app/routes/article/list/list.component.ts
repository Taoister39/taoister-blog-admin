import { PostService } from 'app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Post, FindPostReq } from 'app/models/post';
import { filter, map } from 'rxjs';
import { CodeEnum, IS_DELETED_ENUM, IS_PUBLISHED_ENUM } from 'constants/enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  constructor(private postService: PostService, private router: Router) {}

  columns: MtxGridColumn[] = [
    { header: '文章ID', field: 'id' },
    { header: '文章標題', field: 'title' },
    { header: '文章分類', field: 'categories' },
    { header: '文章標籤', field: 'tags' },
    { header: '文章類型', field: 'type' },
    { header: '文章閱讀量', field: 'view' },
    { header: '文章簡介', field: 'description' },
    { header: '創建時間', field: 'createdAt' },
    { header: '更新時間', field: 'updatedAt' },
    { header: '是否發佈', field: 'isPublished' },
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
          click: (rowData: Post) =>
            this.router.navigateByUrl(`/article/create?id=${rowData.id}`, {
              state: { post: rowData },
            }),
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
          click: (rowData: Post) => this.deletePost(rowData.id),
        },
      ],
    },
  ];

  isLoading = true;

  ngOnInit() {
    this.getPostList();
  }

  posts: Post[] = [];
  count = 0;

  limit = 10;
  offset = 0;

  getPostList() {
    this.isLoading = true;
    const findPostReq: FindPostReq = { limit: this.limit, offset: this.offset };

    return this.postService
      .findMany(findPostReq)
      .pipe(
        filter(res => res.code === CodeEnum.SUCCESS),
        map(res => res.data)
      )
      .subscribe(data => {
        this.count = data.totalItems;
        this.posts = data.lists || [];

        this.isLoading = false;
      });
  }
  toggleChangeIsDeleted(post: Post) {
    this.postService
      .update(post.id, {
        isDeleted: post.isDeleted === IS_DELETED_ENUM.NO ? IS_DELETED_ENUM.YES : IS_DELETED_ENUM.NO,
      })
      .pipe(
        filter(res => res.code === CodeEnum.SUCCESS),
        map(res => res.data)
      )
      .subscribe(() => this.getPostList());
  }
  toggleChangeIsPublished(post: Post) {
    this.postService
      .update(post.id, {
        isPublished:
          post.isPublished === IS_PUBLISHED_ENUM.NO ? IS_PUBLISHED_ENUM.YES : IS_PUBLISHED_ENUM.NO,
      })
      .pipe(
        filter(res => res.code === CodeEnum.SUCCESS),
        map(res => res.data)
      )
      .subscribe(() => this.getPostList());
  }

  deletePost(id: string) {
    this.postService.delete(id).subscribe(() => this.getPostList());
  }
}

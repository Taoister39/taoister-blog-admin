import { PostService } from 'app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Post, FindPostReq } from 'app/models/post';
import { filter, map } from 'rxjs';
import { CodeEnum } from 'constants/enum';

@Component({
  selector: 'app-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  constructor(private postService: PostService) {}

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
          // click: (rowData: Post) => this.openUpdate(rowData),
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
          // click: (rowData: Post) => this.deleteTag(rowData.id),
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
  toggleChangeIsDeleted(post: Post) {}
}

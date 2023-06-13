import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostService } from 'app/services/post.service';

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
  });

  constructor(private formBuilder: FormBuilder, private postService: PostService) {}

  ngOnInit() {}

  publish() {
    if (!this.reactiveForm.valid) return;

    return;

    // this.postService.create();
  }
}

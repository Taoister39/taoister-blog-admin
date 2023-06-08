import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ArticleCreateComponent implements OnInit {
  content = '';

  createForm = this.formBuilder.group({
    title: [''],
    category: null,
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}
}

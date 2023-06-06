import { AboutService } from './../../services/about.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private aboutService: AboutService) {}

  private id!: string;
  private content!: string;

  public mdRenderContent = '';

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe(data => {
      this.id = data.id;
      this.content = data.content;
    });
  }
  handleSaveAbout() {
    if (this.id) {
      // 对于所有 HttpClient 方法，在你在方法返回的 Observable 上调用 subscribe() 之前，该方法都不会开始其 HTTP 请求。
      this.aboutService.updateAbout(this.id, { content: this.mdRenderContent }).subscribe();
    } else {
      this.aboutService.createAbout({ content: this.mdRenderContent }).subscribe();
    }
  }
  handleGetAbout() {
    this.mdRenderContent = this.content;
  }
}

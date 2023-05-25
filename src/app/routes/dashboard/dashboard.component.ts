import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  public message = 'this is default message';

  ngOnInit() {
    this.http.get<string>(environment.adminApiUrl).subscribe(data => {
      this.message = data;
      this.cdr.markForCheck();
    });
  }
}

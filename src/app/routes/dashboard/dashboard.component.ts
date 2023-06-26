import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { ADMIN_API_URL } from '@core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    @Inject(ADMIN_API_URL) private adminUrl: string
  ) {}

  public message = 'this is default message';

  ngOnInit() {
    this.http.get<string>(this.adminUrl).subscribe(data => {
      this.message = data;
      this.cdr.markForCheck();
    });
  }
}

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateComponent } from './create.component';

describe('ArticleCreateComponent', () => {
  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

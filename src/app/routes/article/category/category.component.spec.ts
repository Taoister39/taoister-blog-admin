import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCategoryComponent } from './category.component';

describe('ArticleCategoryComponent', () => {
  let component: ArticleCategoryComponent;
  let fixture: ComponentFixture<ArticleCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

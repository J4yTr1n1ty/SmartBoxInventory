import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDetiailPageComponent } from './box-detiail.page.component';

describe('BoxDetiailPageComponent', () => {
  let component: BoxDetiailPageComponent;
  let fixture: ComponentFixture<BoxDetiailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxDetiailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxDetiailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

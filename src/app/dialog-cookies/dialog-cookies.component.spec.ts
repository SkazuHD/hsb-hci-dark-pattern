import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCookiesComponent } from './dialog-cookies.component';

describe('DialogCookiesComponent', () => {
  let component: DialogCookiesComponent;
  let fixture: ComponentFixture<DialogCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCookiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

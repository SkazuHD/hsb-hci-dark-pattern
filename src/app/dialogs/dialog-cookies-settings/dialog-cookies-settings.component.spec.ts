import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCookiesSettingsComponent} from './dialog-cookies-settings.component';

describe('DialogCookiesSettingsComponent', () => {
  let component: DialogCookiesSettingsComponent;
  let fixture: ComponentFixture<DialogCookiesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCookiesSettingsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogCookiesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

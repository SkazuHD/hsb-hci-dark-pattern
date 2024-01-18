import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPromocodeComponent } from './dialog-promocode.component';

describe('DialogPromocodeComponent', () => {
  let component: DialogPromocodeComponent;
  let fixture: ComponentFixture<DialogPromocodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPromocodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogPromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultLayoutView} from './default-layout-view';

describe('StandaloneViewComponent', () => {
  let component: DefaultLayoutView;
  let fixture: ComponentFixture<DefaultLayoutView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultLayoutView]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DefaultLayoutView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

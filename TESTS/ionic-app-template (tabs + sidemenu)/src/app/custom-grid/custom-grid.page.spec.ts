import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGridPage } from './custom-grid.page';

describe('CustomGridPage', () => {
  let component: CustomGridPage;
  let fixture: ComponentFixture<CustomGridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomGridPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

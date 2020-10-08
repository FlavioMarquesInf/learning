import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressBookComponent } from './edit-address-book.component';

describe('EditAddressBookComponent', () => {
  let component: EditAddressBookComponent;
  let fixture: ComponentFixture<EditAddressBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

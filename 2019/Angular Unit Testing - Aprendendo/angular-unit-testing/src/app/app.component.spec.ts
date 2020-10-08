import { MyService } from './services/my.service';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let myServiceStub: any;
  let inboxModalServiceStub: any;

  beforeEach(async(() => {
    myServiceStub = {
      getPageName: jasmine.createSpy('getPageName').and.callFake(
        () => ''
      ),
      getUserInfo: jasmine.createSpy('getUserInfo').and.callFake( () => {
        return {
          displayName: 'Jack',
          rolesAsString: ''
        };
      }),
      getSiteInfo: jasmine.createSpy('getSiteInfo').and.callFake(
        () => Promise.resolve(true).then(() => {})
      ),
    };

    inboxModalServiceStub = {
      openModalListener(): Observable<any> {
        return of(true);
      }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: MyService, useValue: myServiceStub}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      // comp.isUnitTest = true;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  describe('component onInit', () => {
    it('can instantiate it', () => {
      expect(comp).not.toBeNull();
    });
  });

  it('should create the app', async () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-unit-testing'`, async () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-unit-testing');
  });

  it('should render title in a h1 tag', async () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-unit-testing!');
  });


  describe('Form', () => {
    it('should set submitted to true', async () => {
      comp.onSubmit();
      expect(comp.submitted).toBeTruthy();
    });

    it('should call the onSubmit method', async () => {
      fixture.detectChanges();
      spyOn(comp, 'onSubmit');
      el = fixture.debugElement.query(By.css('button')).nativeElement;
      el.click();
      expect(comp.onSubmit).toHaveBeenCalledTimes(0);
    });

    it('form should be invalid', async () => {
      comp.contactForm.controls.email.setValue('');
      comp.contactForm.controls.name.setValue('');
      comp.contactForm.controls.text.setValue('');
      expect(comp.contactForm.valid).toBeFalsy();
    });

    it('form should be valid', async () => {
      comp.contactForm.controls.email.setValue('asd@asd.com');
      comp.contactForm.controls.name.setValue('asdf');
      comp.contactForm.controls.text.setValue('qwert');
      expect(comp.contactForm.valid).toBeTruthy();
    });

  });

});

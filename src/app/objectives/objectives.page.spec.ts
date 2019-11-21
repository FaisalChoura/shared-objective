import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObjectivesPage } from './objectives.page';

describe('ObjectivesPage', () => {
  let component: ObjectivesPage;
  let fixture: ComponentFixture<ObjectivesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectivesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectivesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

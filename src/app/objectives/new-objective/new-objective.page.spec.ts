import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewObjectivePage } from './new-objective.page';

describe('NewObjectivePage', () => {
  let component: NewObjectivePage;
  let fixture: ComponentFixture<NewObjectivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewObjectivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewObjectivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

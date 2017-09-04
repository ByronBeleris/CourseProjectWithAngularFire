import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUsersItemComponent } from './recipe-users-item.component';

describe('RecipeUsersItemComponent', () => {
  let component: RecipeUsersItemComponent;
  let fixture: ComponentFixture<RecipeUsersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeUsersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeUsersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

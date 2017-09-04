import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUsersListComponent } from './recipe-users-list.component';

describe('RecipeUsersListComponent', () => {
  let component: RecipeUsersListComponent;
  let fixture: ComponentFixture<RecipeUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { RouterTestingModule } from '@angular/router/testing';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Menu,
        RouterTestingModule   // ✅ ESSENCIAL
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

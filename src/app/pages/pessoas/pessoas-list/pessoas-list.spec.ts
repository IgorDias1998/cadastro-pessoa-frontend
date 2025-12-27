import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasListComponent } from './pessoas-list';

describe('PessoasList', () => {
  let component: PessoasListComponent;
  let fixture: ComponentFixture<PessoasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

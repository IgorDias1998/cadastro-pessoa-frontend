import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasForm } from './pessoas-form';

describe('PessoasForm', () => {
  let component: PessoasForm;
  let fixture: ComponentFixture<PessoasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

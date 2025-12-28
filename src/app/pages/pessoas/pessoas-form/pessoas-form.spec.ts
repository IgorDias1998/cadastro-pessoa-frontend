import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PessoasFormComponent } from './pessoas-form';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PessoasFormComponent', () => {
  let component: PessoasFormComponent;
  let fixture: ComponentFixture<PessoasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PessoasFormComponent,       // ✅ standalone component
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(PessoasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // inicializa o form
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve deixar o formulário inválido quando vazio', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('deve tornar o formulário válido quando preenchido', () => {
    component.form.patchValue({
      nome: 'João',
      email: 'joao@email.com',
      dataNascimento: '2000-01-01',
      telefone: '11999999999',
      endereco: {
        cep: '01001000',
        logradouro: 'Rua X',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        numero: '100',
        complemento: ''
      }
    });

    expect(component.form.valid).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../../services/pessoa';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoas-form',
  standalone: true,
  providers: [MessageService],
  templateUrl: './pessoas-form.html'
})
export class PessoasFormComponent implements OnInit {

  id?: string;
  form: any; // inicialização tardia

  constructor(
    private fb: FormBuilder,
    private service: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private message: MessageService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        logradouro: ['', Validators.required],
        bairro: [''],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['']
      })
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.id) {
      this.service.buscarPorId(this.id).subscribe(p => this.form.patchValue(p));
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const pessoa = this.form.value;

    if (this.id) {
      this.service.atualizar(this.id, pessoa as any).subscribe({
        next: () => {
          this.message.add({ severity: 'success', summary: 'Atualizado com sucesso' });
          this.router.navigate(['/pessoas']);
        }
      });
    } else {
      this.service.criar(pessoa as any).subscribe({
        next: () => {
          this.message.add({ severity: 'success', summary: 'Criado com sucesso' });
          this.router.navigate(['/pessoas']);
        }
      });
    }
  }
}

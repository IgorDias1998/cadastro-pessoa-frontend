import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../../services/pessoa';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { PessoaAtualizarDTO } from '../../../models/pessoa-atualizar-dto';
import { PessoaCriarDTO } from '../../../models/pessoa-criar-dto';

@Component({
  selector: 'app-pessoas-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  templateUrl: './pessoas-form.html'
})
export class PessoasFormComponent implements OnInit {

  id?: string;
  form: any;

  constructor(
      private fb: FormBuilder,
      private service: PessoaService,
      private route: ActivatedRoute,
      private router: Router,
      private message: MessageService,
      private cd: ChangeDetectorRef
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
      this.service.buscarPorId(this.id).subscribe({
        next: (pessoa) => {
          console.log("Resposta GET /pessoas/{id}:", pessoa);

          this.form.patchValue({
            nome: pessoa.nome,
            email: pessoa.email,
            dataNascimento: this.formatarData(pessoa.dataNascimento),
            telefone: pessoa.telefone,
            endereco: {
              cep: pessoa.endereco.cep,
              logradouro: pessoa.endereco.logradouro,
              bairro: pessoa.endereco.bairro,
              cidade: pessoa.endereco.cidade,
              estado: pessoa.endereco.estado,
              numero: pessoa.endereco.numero,
              complemento: pessoa.endereco.complemento
            }
          });

          this.cd.detectChanges();
        },
        error: (err) => {
          console.error("Erro GET por ID:", err);
          this.message.add({ severity: 'error', summary: 'Erro ao carregar dados' });
        }
      });
    }
  }

  formatarData(data: string): string {
    const d = new Date(data);
    // Gera no formato yyyy-MM-dd
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  buscarCep() {
    console.log("buscarCep() chamado", this.form.get("endereco.cep")?.value);

    const cep = this.form.get("endereco.cep")?.value;
    if (!cep) return;

    this.service.buscarEnderecoPorCep(cep).subscribe({
      next: (data) => {
        this.form.patchValue({
          endereco: {
            cep: data.cep,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            numero: this.form.get("endereco.numero")?.value,
            complemento: data.complemento
          }
        });
      },
      error: () => {
        this.message.add({ severity: "error", summary: "CEP não encontrado ou erro na requisição" });
      }
    });
  }


  salvar() {
    if (this.form.invalid) {
      this.message.add({ severity: "warn", summary: "Preencha todos os campos obrigatórios" });
      return;
    }

    const formValue = this.form.value;

    const dto: PessoaAtualizarDTO = {
      nome: formValue.nome,
      email: formValue.email,
      dataNascimento: formValue.dataNascimento,
      telefone: formValue.telefone,
      cep: formValue.endereco.cep,
      numero: formValue.endereco.numero,
      complemento: formValue.endereco.complemento
    };

    if (this.id) {
      this.service.atualizar(this.id, dto).subscribe({
        next: () => {
          this.message.add({ severity: "success", summary: "Atualizado com sucesso" });
          this.router.navigate(['/pessoas']);
        },
        error: () => {
          this.message.add({ severity: "error", summary: "Erro ao atualizar pessoa" });
        }
      });
    } else {
      // Para criar, o DTO é o mesmo
      const createDto: PessoaCriarDTO = { ...dto };
      this.service.criar(createDto).subscribe({
        next: () => {
          this.message.add({ severity: "success", summary: "Criado com sucesso" });
          this.router.navigate(['/pessoas']);
        },
        error: () => {
          this.message.add({ severity: "error", summary: "Erro ao criar pessoa" });
        }
      });
    }
  }
}

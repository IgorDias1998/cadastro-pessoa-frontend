import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { Pessoa } from '../../../models/pessoa.model';
import { PessoaService } from '../../../services/pessoa';

@Component({
  selector: 'app-pessoas-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './pessoas-list.html',
  providers: [MessageService]
})
export class PessoasListComponent implements OnInit {

  pessoas: Pessoa[] = [];

  constructor(
    private service: PessoaService,
    private router: Router,
    private message: MessageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
        this.cd.detectChanges(); // FORÇA angular atualizar o template corretamente
      },
      error: (err) => {
        console.error("Erro Angular:", err);
        this.message.add({ severity: 'error', summary: 'Erro ao carregar' });
      }
    });
  }

  editar(id: string) {
    this.router.navigate(['/pessoas/editar', id]);
  }

  excluir(id: string) {
    this.service.excluir(id).subscribe(() => {
      this.message.add({ severity: 'success', summary: 'Removido com sucesso' });
      this.carregar();
    });
  }

  novo() {
    this.router.navigate(['/pessoas/novo']);
  }
}

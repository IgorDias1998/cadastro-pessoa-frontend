import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../models/pessoa.model';
import { PessoaAtualizarDTO } from '../models/pessoa-atualizar-dto';
import { PessoaCriarDTO } from '../models/pessoa-criar-dto';

@Injectable({ providedIn: 'root' })
export class PessoaService {

  private readonly apiUrl = 'https://localhost:7032/api/pessoas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  buscarPorId(id: string) {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  criar(PessoaCriarDTO: PessoaCriarDTO) {
    return this.http.post(this.apiUrl, PessoaCriarDTO);
  }

  atualizar(id: string, dto: PessoaAtualizarDTO) {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }

  excluir(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  buscarEnderecoPorCep(cep: string) {
    return this.http.get<any>(`https://localhost:7032/api/cep/${cep}`);
  }
}

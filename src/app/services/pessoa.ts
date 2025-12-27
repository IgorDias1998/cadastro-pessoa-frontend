import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../models/pessoa.model';

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

  criar(pessoa: Pessoa) {
    return this.http.post(this.apiUrl, pessoa);
  }

  atualizar(id: string, pessoa: Pessoa) {
    return this.http.put(`${this.apiUrl}/${id}`, pessoa);
  }

  excluir(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

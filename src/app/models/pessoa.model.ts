import { Endereco } from './endereco.model';

export interface Pessoa {
  id?: string; 
  nome: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  endereco: Endereco;
}
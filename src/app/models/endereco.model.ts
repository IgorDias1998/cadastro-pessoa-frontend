export interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento?: string | null;
}
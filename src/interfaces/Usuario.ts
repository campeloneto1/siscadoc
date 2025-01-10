import { Meta } from "./Meta";
import { Perfil } from "./Perfil";

export interface Usuario {
  id?: number;
  nome: string;
  cpf: string;
  telefone1: string;
  telefone2: string;
  email: string;
  perfil: Perfil;
}

export interface UsuariosResponse {
  data: Usuario[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: Meta;
}

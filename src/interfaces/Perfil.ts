import { Meta } from "./Meta";

export interface Perfil {
  id?: number;
  nome: string;
  administrador: boolean;
  gestor: boolean;
  relatorios: boolean;
}

export interface PerfisResponse {
  data: Perfil[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: Meta;
}


export const PAPEIS: IPapelVisualizacao[] = [
  {
    chave: 'usuario',
    descricao: 'Usuário',
  },
  {
    chave: 'admin',
    descricao: 'Administrador'
  },
]

export interface IPapelVisualizacao {
  chave: string;
  descricao: string;
}
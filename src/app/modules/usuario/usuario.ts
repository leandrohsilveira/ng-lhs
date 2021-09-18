import {IPapelVisualizacao} from './papel'

export type Genero = 'MASCULINO' | 'FEMININO'

interface IUsuario {
  id: string
  nome?: string
  genero?: Genero
  email: string
  username: string
  senha: string
  papeis: string[]
}

export interface IUsuarioIncluir
  extends Pick<
    IUsuario,
    'nome' | 'genero' | 'email' | 'username' | 'senha' | 'papeis'
  > {
  termosDeUsoAceito: boolean
}

export interface IUsuarioEditar
  extends Pick<IUsuario, 'id' | 'nome' | 'genero' | 'email' | 'papeis'> {}

export interface IUsuarioVisualizar
  extends Pick<IUsuario, 'id' | 'nome' | 'genero' | 'email' | 'username'> {
  papeis: IPapelVisualizacao[]
}

export interface IUsuarioListar
  extends Pick<IUsuario, 'id' | 'nome' | 'email' | 'username'> {}

export const USUARIOS: IUsuario[] = [
  {
    id: 'bc60f600-929b-47de-b9c1-1d74c9102474',
    nome: 'Administrator',
    email: 'admin@email.com',
    username: 'admin',
    senha: '123456',
    papeis: ['usuario', 'admin'],
  },
  {
    id: 'e57fcb5e-2081-49e4-9ee5-ee44947d4ba3',
    nome: 'Default User',
    email: 'user@email.com',
    username: 'user',
    senha: '123456',
    papeis: ['usuario'],
  },
]

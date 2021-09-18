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

export interface IUsuarioIncluir {
  nome?: string
  genero?: Genero
  email: string
  username: string
  senha: string
  papeis: string[]
  termosDeUsoAceito: boolean
}

export interface IUsuarioEditar {
  id: string
  nome?: string
  genero?: Genero
  email: string
  papeis: string[]
}

export interface IUsuarioVisualizar {
  id: string
  nome?: string
  genero?: Genero
  email: string
  username: string
  papeis: IPapelVisualizacao[]
}

export interface IUsuarioListar {
  id: string
  nome?: string
  email: string
  username: string
}

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

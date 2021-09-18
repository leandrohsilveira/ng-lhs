import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IUsuarioListar} from '../usuario'

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent {
  @Input()
  users: IUsuarioListar[] = []

  @Output()
  editar = new EventEmitter<IUsuarioListar>()

  onEditarClick(editar: IUsuarioListar) {
    this.editar.emit(editar)
  }
}

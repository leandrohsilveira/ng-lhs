export type FieldValidationErrorDisplay = 'always' | 'dirty' | 'touched'

export type FieldKeyEventType = 'up' | 'down' | 'enter'

export interface IFieldKeyEvent {
  type: FieldKeyEventType
  source: Event
}

export interface ICustomFieldValidationError {
  error: string
  message: string
}

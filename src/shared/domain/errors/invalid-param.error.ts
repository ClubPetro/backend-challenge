import { ValidationError } from './validation.error';

export class InvalidParamError extends ValidationError {
  constructor(param: string, message?: string) {
    super(param, message || `Parâmetro ${param} inválido`);
  }
}

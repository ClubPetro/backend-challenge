import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export enum ExceptionCodes {
  GenericException = '000',
  EntityNotFound = '001',
  Unauthorized = '002',
  TextLengthNotSatisfied = '003',
  ResourceNotFound = '004',
  FieldIsRequired = '005',
  EntityGone = '006',
  PropertyDoesNotExist = '007',
  UnauthorizedAccess = '008',
  EntityDuplicated = '009',
}

export class BaseException extends Error {
  @ApiProperty() code: ExceptionCodes;
  @ApiProperty() message: string;
  statusCode: number;

  constructor(
    public exceptionCode: ExceptionCodes,
    private exceptionMessage: string,
    private exceptionStatusCode: number = HttpStatus.BAD_REQUEST,
  ) {
    super(exceptionMessage);
    this.code = exceptionCode;
    this.message = exceptionMessage;
    this.statusCode = exceptionStatusCode;
  }
}

export class GenericException extends BaseException {
  constructor(error: any) {
    if (error instanceof Error) {
      super(ExceptionCodes.GenericException, error.message);
    } else {
      super(ExceptionCodes.GenericException, error);
    }
  }
}

export class PropertyDoesNotExist extends BaseException {
  constructor(field: string, entity?: string) {
    super(
      ExceptionCodes.PropertyDoesNotExist,
      `A propriedade "${field.toLowerCase()}" não existe ${
        entity ? `na "${entity.toLowerCase()}"` : '.'
      }`,
    );
  }
}

export class EntityGone extends BaseException {
  constructor(entity: string) {
    super(
      ExceptionCodes.EntityGone,
      `Este(a) ${entity} não existe mais no nosso sistema`,
      HttpStatus.GONE,
    );
  }
}

export class FieldIsRequired extends BaseException {
  constructor(field: string) {
    super(ExceptionCodes.FieldIsRequired, `O Campo "${field}" é obrigatorio`);
  }
}

export class ResourceNotFound extends BaseException {
  constructor() {
    super(
      ExceptionCodes.ResourceNotFound,
      'Este recurso não existe ou não está disponível',
    );
  }
}

export class TextLengthNotSatisfied extends BaseException {
  constructor(
    public field: string,
    public minLength: number,
    public maxLength: number,
  ) {
    super(
      ExceptionCodes.TextLengthNotSatisfied,
      `Este(a) campo "${field}" precisa de pelo menos ${minLength} charactere(s) e máximo de ${maxLength} charactere(s)`,
    );
  }
}

export class Unauthorized extends BaseException {
  constructor() {
    super(
      ExceptionCodes.Unauthorized,
      `Você não está autorizado a fazer esta ação`,
    );
  }
}

export class EntityNotFound extends BaseException {
  constructor(type: string) {
    super(
      ExceptionCodes.EntityNotFound,
      `Este(a) ${type.toLowerCase()} não existe no nosso sistema`,
    );
  }
}

export class UnauthorizedAccess extends BaseException {
  constructor(exceptionMessage: string) {
    super(ExceptionCodes.UnauthorizedAccess, exceptionMessage);
  }
}

export class EntityDuplicated extends BaseException {
  constructor(entity: string) {
    super(
      ExceptionCodes.EntityGone,
      `Este(a) ${entity} não deve ser duplicado`,
    );
  }
}

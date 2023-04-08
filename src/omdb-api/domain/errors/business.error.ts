import { ExceptionCodeEnum } from '../enums/exception-code.enum';

export class BusinessError extends Error {
  name: string;

  constructor(name: ExceptionCodeEnum, message: string) {
    super(message);
    this.name = name;
  }
}

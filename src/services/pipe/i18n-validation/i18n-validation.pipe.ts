import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class I18nValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Bad Request',
          errors: formattedErrors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}

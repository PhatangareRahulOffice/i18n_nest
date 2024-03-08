import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const validationErrors = exception.getResponse() as ValidationError[];

      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const formattedErrors = validationErrors.map((error) => {
          const property = Object.keys(error.constraints)[0];
          const constraints = error.constraints[property];
          return {
            property,
            constraints: {
              [property]: constraints,
            },
          };
        });

        response.status(exception.getStatus()).json({
          statusCode: exception.getStatus(),
          message: 'Bad Request',
          errors: formattedErrors,
        });
      } else {
        response.status(exception.getStatus()).json(exception.getResponse());
      }
    }
  }
}

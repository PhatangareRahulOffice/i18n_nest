// // validation.pipe.ts

// import {
//   PipeTransform,
//   Injectable,
//   ArgumentMetadata,
//   BadRequestException,
// } from '@nestjs/common';
// import { validate } from 'class-validator';
// import { plainToClass } from 'class-transformer';
// import { I18nRequestScopeService } from 'nestjs-i18n';

// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//   constructor(private readonly i18n: I18nRequestScopeService) {}

//   async transform(value: any, { metatype }: ArgumentMetadata) {
//     if (!metatype || !this.toValidate(metatype)) {
//       return value;
//     }

//     const object = plainToClass(metatype, value);

//     const errors = await validate(object);
//     if (errors.length > 0) {
//       const translatedErrors = await this.translateValidationErrors(errors);
//       throw new BadRequestException(translatedErrors);
//     }

//     return value;
//   }

//   private toValidate(metatype: Function): boolean {
//     const types: Function[] = [String, Boolean, Number, Array, Object];
//     return !types.includes(metatype);
//   }

//   private async translateValidationErrors(errors: any[]): Promise<string[]> {
//     const translationPromises = errors.map(async (error) => {
//       const messages: string[] = [];
//       for (const constraint in error.constraints) {
//         if (error.constraints.hasOwnProperty(constraint)) {
//           const translationKey = `validation.${constraint}`;
//           const translatedMessage = await this.i18n.t(translationKey);
//           messages.push(translatedMessage);
//         }
//       }
//       return messages.join(' ');
//     });

//     return Promise.all(translationPromises);
//   }
// }

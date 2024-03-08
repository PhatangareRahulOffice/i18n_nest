import {
  IsEmail,
  IsNotEmpty,
  // IsBoolean,
  // IsDefined,
  Max,
  Min,
} from 'class-validator';
// import { Type } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';

// export class ExtraUserDto {
//   @IsBoolean({ message: 'validation.INVALID_BOOLEAN' })
//   subscribeToEmail: string;

//   @Min(5, {
//     message: i18nValidationMessage('validation.MIN', { message: 'COOL' }),
//   })
//   min: number;

//   @Max(10, {
//     message: i18nValidationMessage('validation.MAX', { message: 'SUPER' }),
//   })
//   max: number;
// }

export class RegisterDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Min(5, {
    message: i18nValidationMessage('validation.MIN', { message: 'COOL' }),
  })
  password: string;
  // @IsDefined()
  // @Type(() => ExtraUserDto)
  // extra: ExtraUserDto;
}

// import {
//   IsBoolean,
//   IsEmail,

//   IsString,
//   Length,
// } from 'class-validator';

export class UserDTO {
  // @IsString()
  name: string;

  // @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  // @IsString()
  mobileNo: string;

  // @IsString()
  // @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  password: string;

  // @IsBoolean()
  tc: boolean;
}

// export class LoginDTO {
//   @IsString()
//   emailOrMobile: string;

//   @IsString()
//   password: string;
// }

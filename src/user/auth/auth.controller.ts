import {
  Controller,
  Post,
  Body,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../Dto/register.dto';
import { LoginDto } from '../Dto/login.dto';
// import { I18nValidationExceptionFilter } from 'nestjs-i18n';
// import { I18nValidationExceptionFilter } from 'src/services/I18nException/I18nExceptionValidation';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // @UseFilters(new I18nValidationExceptionFilter())
  // async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
  //   console.log('errorrrorr');
  //   return this.authService.registerUser(registerDto);
  // }
  @Post('register')
  // @UseFilters(new I18nValidationExceptionFilter())
  async register(@Body() Dto: RegisterDto) {
    return this.authService.create(Dto);
  }

  @Post('login')
  async login(@Body() Dto: LoginDto) {
    const user = await this.authService.findOneByEmail(Dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
  // @Post('login')
  // @UseFilters(new I18nValidationExceptionFilter())
  // async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
  //   return this.authService.loginUser(loginDto);
  // }
}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
// import { I18nValidationExceptionFilter } from 'src/services/I18nException/I18nExceptionValidation';
// import { APP_PIPE } from '@nestjs/core';
// import { I18nValidationPipe } from 'src/services/pipe/i18n-validation/i18n-validation.pipe';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_PIPE,
    //   useClass: I18nValidationPipe,
    // },
  ],
})
export class AuthModule {}

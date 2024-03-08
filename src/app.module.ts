import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalizationModule } from './i18n/localization.module';
import { DatabaseModule } from './config/database/database.module';
// import { AuthModule } from './user/auth/auth.module';
import { BookModule } from './book/book.module';
import { UserModule } from './auth/user/user.module';

@Module({
  imports: [
    LocalizationModule,
    DatabaseModule,
    // AuthModule,
    BookModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

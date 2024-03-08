import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  await app.listen(8001);
}
bootstrap();

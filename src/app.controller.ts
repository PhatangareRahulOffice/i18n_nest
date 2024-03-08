import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18nContext, I18nService, I18n } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/hello')
  async getI18nHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.HELLO');
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';

import { Message } from '@nx-angular-nest-example/api-interfaces';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get(['admin/hello'])
  @UseGuards(AuthGuard('bearer'))
  getAdminData(): Message {
    return this.appService.getAdminData();
  }
}

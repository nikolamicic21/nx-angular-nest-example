import { Injectable } from '@nestjs/common';
import { Message } from '@nx-angular-nest-example/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  getAdminData(): Message {
    return { message: 'Welcome to Admin api!' };
  }
}

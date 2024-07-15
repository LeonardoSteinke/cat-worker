import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
  constructor(@Inject('RESEND_SERVICE') private client: ClientProxy) { }

  async resendCat(data: any) {
    try {
      this.client.emit('resend_cat', data);
    } catch (error) {
      console.log(error);
    }
  }
}

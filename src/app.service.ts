import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('CATS_SERVICE') private client: ClientProxy) { }

  sendCats(name: string) {
    try {
      this.client.emit('send_cats',
        {
          catName: name,
        }
      );

      return {
        message: 'Cat sent',
      };
    } catch (error) {
      console.log(error);
    }
  }

  sendCatsRecordBuilder(name: string) {
    try {
      const record = new RmqRecordBuilder({ name: name }).build();

      this.client.send('send_cats', record).subscribe()

      return {
        message: 'Cat sent',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
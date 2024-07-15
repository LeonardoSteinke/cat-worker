import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
    constructor(@Inject('CATS_SERVICE') private client: ClientProxy) { }

    async sendCats(name: string) {
        try {
            this.client.emit('send_cat', { name: name })

            return {
                message: 'Cat sent',
            }
        } catch (error) {
            console.log(error)
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

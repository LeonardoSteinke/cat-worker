import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
            {
                name: 'CATS_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBIT_URL],
                    queue: process.env.RABBIT_QUEUE+'123',
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ])
    ],
    controllers: [ProducerController],
    providers: [ProducerService],
})
export class ProducerModule { }

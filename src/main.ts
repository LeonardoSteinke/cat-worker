import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ProducerService } from './producer/producer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL],
      queue: process.env.RABBIT_QUEUE,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  })

  //Instanciando module para chamada de funções quando inicia a aplicação
  // const producerService = app.select(AppModule).get(ProducerService)

  await app.startAllMicroservices() 
  await app.listen(3000)
}
bootstrap();
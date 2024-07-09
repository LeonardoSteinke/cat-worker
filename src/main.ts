import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';

async function bootstrap() {
  configDotenv()
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

import { Body, Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller()
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('/sendCats')
  async sendCats(@Body() body: any) {
    return this.producerService.sendCats(body.name);
  }
}

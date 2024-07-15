import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) { }
  private readonly logger = new Logger(ConsumerController.name);

  @MessagePattern('send_cat')
  async recivingCat(@Payload() data, @Ctx() context: RmqContext) {
    try {
      this.logger.debug(data);

      this.consumerService.resendCat(data);

      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      channel.ack(originalMsg);
      return data;
    } catch (error) {
      this.logger.error(`Error > showCat error: ${error}`);
    }
  }
}

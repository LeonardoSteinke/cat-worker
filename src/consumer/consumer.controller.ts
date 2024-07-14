import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
    private readonly logger = new Logger(ConsumerController.name);

    @MessagePattern('send_cats')
    async recivingCat(@Payload() data, @Ctx() context: RmqContext) {
        try {
            this.logger.debug(data);
            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();

            channel.ack(originalMsg);
            return data;
        } catch (error) {
            this.logger.error(`Error > showCat error: ${error}`);
        }
    }
}

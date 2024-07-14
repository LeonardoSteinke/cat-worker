import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor() { }

  ping() {
    return { message: 'pong' }
  }
}
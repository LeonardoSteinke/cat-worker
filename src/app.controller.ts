import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/ping')
  async ping() {
    return this.appService.ping();
  }
}
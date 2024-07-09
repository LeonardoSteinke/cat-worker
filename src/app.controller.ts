import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/sendCats')
  async sendCats(@Body() body: any) {
    return this.appService.sendCats(body.name);
  }
}
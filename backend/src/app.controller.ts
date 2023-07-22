import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Availabilities } from './Slots/Slots.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('slots')
  getSlots(): Promise<Availabilities[]> {
    return this.appService.getSlots();
  }
}

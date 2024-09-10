import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrometheusService } from './prometheus.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prometheus: PrometheusService) {}

  @Get()
  getHello(): string {
    console.log('Working now')

    return this.appService.getHello();
  }

  @Get('/metrics')
  async metrics(): Promise<string> {
    console.log('Working now')
    return this.prometheus.metrics;
  }
}

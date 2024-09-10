import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsMiddleware } from './middleware/request-metrics.middleware';
import { PrometheusService } from './prometheus.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrometheusService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}

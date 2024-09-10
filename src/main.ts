import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrometheusService } from './prometheus.service';
import { TIMER_KEY } from './middleware/request-metrics.middleware';
import { Histogram } from 'prom-client';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prometheus = app.get(PrometheusService);
  app.use((req: Request, res: Response, next) => {
    const stopFn = (prometheus.getRequestDurationMetric() as Histogram).startTimer({
      route: req.path,
      method: req.method,
    });
    console.log('started')
    res.on('finish', () => {
      stopFn({
        status_code: res.statusCode
      });
      console.log('stopped')
    })
    next();
  })
  await app.listen(3030);
}
bootstrap();

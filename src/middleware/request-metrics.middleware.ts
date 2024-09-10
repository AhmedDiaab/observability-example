import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { Request, Response } from 'express';
import { Histogram } from 'prom-client';
import { PrometheusService } from 'src/prometheus.service';

export const TIMER_KEY = 'http_request_duration_seconds'
@Injectable()
export class MetricsMiddleware implements NestMiddleware {

    constructor(private readonly prometheus: PrometheusService) {

        // Custom metrics [Request duration ...aka response time for request ]
        const httpRequestDurationMicroseconds = new Histogram({
            name: TIMER_KEY,
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route', 'status_code'],
            buckets: [10, 20, 50, 100, 150, 200, 500, 1000] // Buckets for response time
        });

        this.prometheus.registerMetric(httpRequestDurationMicroseconds);
    }

    async use(req: Request, res: Response, next: () => void) {
        if (req.path === '/metrics') {
            res.set('Content-Type', this.prometheus.contentType);
            const metrics = await this.prometheus.metrics;
            res.end(metrics);
        } else {
            next();
        }
    }
}

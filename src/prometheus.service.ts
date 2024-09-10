import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Histogram, Registry } from 'prom-client';

@Injectable()
export class PrometheusService {
    private readonly register: Registry;
    private request_duration_metric: Histogram;
    constructor() {
        this.register = new Registry();
        // Adding default metrics
        collectDefaultMetrics({ register: this.register });
    }


    registerMetric(metric: Histogram) {
        this.request_duration_metric = metric;
        this.register.registerMetric(this.request_duration_metric);
    }

    get metrics() {
        return this.register.metrics();
    }

     get registry() {
        return this.registry;
    }

    get contentType() {
        return this.register.contentType;
    }

    getRequestDurationMetric() {
        return this.request_duration_metric;
    }
}
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
  WebTracerProvider,
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { CompositePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';

import { Config, serviceName } from './app/app.config';

import config from '../public/config.json';

const resource = Resource.default().merge(
  new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
  }),
);

const provider = new WebTracerProvider({ resource });

// Batch traces before sending them to the Tempo API
provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: (config as Config).tempoUrl,
    }),
  ),
);

provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new CompositePropagator({
    propagators: [new W3CTraceContextPropagator()],
  }),
});

const fetchInstrumentation = new FetchInstrumentation();
fetchInstrumentation.setTracerProvider(provider);

const xmlHttpRequestInstrumentation = new XMLHttpRequestInstrumentation();
xmlHttpRequestInstrumentation.setTracerProvider(provider);

registerInstrumentations({
  instrumentations: [
    fetchInstrumentation,
    //xmlHttpRequestInstrumentation,
  ],
});

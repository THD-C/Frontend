import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
  WebTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { CompositePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';

import { environment } from '../src/environments/environment';
import { serviceName } from './app/app.config';

// Configure our resource
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
      url: environment.tempoUrl,
    }),
  ),
);

provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new CompositePropagator({
    propagators: [new W3CTraceContextPropagator()],
  }),
});

registerInstrumentations({
  instrumentations: [getWebAutoInstrumentations()],
});

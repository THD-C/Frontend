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

import { environment } from '../src/environments/environment';
import { serviceName } from './app/app.config';

const provider = new WebTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
  }),
});

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
});

registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-document-load': {},
      '@opentelemetry/instrumentation-user-interaction': {},
      '@opentelemetry/instrumentation-fetch': {},
      '@opentelemetry/instrumentation-xml-http-request': {},
    }),
  ],
});

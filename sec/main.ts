import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SocketAdapter } from './socket-adaptor';

async function bootstrap() {
  const wsApp = await NestFactory.create<NestFastifyApplication>(
    new FastifyAdapter(),
    {
      cors: true,
    }
  );
  wsApp.useWebSocketAdapter(new SocketAdapter(wsApp));
  wsApp.listen(8080, '127.0.0.1');
}
bootstrap();

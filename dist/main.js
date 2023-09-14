"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const socket_adaptor_1 = require("./socket-adaptor");
async function bootstrap() {
    const wsApp = await core_1.NestFactory.create(new platform_fastify_1.FastifyAdapter(), {
        cors: true,
    });
    wsApp.useWebSocketAdapter(new socket_adaptor_1.SocketAdapter(wsApp));
    wsApp.listen(8080, '127.0.0.1');
}
bootstrap();
//# sourceMappingURL=main.js.map
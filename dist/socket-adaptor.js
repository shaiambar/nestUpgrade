"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAdapter = exports.SocketIoExporter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIoExporter {
    static async getSocketServer() {
        return this.sockerServer;
    }
}
exports.SocketIoExporter = SocketIoExporter;
class SocketAdapter extends platform_socket_io_1.IoAdapter {
    constructor(nestApp) {
        super(nestApp);
        this.nestApp = nestApp;
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        SocketIoExporter.sockerServer = server;
        server.use(async (socket, next) => {
            var _a;
            const jwtToken = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.authorization;
            if (jwtToken) {
                try {
                    socket.join('user:userId');
                    socket.join('session:sessionId}');
                }
                catch (error) { }
            }
            this.addProcessPreRequestFilter(socket);
            next();
        });
        return server;
    }
    addProcessPreRequestFilter(socket) {
        socket.use((packet, next) => {
            try {
                const path = packet[0];
                const request = {
                    info: {
                        received: Date.now(),
                        remoteAddress: socket.client.conn.remoteAddress,
                    },
                };
                packet[1] = request;
            }
            catch (error) {
                next(new Error('Oops.. Something went wrong'));
            }
            return next();
        });
    }
}
exports.SocketAdapter = SocketAdapter;
//# sourceMappingURL=socket-adaptor.js.map
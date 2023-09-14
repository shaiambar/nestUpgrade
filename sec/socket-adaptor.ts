import { Server, Socket } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';

export class SocketIoExporter {
  static sockerServer: Server;

  static async getSocketServer(): Promise<Server> {
    return this.sockerServer;
  }
}

export class SocketAdapter extends IoAdapter {
  constructor(private readonly nestApp: INestApplication) {
    super(nestApp);
  }

  createIOServer(port: number, options?: unknown): Promise<unknown> {
    const server = super.createIOServer(port, options);
    SocketIoExporter.sockerServer = server;
    server.use(async (socket: Socket, next) => {
      const jwtToken = socket.handshake.auth?.authorization as string;
      if (jwtToken) {
        try {
          // Subscribe to user Specific room
          socket.join('user:userId');
          socket.join('session:sessionId}');
        } catch (error) {}
      }
      this.addProcessPreRequestFilter(socket);
      next();
    });
    return server;
  }

  private addProcessPreRequestFilter(socket: Socket): void {
    socket.use((packet, next) => {
      try {
        // Build request object based on the packet details and the route
        const path = packet[0];
        const request = {
          info: {
            received: Date.now(),
            remoteAddress: socket.client.conn.remoteAddress,
          },
        };
        packet[1] = request;
      } catch (error) {
        next(new Error('Oops.. Something went wrong'));
      }
      return next();
    });
  }
}

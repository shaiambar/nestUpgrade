import { Server } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
export declare class SocketIoExporter {
    static sockerServer: Server;
    static getSocketServer(): Promise<Server>;
}
export declare class SocketAdapter extends IoAdapter {
    private readonly nestApp;
    constructor(nestApp: INestApplication);
    createIOServer(port: number, options?: unknown): Promise<unknown>;
    private addProcessPreRequestFilter;
}

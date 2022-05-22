import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { Message } from './Message';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message:add')
  handleMessage(client: Socket, payload: Message): void {
    this.server.emit('message:get', payload);
  }
}

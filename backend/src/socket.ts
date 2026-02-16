import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export let io: Server;

export function initSocket(server: HttpServer) {
	io = new Server(server, {
		cors: {
			origin: process.env.FRONTEND_URL || 'http://localhost:3000',
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
		},
	});

	io.on('connection', (socket) => {
		console.log('User connected:', socket.id);

		socket.on('disconnect', () => {
			console.log('User disconnected:', socket.id);
		});
	});
}

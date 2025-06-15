import { Router } from 'express';
import { clients, rooms } from '../websocket';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MACHA API',
    version: process.env.npm_package_version || '1.0.0',
    time: new Date().toISOString(),
    websocket: true // Indicates WebSocket support is available
  });
});

// Chat status endpoint
router.get('/chat/status', (req, res) => {
  // Check how many support agents are online using the WebSocket service
  // Check if any admins are in the chat room
  const supportStaffOnline = rooms.has('chat') && 
    Array.from(rooms.get('chat')).some(client => {
      const clientInfo = clients.get(client);
      return clientInfo && clientInfo.user && 
        (clientInfo.user.role === 'admin' || clientInfo.user.role === 'support');
    });
  
  res.json({
    status: supportStaffOnline ? 'online' : 'offline',
    responseTime: 'typically < 5 minutes',
    updatedAt: new Date().toISOString()
  });
});

export default router;
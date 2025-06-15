const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Map to store all connected clients and their information
const clients = new Map();

// Map to store rooms and their members
const rooms = new Map();

// Initialize WebSocket server
function initializeWebSocketServer(server) {
  const wss = new WebSocket.Server({ 
    server,
    // Path where WebSocket connections will be accepted
    path: '/ws'
  });

  console.log('WebSocket server initialized');

  // Handle new connections
  wss.on('connection', function connection(ws, req) {
    // Generate a unique client ID
    const clientId = uuidv4();
    
    // Parse URL to get query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    // Authenticate user
    let user = null;
    
    try {
      if (token) {
        const secret = process.env.JWT_SECRET;
        user = jwt.verify(token, secret);
        
        // Store connection info
        clients.set(ws, {
          id: clientId,
          user: user,
          rooms: new Set()
        });
        
        console.log(`Client connected: ${user.name} (${user._id})`);
      } else {
        // Allow anonymous connections for public areas
        clients.set(ws, {
          id: clientId,
          user: null,
          rooms: new Set()
        });
        console.log(`Anonymous client connected: ${clientId}`);
      }
    } catch (err) {
      console.error('Authentication error:', err.message);
      ws.close(4001, 'Authentication failed');
      return;
    }
    
    // Send initial connection confirmation
    sendMessage(ws, {
      type: 'connection',
      status: 'connected',
      userId: user ? user._id : null,
      role: user ? user.role : 'guest',
      timestamp: new Date().toISOString()
    });
    
    // Message handler
    ws.on('message', function incoming(message) {
      try {
        const data = JSON.parse(message);
        handleMessage(ws, data);
      } catch (error) {
        console.error('Error handling message:', error);
        sendMessage(ws, {
          type: 'error',
          message: 'Invalid message format',
          timestamp: new Date().toISOString()
        });
      }
    });

    // Handle disconnections
    ws.on('close', function close() {
      const clientInfo = clients.get(ws);
      
      if (clientInfo) {
        // Leave all rooms
        for (const room of clientInfo.rooms) {
          leaveRoom(ws, room);
        }
        
        if (clientInfo.user) {
          console.log(`Client disconnected: ${clientInfo.user.name} (${clientInfo.user._id})`);
        } else {
          console.log(`Anonymous client disconnected: ${clientInfo.id}`);
        }
        
        // Remove from clients map
        clients.delete(ws);
      }
    });
  });

  // Heartbeat to detect broken connections
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      
      ws.isAlive = false;
      ws.ping(() => {});
    });
  }, 30000);

  wss.on('close', function close() {
    clearInterval(interval);
  });
  
  return wss;
}

// Handler for incoming messages
function handleMessage(ws, data) {
  const clientInfo = clients.get(ws);
  
  if (!clientInfo) {
    console.warn('Message from unregistered client');
    return;
  }

  switch (data.type) {
    case 'joinRoom':
      joinRoom(ws, data.roomId);
      break;
      
    case 'leaveRoom':
      leaveRoom(ws, data.roomId);
      break;
      
    case 'chatMessage':
      // Save message to database first if needed
      // Then broadcast to room members
      handleChatMessage(ws, data.message);
      break;
      
    case 'markRead':
      markMessageAsRead(ws, data.messageId);
      break;
      
    case 'requestStatus':
      sendChatStatus(ws);
      break;
      
    default:
      console.warn(`Unknown message type: ${data.type}`);
  }
}

// Join a room
function joinRoom(ws, roomId) {
  const clientInfo = clients.get(ws);
  
  if (!clientInfo) return;
  
  // Check if user has permission to join this room
  if (roomId === 'admin-notifications' && (!clientInfo.user || clientInfo.user.role !== 'admin')) {
    sendMessage(ws, {
      type: 'error',
      message: 'Unauthorized to join admin-notifications room',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Add client to room
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  
  rooms.get(roomId).add(ws);
  clientInfo.rooms.add(roomId);
  
  sendMessage(ws, {
    type: 'roomJoined',
    roomId,
    timestamp: new Date().toISOString()
  });
  
  console.log(`Client ${clientInfo.user ? clientInfo.user._id : clientInfo.id} joined room: ${roomId}`);
}

// Leave a room
function leaveRoom(ws, roomId) {
  const clientInfo = clients.get(ws);
  
  if (!clientInfo) return;
  
  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(ws);
    clientInfo.rooms.delete(roomId);
    
    // Delete room if empty
    if (rooms.get(roomId).size === 0) {
      rooms.delete(roomId);
    }
    
    sendMessage(ws, {
      type: 'roomLeft',
      roomId,
      timestamp: new Date().toISOString()
    });
    
    console.log(`Client ${clientInfo.user ? clientInfo.user._id : clientInfo.id} left room: ${roomId}`);
  }
}

// Handle chat messages
function handleChatMessage(ws, message) {
  const clientInfo = clients.get(ws);
  
  if (!clientInfo) return;
  
  const now = new Date();
  
  // Add additional info to message
  const enhancedMessage = {
    ...message,
    senderId: clientInfo.user ? clientInfo.user._id : clientInfo.id,
    senderName: clientInfo.user ? clientInfo.user.name : 'Guest',
    timestamp: now.toISOString()
  };
  
  // Broadcast to chat room members
  broadcastToRoom('chat', {
    type: 'chatMessage',
    message: enhancedMessage,
    timestamp: now.toISOString()
  }, ws); // Pass the sender to exclude them from broadcast
}

// Mark message as read
async function markMessageAsRead(ws, messageId) {
  const clientInfo = clients.get(ws);
  
  if (!clientInfo || !clientInfo.user) {
    sendMessage(ws, {
      type: 'error',
      message: 'Authentication required',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  try {
    // Here you would update your database to mark the message as read
    // For example:
    // await Message.findByIdAndUpdate(messageId, { read: true });
    
    sendMessage(ws, {
      type: 'messageRead',
      messageId,
      timestamp: new Date().toISOString()
    });
    
    console.log(`Message ${messageId} marked as read by ${clientInfo.user._id}`);
  } catch (error) {
    console.error('Error marking message as read:', error);
    sendMessage(ws, {
      type: 'error',
      message: 'Failed to mark message as read',
      timestamp: new Date().toISOString()
    });
  }
}

// Send chat status
function sendChatStatus(ws) {
  // Check how many admin/support staff are online
  let supportOnline = false;
  
  for (const [client, info] of clients.entries()) {
    if (client.readyState === WebSocket.OPEN && 
        info.user && 
        (info.user.role === 'admin' || info.user.role === 'support')) {
      supportOnline = true;
      break;
    }
  }
  
  sendMessage(ws, {
    type: 'statusUpdate',
    status: supportOnline ? 'online' : 'offline', 
    timestamp: new Date().toISOString()
  });
}

// Helper to send a message to a client
function sendMessage(ws, data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

// Broadcast a message to all clients in a room
function broadcastToRoom(roomId, data, excludeClient = null) {
  if (!rooms.has(roomId)) return;
  
  rooms.get(roomId).forEach(client => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Broadcast to all clients that match a filter
function broadcastFiltered(data, filterFn) {
  for (const [client, info] of clients.entries()) {
    if (filterFn(client, info) && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
}

// Send a notification to all admin users
function notifyAdmins(notification) {
  broadcastFiltered(
    {
      type: 'notification',
      notification,
      timestamp: new Date().toISOString()
    },
    (_, info) => info.user && info.user.role === 'admin'
  );
}

module.exports = {
  initializeWebSocketServer,
  broadcastToRoom,
  notifyAdmins,
  rooms
};

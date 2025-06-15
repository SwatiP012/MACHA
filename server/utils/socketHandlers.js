const jwt = require('jsonwebtoken');
const { User, Order, Message } = require('../models/index');

// Setup Socket.IO handlers
const setupSocketHandlers = (io) => {
  // Authentication middleware for Socket.IO
  io.use((socket, next) => {
    const token = socket.handshake.headers.authorization?.split(' ')[1] || 
                  socket.handshake.auth.token;
    
    if (!token) {
      return next(); // Allow anonymous connections, but they'll be limited
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch (error) {
      next(); // Continue without authentication
    }
  });

  // Handle socket connections
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join user to their own private room for targeted updates
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
      console.log(`User ${socket.userId} joined their private room`);
      
      // Join admin room if user is admin
      if (socket.userRole === 'admin') {
        socket.join('admins');
        console.log('Admin joined admin room');
      }
    }

    // Handle messages
    socket.on('message', async (message) => {
      try {
        console.log('Message received:', message);
        
        // Save message to database
        const newMessage = new Message({
          text: message.text,
          sender: message.sender,
          userId: message.userId,
          name: message.name,
          timestamp: new Date(),
          chatSession: message.chatSession || 'default'
        });
        
        await newMessage.save();
        
        // Broadcast message to all clients or specific recipients
        if (message.recipient) {
          io.to(`user:${message.recipient}`).emit('message', message);
          
          // Also send to admins if message is from a user
          if (message.sender === 'user') {
            io.to('admins').emit('message', message);
          }
        } else {
          io.emit('message', message);
        }
      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('error', { message: 'Failed to process message' });
      }
    });

    // Handle order updates
    socket.on('order:update', async (data) => {
      try {
        if (!socket.userId || socket.userRole !== 'admin') {
          return socket.emit('error', { message: 'Unauthorized' });
        }
        
        const { orderId, status, trackingInfo } = data;
        
        // Update order in database
        const order = await Order.findById(orderId);
        if (!order) {
          return socket.emit('error', { message: 'Order not found' });
        }
        
        order.status = status;
        if (trackingInfo) {
          order.trackingInfo = trackingInfo;
        }
        
        await order.save();
        
        // Notify the customer about their order
        io.to(`user:${order.userId}`).emit('order:updated', {
          orderId,
          status,
          trackingInfo
        });
        
        socket.emit('success', { message: 'Order updated successfully' });
      } catch (error) {
        console.error('Error updating order:', error);
        socket.emit('error', { message: 'Failed to update order' });
      }
    });

    socket.on('typing', (data) => {
      if (data.recipient) {
        socket.to(`user:${data.recipient}`).emit('typing', { from: socket.userId });
      } else {
        socket.broadcast.emit('typing', { from: socket.userId });
      }
    });

    socket.on('stop-typing', (data) => {
      if (data.recipient) {
        socket.to(`user:${data.recipient}`).emit('stop-typing', { from: socket.userId });
      } else {
        socket.broadcast.emit('stop-typing', { from: socket.userId });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocketHandlers;

require('dotenv').config({ path: '../../.env' });
const connectDB = require('../config/db');
const mongoose = require('mongoose');

/**
 * Run this script to test your MongoDB connection
 * Usage: node db-test.js
 */
const testConnection = async () => {
  console.log('Testing MongoDB connection...');
  console.log('MongoDB URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/macha');
  
  try {
    const conn = await connectDB();
    
    // Try a simple command to verify connection
    const adminDb = conn.db.admin();
    const serverInfo = await adminDb.serverStatus();
    
    console.log('--------------------------------');
    console.log('MongoDB Connection Test PASSED ✓');
    console.log('--------------------------------');
    console.log('MongoDB version:', serverInfo.version);
    console.log('Uptime (seconds):', serverInfo.uptime.toFixed(2));
    
    // List all collections
    const collections = await conn.db.listCollections().toArray();
    console.log('\nAvailable collections:');
    if (collections.length === 0) {
      console.log('- No collections found (database may be empty)');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
    
    // Create test document
    const TestSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.models.TestConnection || mongoose.model('TestConnection', TestSchema);
    
    // Create a test document
    console.log('\nCreating test document...');
    const testDoc = await TestModel.create({ name: 'Connection Test' });
    console.log('Test document created with ID:', testDoc._id);
    
    // Retrieve the document
    const foundDoc = await TestModel.findById(testDoc._id);
    console.log('Document retrieved successfully:', foundDoc.name);
    
    // Clean up - remove the test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('Test document deleted');
    
  } catch (error) {
    console.error('--------------------------------');
    console.error('MongoDB Connection Test FAILED ✗');
    console.error('--------------------------------');
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB connection closed');
  }
};

// Run the test
testConnection();

// If this script is imported elsewhere, export the testConnection function
module.exports = testConnection;

/**
 * Server health check utility
 * Run with: node server/utils/server-check.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');

console.log('MACHA Server & Database Connectivity Check');
console.log('----------------------------------------');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`API URL: ${process.env.API_BASE_URL || 'http://localhost:5000'}`);

// Check MongoDB connectivity
async function checkMongoDB() {
  console.log('\n1. Testing MongoDB connection...');
  
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/macha-app';
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    console.log(`   - Host: ${mongoose.connection.host}`);
    console.log(`   - Database: ${mongoose.connection.name}`);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`   - Collections: ${collections.length}`);
    collections.forEach(collection => {
      console.log(`     > ${collection.name}`);
    });
    
    await mongoose.disconnect();
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection failed!');
    console.error(`   Error: ${err.message}`);
    return false;
  }
}

// Check if server is running
function checkServerRunning() {
  console.log('\n2. Testing server connectivity...');
  
  const SERVER_URL = process.env.API_BASE_URL || 'http://localhost:5000';
  const healthEndpoint = `${SERVER_URL}/api/health`;
  
  return new Promise((resolve) => {
    http.get(healthEndpoint, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            console.log(`✅ Server is running! Status: ${response.status}`);
            console.log(`   - Timestamp: ${response.timestamp}`);
            console.log(`   - Environment: ${response.environment}`);
            resolve(true);
          } catch (err) {
            console.error('❌ Server response is not valid JSON');
            resolve(false);
          }
        } else {
          console.error(`❌ Server returned status code: ${res.statusCode}`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error('❌ Server connection failed!');
      console.error(`   Error: ${err.message}`);
      console.error('   The server might not be running. Start it with: npm run dev:server');
      resolve(false);
    });
  });
}

// Main function to run all checks
async function runDiagnostics() {
  const dbConnected = await checkMongoDB();
  const serverRunning = await checkServerRunning();
  
  console.log('\n----------------------------------------');
  if (dbConnected && serverRunning) {
    console.log('✅ All systems operational! Your app should work correctly.');
  } else {
    console.log('❌ Some checks failed. Please fix the issues above before using the app.');
  }
  console.log('----------------------------------------\n');
}

// Run the checks
runDiagnostics();

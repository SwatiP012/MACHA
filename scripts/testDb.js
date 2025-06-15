const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected to MongoDB: ${connection.connection.host}`);
    console.log(`📊 Database name: ${connection.connection.db.databaseName}`);
    
    // List all collections
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('\n📚 Collections:');
    if (collections.length === 0) {
      console.log('  No collections found. Database exists but is empty.');
    } else {
      for (const collection of collections) {
        console.log(`  - ${collection.name}`);
        const count = await connection.connection.db.collection(collection.name).countDocuments();
        console.log(`    Documents: ${count}`);
      }
    }
    
    // Create a test document
    console.log('\n📝 Creating a test document in "test_collection"...');
    await connection.connection.db.collection('test_collection').insertOne({
      message: 'Database connection test',
      timestamp: new Date()
    });
    console.log('✅ Test document created successfully');
    
    // Verify the document was created
    const testDocs = await connection.connection.db.collection('test_collection').find({}).toArray();
    console.log(`📄 Retrieved ${testDocs.length} documents from test_collection`);
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  } finally {
    process.exit();
  }
}

testConnection();

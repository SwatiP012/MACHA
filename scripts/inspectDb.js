const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

async function inspectDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected to MongoDB: ${mongoose.connection.host}`);
    console.log(`📊 Database name: ${mongoose.connection.db.databaseName}`);

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📚 Collections in database:');
    
    if (collections.length === 0) {
      console.log('  No collections found. Database exists but is empty.');
    } else {
      for (const collection of collections) {
        console.log(`  - ${collection.name}`);
        const count = await mongoose.connection.db.collection(collection.name).countDocuments();
        console.log(`    Documents: ${count}`);
      }
    }
    
    // Load all model files from models directory
    console.log('\n🔍 Loading model files:');
    const modelsDir = path.join(__dirname, '..', 'models');
    
    const modelFiles = fs.readdirSync(modelsDir)
      .filter(file => file.endsWith('.js') && file !== 'index.js');
    
    for (const file of modelFiles) {
      console.log(`  - ${file}`);
      
      // Dynamically import each model
      try {
        const modelPath = path.join(modelsDir, file);
        require(modelPath);
        console.log(`    ✅ Successfully loaded`);
      } catch (err) {
        console.log(`    ❌ Error loading model: ${err.message}`);
      }
    }
    
    // List registered Mongoose models
    console.log('\n📋 Registered Mongoose models:');
    const registeredModels = mongoose.modelNames();
    
    for (const model of registeredModels) {
      console.log(`  - ${model}`);
      
      // Check if collection exists for this model
      const collectionExists = collections.some(c => c.name.toLowerCase() === model.toLowerCase() || 
                                                    c.name.toLowerCase() === `${model.toLowerCase()}s`);
      
      if (collectionExists) {
        console.log('    ✅ Collection exists');
      } else {
        console.log('    ⚠️ Collection does not exist yet');
        
        // Create a test document to initialize the collection if it doesn't exist
        try {
          const Model = mongoose.model(model);
          const sampleData = {
            name: 'Test Name',
            email: `test_${Date.now()}@example.com`,
            text: 'Test message',
            description: 'Test description',
            price: 100,
            rating: 5,
            sender: 'system',
            userId: '000000000000000000000000',
            serviceType: 'other',
            status: 'pending',
            category: 'other'
            // Add other required fields as needed
          };
          
          const testDoc = new Model(sampleData);
          await testDoc.save();
          console.log('    ✅ Created test document to initialize collection');
          await Model.deleteOne({ _id: testDoc._id });
          console.log('    ✅ Removed test document');
        } catch (err) {
          console.log(`    ❌ Failed to initialize collection: ${err.message}`);
        }
      }
    }
    
    // Final status
    console.log('\n✅ Database inspection completed successfully');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function
inspectDatabase();

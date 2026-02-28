/**
 * Script to add real interview questions to the database
 * Run: node utils/addRealQuestions.js
 */

const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const Question = require('../models/Question');
const realQuestions = require('./realQuestions');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  console.log('Please set MONGODB_URI in your .env file');
  process.exit(1);
}

const addRealQuestions = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log(`📦 Adding ${realQuestions.length} real interview questions...`);
    console.log('Sources: Qualcomm, Intel, NXP, Bosch, TI, STMicroelectronics, ARM, etc.\n');

    let added = 0;
    let skipped = 0;

    for (const question of realQuestions) {
      try {
        // Check if similar question already exists
        const exists = await Question.findOne({
          question: { $regex: new RegExp(question.question.substring(0, 50), 'i') }
        });

        if (exists) {
          skipped++;
          continue;
        }

        await Question.create(question);
        added++;
        process.stdout.write(`  Added: ${question.category} - ${question.question.substring(0, 40)}...\n`);
      } catch (err) {
        console.error(`  Error adding question: ${err.message}`);
      }
    }

    console.log('\n✅ Done!');
    console.log(`  Added: ${added} new questions`);
    console.log(`  Skipped (duplicates): ${skipped}`);
    
    const total = await Question.countDocuments();
    console.log(`  Total questions in DB: ${total}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Run the script
addRealQuestions();

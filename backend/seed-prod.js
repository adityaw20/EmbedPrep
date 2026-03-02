/**
 * Simple script to seed production database
 * Usage: node seed-prod.js "your-mongodb-uri-here"
 */

const { spawn } = require('child_process');

const mongoUri = process.argv[2];

if (!mongoUri) {
    console.log('🚀 EmbedPrep Database Seeder\n');
    console.log('Usage: node seed-prod.js "your-mongodb-uri-here"\n');
    console.log('Get your MongoDB URI from:');
    console.log('  MongoDB Atlas → Database → Connect → Drivers → Node.js\n');
    console.log('Example:');
    console.log('  node seed-prod.js "mongodb+srv://user:pass@cluster.mongodb.net/embedprep"\n');
    process.exit(1);
}

console.log('⏳ Seeding database...\n');

const seed = spawn('node', ['utils/seed.js'], {
    env: { ...process.env, MONGODB_URI: mongoUri },
    stdio: 'inherit'
});

seed.on('close', (code) => {
    console.log('\n' + '='.repeat(50));
    if (code === 0) {
        console.log('✅ SUCCESS! Database seeded!');
        console.log('='.repeat(50));
        console.log('\n🎉 Your questions are now in the database!');
        console.log('🌐 Visit your Netlify site to see them.');
    } else {
        console.log('❌ FAILED! Error code:', code);
        console.log('='.repeat(50));
        console.log('\nPossible fixes:');
        console.log('  1. Check your MongoDB URI (username/password)');
        console.log('  2. Go to MongoDB Atlas → Network Access');
        console.log('  3. Add IP: 0.0.0.0/0 (Allow from anywhere)');
    }
    process.exit(code);
});

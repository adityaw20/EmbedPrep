#!/usr/bin/env node
/**
 * Quick setup script to configure admin credentials
 * Run: node setup-credentials.js
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const password = 'aditya@20';
const username = 'aditya';

console.log('🔐 Setting up admin credentials...\n');
console.log(`Username: ${username}`);
console.log(`Password: ${password}\n`);

// Generate hash
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }

  // Read the example file
  const envExamplePath = path.join(__dirname, 'backend', '.env.example');
  const envPath = path.join(__dirname, 'backend', '.env');

  if (!fs.existsSync(envExamplePath)) {
    console.error('❌ .env.example not found!');
    process.exit(1);
  }

  let envContent = fs.readFileSync(envExamplePath, 'utf8');

  // Replace placeholder values
  envContent = envContent.replace(
    /ADMIN_USERNAME=.*/,
    `ADMIN_USERNAME=${username}`
  );
  envContent = envContent.replace(
    /ADMIN_PASSWORD_HASH=.*/,
    `ADMIN_PASSWORD_HASH=${hash}`
  );

  // Write to .env
  fs.writeFileSync(envPath, envContent);

  console.log('✅ Credentials configured successfully!');
  console.log('\n📁 Created: backend/.env');
  console.log('\n📝 Next steps:');
  console.log('   1. Add your MONGODB_URI to backend/.env');
  console.log('   2. Run: npm run seed');
  console.log('   3. Run: npm run dev');
  console.log('   4. Login at http://localhost:3000/admin/login');
  console.log(`\n   Username: ${username}`);
  console.log(`   Password: ${password}\n`);
});

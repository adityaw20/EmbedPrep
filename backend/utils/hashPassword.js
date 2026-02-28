const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node hashPassword.js <password>');
  console.log('Example: node hashPassword.js mySecurePassword123');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    process.exit(1);
  }
  console.log('\n✅ Password hashed successfully!\n');
  console.log('Add this to your .env file:');
  console.log('----------------------------------------');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log('----------------------------------------\n');
});

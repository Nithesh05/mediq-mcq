const { initDb } = require('./src/lib/db.js');
console.log('Running migrations...');
// initDb is already called in the file, but requiring it ensures it runs.
// If it wasn't called in the file, we would call it here.
console.log('Migrations complete.');

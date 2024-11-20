const fs = require("fs");
const path = require("path");

function generateMigration() {
  const name = process.argv[2];

  const timeStamp = new Date()
    .toISOString()
    .replaceAll(/[-T:.Z]/g, "")
    .slice(0, 14);

  const migrationName = `${timeStamp}_${name}.sql`;

  const migrationPath = path.join(__dirname, "..", "migrations", migrationName);

  fs.writeFileSync(migrationPath, `-- Migration: ${name}`);
  console.log(`Migration file created: ${migrationPath}`);
}

generateMigration();

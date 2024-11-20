const client = require("../connection");
const path = require("path");
const fs = require("fs");

async function runMigrations() {
  const migrationFiles = fs.readdirSync(path.join(__dirname, "migrations"));

  for (const file of migrationFiles) {
    const sql = fs.readFileSync(
      path.join(__dirname, "migrations", file),
      "utf-8"
    );

    await client.query(sql);
  }
  console.log("Migrations applied successfully!");
}

runMigrations();

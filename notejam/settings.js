var settings = {
  development: {
    // db: "notejam.db",
    db: {
      host: "postgres",
      user: "postgres",
      password: "suraj",
      database: "Notetaker",
      port: 5432
    },
    dsn: process.env.DATABASE_URL ||  "postgresql://postgres:suraj@localhost:5432/Notetaker"
  },
  test: {
    db: "notejam_test.db",
    dsn: "sqlite://notejam_test.db"
  }
};


var env = process.env.NODE_ENV
if (!env) {
  env = 'development'
};
module.exports = settings[env];

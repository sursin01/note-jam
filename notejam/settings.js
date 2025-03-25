var settings = {
  development: {
    // db: "notejam.db",
    db: {
      host: process.env.POSTGRES_HOST ||  "postgres-service",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD ||  "suraj",
      database: process.env.POSTGRES_DB ||  "Notetaker",
      port: process.env.POSTGRES_PORT || 5432
    },
    dsn: process.env.DATABASE_URL ||  "postgresql://postgres:suraj@postgres-service:5432/Notetaker"
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

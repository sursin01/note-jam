
var async = require('async');

var settings = require('./settings');
// var db = new sqlite3.Database(settings.db);
const { Pool } = require("pg");
const pool = new Pool(settings.db);
console.log("intializing the database")
console.log(process.env.DATABASE_URL)
var functions = {
  createTables: function (next) {
    async.series({
      createUsers: function (callback) {
        console.log("tryirng to create users")
      
pool.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY NOT NULL, email VARCHAR(75) NOT NULL, password VARCHAR(128) NOT NULL);", [], function (err, result) {
  if (err) {
    console.error("Error creating table:", err.message);
    return callback(err); // Pass the error to the callback for further handling
  }
  console.log("Table created successfully or already exists");
  callback(null); // Indicate success
})
      },
      createPads: function (callback) {
        console.log("trying to create pads")
       
        pool.query("CREATE TABLE IF NOT EXISTS pads (" +
          "id SERIAL PRIMARY KEY NOT NULL," +
          "name VARCHAR(100) NOT NULL," +
          "user_id INTEGER NOT NULL REFERENCES users(id));" , [], function (err, result) {
            if (err) {
              console.error("Error creating table:", err.message);
              return callback(err); // Pass the error to the callback for further handling
            }
            console.log("Table created successfully or already exists");
            callback(null); // Indicate success
          })
      },
      createNotes: function (callback) {
     
        console.log("trying to create notes")

        pool.query(
          "CREATE TABLE IF NOT EXISTS notes (" +
            "id SERIAL PRIMARY KEY NOT NULL," +
            "pad_id INTEGER REFERENCES pads(id)," +
            "user_id INTEGER NOT NULL REFERENCES users(id)," +
            "name VARCHAR(100) NOT NULL," +
            "text TEXT NOT NULL," +
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
            "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);",
          [],
          function (err, result) {
            if (err) {
              console.error("Error creating table:", err.message);
              return callback(err); // Pass the error to the callback for further handling
            }
            console.log("Table created successfully or already exists");
            callback(null); // Indicate success
          })
      }
     
      

      
    
     
    },
      function(err, results) {
        console.log(err)
        next();
      });
  },

  // applyFixtures: function (next) {
  //   this.truncateTables(function () {
  //     async.series([
  //       function (callback) {
  //         db.run("INSERT INTO users VALUES (1, 'user1@example.com', " +
  //           "'$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u')", [],
  //           function () { callback(null) });
  //       },
  //       function (callback) {
  //         db.run("INSERT INTO users VALUES (2, 'user2@example.com', " +
  //           "'$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u')", [],
  //           function () { callback(null) });

  //       },
  //       function (callback) {
  //         db.run("INSERT INTO pads VALUES (1, 'Pad 1', 1)", [],
  //           function () { callback(null) });
  //       },
  //       function (callback) {
  //         db.run("INSERT INTO pads VALUES (2, 'Pad 2', 1)", [],
  //           function () { callback(null) });
  //       },
  //       function (callback) {
  //         db.run("INSERT INTO notes VALUES (1, 1, 1, 'Note 1', 'Text', 1, 1)", [],
  //           function () { callback(null) });
  //       },
  //       function (callback) {
  //         db.run("INSERT INTO notes VALUES (2, 1, 1, 'Note 2', 'Text', 1, 1)", [],
  //           function () { callback(null) });
  //       }
  //     ], function (err, results) {
  //       next();
  //     })
  //   });
  // },

  truncateTables: function (next) {
    async.series([
      function (callback) {
        // db.run("DELETE FROM users;", [],
        //   function () { callback(null) });
        pool.query("TRUNCATE TABLE users, notes, pads RESTART IDENTITY CASCADE;");

      },
      // function (callback) {
      //   db.run("DELETE FROM notes;", [],
      //     function () { callback(null) });

      // },
      // function (callback) {
      //   db.run("DELETE FROM pads;", [],
      //     function (result) { callback(null); });
      // }
    ], function (err, results) {
      next();
    })
  }
}


if (require.main === module) {
  functions.createTables(function () {
    console.log("DB successfully initialized");
  });
}

module.exports = functions;

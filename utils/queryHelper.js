const db = require("./db");

const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error(["DB Query", "Error"], err.stack);
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

module.exports = { queryAsync };

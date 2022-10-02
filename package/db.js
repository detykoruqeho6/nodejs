const mysqlService = require("mysql");
const { mysql } = require("../config");
const connection = mysqlService.createConnection({
  host: mysql.host,
  user: mysql.user,
  password: mysql.password,
  database: mysql.database,
  port: mysql.port,
});

connection.connect();

const SySqlConnect = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = SySqlConnect;

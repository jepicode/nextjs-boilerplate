const redis = require("./redis");

const setWithTtl = (key, expiredInSecond) => {
  return new Promise((resolve, reject) => {
    redis.set(key, "locked", "NX", "EX", expiredInSecond, (err, result) => {
      if (err) return reject(err);
      if (result !== "OK") {
        return reject(
          new Response(JSON.stringify({ message: "Too Many Request" }), {
            status: 429,
            headers: { "Content-Type": "application/json" },
          })
        );
      }

      return resolve(result);
    });
  });
};

const getValueFromKey = (key) => {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, result) => {
        console.log('err', err, result);
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

module.exports = {
  getValueFromKey,
  setWithTtl,
};

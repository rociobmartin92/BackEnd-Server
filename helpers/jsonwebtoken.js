const { expressjwt } = require("express-jwt");

require("dotenv/config");
// Security function
// This function compare the token passed by the user with the token in database
//if the token is generated by the secret then the user get acces to the API,  but
// when the token is generated by a incorrect secret then the access is denied

// In the path I am going to put all the api I want to exclude from the security token to acces

// APIS WHICH CAN BE ACCESSED BY ANYONE
const unprotected = [
  /\/api\/v1\/users(.*)/,
  /\/api\/v1\/orders(.*)/,
  /\/api\/v1\/orderItems(.*)/,
  /\/api\/v1\/products(.*)/,
  // { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
  { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
];

// TOKENS NO AUTORIZADOS
// Es posible que sea necesario revocar algunos tokens para que ya no se puedan usar.
// Puede proporcionar una función como la opción isRevoked. La firma de la función es function(req, payload, done):

const revokedUsers = (req, payload, done) => {
  payload.isAdmin ? done() : done(null, true);
};

function authJwt() {
  const secret = process.env.secret;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: revokedUsers,
  }).unless({
    path: unprotected,
  });
}

module.exports = authJwt;

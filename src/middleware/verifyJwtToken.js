const jwt = require("jsonwebtoken");

async function verifyJwtToken(req) {
    const jwtToken = req.headers.authorization.split(" ")[1]; //get jwt token from header
    console.log(jwtToken);

    const decoded = jwt.verify(jwtToken, "secret"); //verify the jwt token
    return decoded;
}

module.exports = verifyJwtToken;

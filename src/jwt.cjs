const jwt = require("jsonwebtoken");

const SECRET_KEY = "your-secret-key";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Example user object
const user = { id: 1, username: "janani" };

const token = generateToken(user);
console.log("Generated Token:", token);

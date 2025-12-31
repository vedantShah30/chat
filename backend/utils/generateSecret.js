import JWT from "jsonwebtoken";

const createSecretToken = (id) => {
  return JWT.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "7d",
  });
};
export default createSecretToken;

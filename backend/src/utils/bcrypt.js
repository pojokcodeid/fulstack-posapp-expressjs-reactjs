import bcript from "bcrypt";
const saltRounds = 10;

export const encript = (password) => {
  return bcript.hashSync(password, saltRounds);
};

export const compare = (password, hash) => {
  return bcript.compareSync(password, hash);
};

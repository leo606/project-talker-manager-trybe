const emailRegex = /\S+@\S+\.\S+/;
const status = 400;

function emailCheck(req, res, next) {
  const { email } = req.body;

  if (!email || !email.length) {
    return next({ status, message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return next({ status, message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
}

function passwordCheck(req, res, next) {
  const { password } = req.body;
  if (!password || !password.length) {
    return next({ status, message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return next({ status, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
}

module.exports = { emailCheck, passwordCheck };
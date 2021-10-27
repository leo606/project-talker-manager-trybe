const emailRegex = /\S+@\S+\.\S+/;
const status = 400;

function emailCheck(email) {
  if (!email || !email.length) {
    return { fail: true, status, message: 'O campo "email" é obrigatório' };
  }
  if (!emailRegex.test(email)) {
    return { fail: true, status, message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return { fail: false };
}

function passwordCheck(password) {
  if (!password || !password.length) {
    return { fail: true, status, message: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { fail: true, status, message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return { fail: false };
}

function loginCheck(req, _res, next) {
  const { email, password } = req.body;
  const emailValidation = emailCheck(email);
  const passValidation = passwordCheck(password);

  if (emailValidation.fail) {
    return next({ status: emailValidation.status, message: emailValidation.message });
  }

  if (passValidation.fail) {
    return next({ status: passValidation.status, message: passValidation.message });
  }
  return next();
}

module.exports = loginCheck;
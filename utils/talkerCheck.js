const status = 400;
const dateRegex = /^\d\d\/\d\d\/\d\d\d\d$/;

function checkName(name) {
  if (!name || name === ' ') {
    return { fail: true, status, message: 'O campo "name" é obrigatório' };
  }

  if (name.length < 3) {
    return { fail: true, status, message: 'O "name" deve ter pelo menos 3 caracteres' };
  }

  return { fail: false };
}

function checkAge(age) {
  if (!age) {
    return { fail: true, status, message: 'O campo "age" é obrigatório' };
  }

  if (age < 18) {
    return { fail: true, status, message: 'A pessoa palestrante deve ser maior de idade' };
  }

  return { fail: false };
}

function checkTalk(talk) {
  if (!dateRegex.test(talk.watchedAt)) {
    return { fail: true, status, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }

  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return { fail: true, status, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return { fail: false };
}

function talkCheck(req, res, next) {
  const { talk } = req.body;
  
  if (!talk || !talk.rate || !talk.watchedAt) {
    return next({
      status,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  const talkValidation = checkTalk(talk);
  if (talkValidation.fail) {
    return next({ status: talkValidation.status, message: talkValidation.message });
  }
  next();
}

function talkerCheck(req, res, next) {
  const { name, age } = req.body;

  const nameValidation = checkName(name);
  const ageValidation = checkAge(age);

  if (nameValidation.fail) {
    return next({ status: nameValidation.status, message: nameValidation.message });
  }

  if (ageValidation.fail) {
    return next({ status: ageValidation.status, message: ageValidation.message });
  }
  next();
}

module.exports = { talkCheck, talkerCheck };
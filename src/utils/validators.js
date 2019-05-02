const validate = (value, rules, checkValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(value);
        break;
      case 'minLength':
        isValid = isValid && lengthValidator(value, rules[rule]);
        break;
      case 'noWhiteSpace':
        isValid = isValid && whiteSpaceValidator(value);
        break;
      case 'equalTo':
        isValid = isValid && equalityValidator(value, checkValue);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(value);
        break;
      default:
        break;
    }
  }
  return isValid;
};

const emailValidator = (value) => {
  const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return emailRegExp.test(value);
};

const lengthValidator = (value, minLength) => {
  return value.length >= minLength;
};

const whiteSpaceValidator = (value) => {
  return value === value.trim();
};

const equalityValidator = (value, checkValue) => {
  return value === checkValue;
};

const notEmptyValidator = (value) => {
  return value.trim() !== '';
};

export default validate;

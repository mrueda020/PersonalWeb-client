export const minLengthValidation = (inputData, minLength) => {
  const { value } = inputData;
  removeClassError(inputData);
  if (value.length >= minLength) {
    inputData.classList.add("success");
    return true;
  }
  inputData.classList.add("error");
  return false;
};

export const emailValidation = (inputData) => {
  const { value } = inputData;
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  removeClassError(inputData);
  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    inputData.classList.add("success");
    return resultValidation;
  }
  inputData.classList.add("error");
  return resultValidation;
};

const removeClassError = (inputData) => {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
};

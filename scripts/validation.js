export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_error-message",
  errorClass: "modal__error",
};

const showInputError = (form, input, errorMessage, config) => {
  const errorMessageID = input.id + "-error";
  const errorMessageText = form.querySelector("#" + errorMessageID);
  errorMessageText.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
};
const hideInputError = (form, input, config) => {
  const errorMessageID = input.id + "-error";
  const errorMessageText = form.querySelector("#" + errorMessageID);
  errorMessageText.textContent = "";
  input.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

const hasInvalidInput = (formInput) => {
  return formInput.some((inputContent) => {
    return !inputContent.validity.valid;
  });
};
const buttonDisabled = (buttonSubmit, config) => {
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add(config.inactiveButtonClass);
};
const toggleButtonState = (formInput, buttonSubmit, config) => {
  if (hasInvalidInput(formInput, config)) {
    buttonDisabled(buttonSubmit, config);
  } else {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove(config.inactiveButtonClass);
  }
};

export const validationReset = (form, formInput, config) => {
  formInput.forEach((input) => {
    hideInputError(form, input, config);
  });
  buttonDisabled(buttonSubmit, config);
};

const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonSubmit = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, buttonSubmit, config);

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, buttonSubmit, config);
    });
  });
};

export const enableValidation = (config) => {
  const formInput = document.querySelectorAll(config.formSelector);
  formInput.forEach((form) => {
    setEventListeners(form, config);
  });
};

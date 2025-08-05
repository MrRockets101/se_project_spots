// settings = {
//  formSelector: ".modal__form",
//  inputSelector: ".modal__input",
//  submitButtonSelector: ".modal__button",
//  inactiveButtonClass: "modal__button_disabled",
//  inputErrorClass: "modal__input_type_error",
//  errorClass: "modal__error_visible"
//}

const showInputError = (form, input, errorMessage) => {
  const errorMessageID = input.id + "-error";
  const errorMessageText = form.querySelector("#" + errorMessageID);
  errorMessageText.textContent = errorMessage;
  // const errorMessageDisplay = formInput.querySelector(".modal__error");
  // errorMessageDisplay.textContent = errorMessageText;
  input.classList.add(".modal__input_error-message");
};
const hideInputError = (form, input) => {
  const errorMessageID = input.id + "-error";
  const errorMessageText = form.querySelector("#" + errorMessageID);
  errorMessageText.textContent = "";
  // const errorMessageDisplay = formInput.querySelector(".modal__error");
  // errorMessageDisplay.textContent = errorMessageText;
  input.classList.remove(".modal__input_error-message");
};

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const hasInvalidInput = (formInput) => {
  return formInput.some((inputContent) => {
    return !inputContent.validity.valid;
  });
};
const buttonDisabled = (buttonSubmit) => {
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add("modal__submit-btn_disabled");
};
const toggleButtonState = (formInput, buttonSubmit) => {
  if (hasInvalidInput(formInput)) {
    buttonDisabled(buttonSubmit);
  } else {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove("modal__submit-btn_disabled");
  }
};

const validationReset = (form, formInput) => {
  formInput.forEach((input) => {
    hideInputError(form, input);
  });
  buttonDisabled(buttonSubmit);
};

const setEventListeners = (form) => {
  //const form = document.querySelectorALL(".modal__form");
  const inputs = Array.from(form.querySelectorAll(".modal__input"));
  const buttonSubmit = form.querySelector(".modal__submit-btn");

  toggleButtonState(inputs, buttonSubmit);

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input);
      toggleButtonState(inputs, buttonSubmit);
    });
  });
};

const enableValidation = () => {
  const formInput = document.querySelectorAll(".modal__form");
  formInput.forEach((form) => {
    setEventListeners(form);
  });
};

enableValidation();

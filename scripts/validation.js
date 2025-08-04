const showInputError = (form, input, errorMessage) => {
  const errorMessageID = input.id + "-error";
  const errorMessageText = document.querySelector("#" + errorMessageID);
  errorMessageText.textContent = errorMessage;
};

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.valdidationMessage);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.form(form.querySelectorAll(".modal__input"));
  const buttonElement = submit.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, button);

  inputList.forEach((input) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, input);
      //toggleButtonState(inputList, button);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

enableValidation();

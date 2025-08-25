import "./index.css";
import {
  enableValidation,
  settings,
  validationReset,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";
import { data } from "autoprefixer";
import { setButtonText } from "../utils/helper.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },

//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },

//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },

//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },

//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },

//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

//const indexHtmlImages = [
//  { name: "picture of avatar" , "./images/avatar.jpg" },
//  { name: "logo displaying spots" , "/images/logo.svg" },
//  { name: "edit button icon" , "./images/edit-button.svg" },
//  { name: "new post button" , "./images/post-button.svg" },
//];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "11a9d136-cc58-4622-9544-b00018e1733c",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([arrayCards, UserInfo]) => {
    console.log(arrayCards, UserInfo);
    arrayCards.forEach((item) => {
      renderCard(item);
    });
    profileName.textContent = UserInfo.name;
    profileDescription.textContent = UserInfo.about;
  })
  .catch(console.error);

const editProfileBtn = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__button-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__sub-text");
const editProfileNameInput = document.querySelector("#profile-name-input");
const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const form = document.querySelector(".modal__form");
const newPostForm = newPostModal.querySelector(".modal__form");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostInput = document.querySelector("#card-image-input");
const newPostCaption = document.querySelector("#card-caption-input");
const buttonSubmit = form.querySelector(".modal__submit-btn");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cards = document.querySelector(".cards");
const modalPreview = document.querySelector("#modal-preview");
const modalImageContainer = modalPreview.querySelector(
  ".modal__image-container"
);
const modalClosePreview = modalPreview.querySelector(".modal__close_preview");
const modalTitlePreview = modalPreview.querySelector(".modal__title-preview");
const previewImage = modalPreview.querySelector("#preview__image");
const modals = document.querySelectorAll(".modal");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseButton =
  editAvatarModal.querySelector(".modal__close-btn");
const profileAvatarInput = editAvatarModal.querySelector(
  "#profile-avatar-input"
);
const modalDelete = document.querySelector("#modal-delete");
const modalContainerDelete = modalDelete.querySelectorAll(
  ".modal__container-delete"
);
const cardButtonLike = card.querySelector(".card__button-like");
let cardButtonLiked = ".card__button-like_clicked";
const deleteCloseButton = document.querySelectorAll(".modal__close-btn-delete");
const deleteButton = modalDelete.querySelectorAll(".modal__delete-btn");
const cancelButton = modalDelete.querySelectorAll(".modal__cancel-btn");
const cardButtonDelete = document.querySelectorAll(".card__button-delete");
let selectedCard;
let selectedCardId;

//const
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}
function handleLike(evt, id) {
  //evt.target.classList.toggle("card__button-like_clicked");};
  classList.contains(cardButtonLiked, cardButtonLike);
  handleLikeStatus(id, isLiked)
    .then(toggle(cardButtonLiked, cardButtonLike))
    .catch(console.error);
  // not sure if correct, help here
}

function getCard(data) {
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;

  cardImage.addEventListener("click", () => {
    openModal(modalPreview);
    previewImage.src = data.link;
    previewImage.alt = data.name;
    modalTitlePreview.textContent = data.name;
  });

  cardImage.addEventListener("click", () => handleImageClick(data));

  // not sure how to parse this, help here
  if ({ isLiked: true }.then(handleLike));

  return card;
}

cardButtonLike.addEventListener("click", (evt) => handleLike(evt, data._id));
cardButtonDelete.addEventListener("click", () => {
  handleDeleteCard;
});

function handleDeleteSubmit() {
  const buttonSubmit = evt.submitter;
  setButtonText(button, false, "Delete", "Deleting...");
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      cardButtonDelete.closest(".card").remove();
      let card = null;
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(button, false, "Delete", "Deleting...");
    });
}

function renderCard(data) {
  const card = getCard(data);
  cards.append(card);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

cardButtonDelete.addEventListener("click", () => {
  openModal(modalDelete);
});

function handleDeleteCard(card, cardId) {
  selectedCard = card;
  selectedCardId = cardId;
  openModal(modalDelete);
}

deleteButton.addEventListener("click", () => {
  openModal(modalDelete);
});

modalClosePreview.addEventListener("click", () => {
  closeModal(modalPreview);
  document.removeEventListener("keydown", handleEscapeKey);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal_is-opened")) {
      closeModal(modal);
    }
  });
});

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});
cancelButton.addEventListener("click", () => {
  closeModal(modalDelete);
});

editProfileBtn.addEventListener("click", () => {
  openModal(editProfileModal);
  editProfileDescriptionInput.value = profileDescription.textContent;
  editProfileNameInput.value = profileName.textContent;
  validationReset(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.submitter;
  setButtonText(button, true);
  api
    .editUserInfo({
      name: editProfileNameInput,
      about: editProfileDescriptionInput,
    })
    .then((data) => {
      profileName.textContent = editProfileNameInput.value;
      profileDescription.textContent = editProfileDescriptionInput.value;
      evt.target.reset();
      buttonDisabled(buttonSubmit, settings);
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(button, false);
    });
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

profileAvatarButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});

editAvatarCloseButton.addEventListener("click", () => {
  closeModal(editAvatarModal);
});
deleteCloseButton.addEventListener("click", () => {
  closeModal(editAvatarModal);
});
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.submitter;
  setButtonText(button, true);

  console.log(profileAvatarInput.value);
  api
    .editAvatarInfo(profileAvatarInput.value)
    .then((data) => {
      console.log(data);
      profileAvatarInput.src = data.link;
    })
    // not sure if this is correct, need help here
    .catch(console.error)
    .finally(() => {
      setButtonText(button, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const buttonSubmit = evt.submitter;
  setButtonText(button, true);

  api
    .addCard({
      link: newPostInput.value,
      name: newPostCaption.value,
    })

    .catch(console.error)
    .finally(() => {
      setButtonText(button, false);
    });
  renderCard(newPostValues);
  evt.target.reset();
  toggleButtonState([newPostInput, newPostCaption], evt.submitter, settings);
}
editAvatarModal.addEventListener("submit", handleAvatarSubmit);

newPostForm.addEventListener("submit", handleAddCardSubmit);
modalDelete.addEventListener("submit", handleDeleteSubmit);
enableValidation(settings);

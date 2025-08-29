import "./index.css";
import {
  enableValidation,
  settings,
  validationReset,
  buttonDisabled,
  toggleButtonState,
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
const card = cards.querySelector(".card");
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
const formDelete = modalDelete.querySelector(".modal__delete-form-container");
const modalContainerDelete = modalDelete.querySelectorAll(
  ".modal__container-delete"
);

let cardButtonLiked = "card__button-like_clicked";
const deleteCloseButton = document.querySelector(".modal__close-btn-delete");
const deleteButton = modalDelete.querySelector(".modal__submit_delete-btn");
const cancelButton = modalDelete.querySelector(".modal__cancel-btn");
const profileAvatar = document.querySelector(".profile__avatar");
let selectedCard;
let selectedCardId;
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
    profileAvatar.src = UserInfo.avatar;
  })
  .catch(console.error);

//const
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

//function handleLikeClick (() => { classList.contains(cardButtonLiked, cardButtonLike)

//  evt.target.classList.toggle(cardButtonLiked, cardButtonLike)} );
//;}
function handleLike(evt, id) {
  api
    .handleLikedStatus(id, isLiked)
    .then(toggle(cardButtonLiked, cardButtonLike))
    .catch(console.error);
  // not sure if correct, help here
}
//cardButtonLike.addEventListener("click", () => {
//handleLike;
//});

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  modalTitlePreview.textContent = data.name;
  openModal(modalPreview);
}

function getCard(data) {
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardButtonDelete = card.querySelector(".card__button-delete");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;

  cardButtonDelete.addEventListener("click", () => {
    handleDeleteCard(card, data._id);
  });
  cardImage.addEventListener("click", () => handleImageClick(data));

  // not sure how to parse this, help here
  const cardButtonLike = card.querySelector(".card__button-like");
  if (data.isLiked) {
    cardButtonLike.classList.add(cardButtonLiked);
  }
  cardButtonLike.addEventListener("click", (evt) => {
    api
      .handleLikedStatus(data._id, data.isLiked)
      .then(() => {
        cardButtonLike.classList.toggle(cardButtonLiked);
      })
      .catch(console.error);
  });

  return card;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const deleteButton = evt.submitter;
  setButtonText(deleteButton, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      let card = null;
      closeModal(modalDelete);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteButton, false, "Delete", "Deleting...");
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

function handleDeleteCard(card, cardId) {
  selectedCard = card;
  selectedCardId = cardId;
  openModal(modalDelete);
}

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
  validationReset(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.submitter;
  setButtonText(buttonSubmit, true);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
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
      setButtonText(buttonSubmit, false);
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
  closeModal(modalDelete);
});
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.submitter;
  setButtonText(buttonSubmit, true);

  console.log(profileAvatarInput.value);
  api
    .editAvatarInfo(profileAvatarInput.value)
    .then((data) => {
      console.log(data);
      profileAvatarInput.src = data.avatar;
    })
    // not sure if this is correct, need help here
    .catch(console.error)
    .finally(() => {
      setButtonText(buttonSubmit, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const buttonSubmit = evt.submitter;
  setButtonText(buttonSubmit, true);

  api
    .addCard({
      link: newPostInput.value,
      name: newPostCaption.value,
    })
    .then((newCard) => {
      renderCard(newCard);
      evt.target.reset();
      toggleButtonState(
        [newPostInput, newPostCaption],
        evt.submitter,
        settings
      );
      closeModal(newPostModal);
    })

    .catch(console.error)
    .finally(() => {
      setButtonText(buttonSubmit, false);
    });
}
editAvatarModal.addEventListener("submit", handleAvatarSubmit);

newPostForm.addEventListener("submit", handleAddCardSubmit);
formDelete.addEventListener("submit", handleDeleteSubmit);
enableValidation(settings);

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__button-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__sub-text");
const editProfileNameInput = document.querySelector("#profile-name-input");
const editProfileDesiptionInput = document.querySelector(
  "#profile-description-input"
);
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

function renderCard(data) {
  const card = getCard(data);
  cards.append(card);
}

initialCards.forEach((item) => {
  renderCard(item);
});

function getCard(data) {
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;

  const cardButtonLike = card.querySelector(".card__button-like");
  cardButtonLike.addEventListener("click", function () {
    cardButtonLike.classList.toggle("card__button-like_clicked");
  });

  const cardButtonDelete = card.querySelector(".card__button-delete");
  cardButtonDelete.addEventListener("click", function () {
    cardButtonDelete.closest(".card").remove();
    let card = null;
  });

  cardImage.addEventListener("click", function () {
    openModal(modalPreview);
    previewImage.src = data.link;
    previewImage.alt = data.name;
    modalTitlePreview.textContent = data.name;
  });

  return card;
}

modalClosePreview.addEventListener("click", function () {
  closeModal(modalPreview);
});
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

newPostBtn.addEventListener("click", function () {
  //newPostModal.classList.add("modal_is-opened");
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  //newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
});

editProfileBtn.addEventListener("click", function () {
  //editProfileModal.classList.add("modal_is-opened");
  editProfileDesiptionInput.value = profileDescription.textContent;
  editProfileNameInput.value = profileName.textContent;
  validationReset(editProfileForm, [
    editProfileNameInput,
    editProfileDesiptionInput,
  ]);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  //editProfileModal.classList.remove("modal_is-opened");
  closeModal(editProfileModal);
});

// Create the form submission handler.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Get the values of each form field from the value
  // property of the corresponding input element.

  // Insert these new values into the textContent
  // property of the corresponding profile elements.
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDesiptionInput.value;

  // Close the modal.
  //editProfileModal.classList.remove("modal_is-opened");
  evt.target.reset();
  buttonDisabled(buttonSubmit);
  closeModal(editProfileModal);
}

// Create the form submission handler.
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Log both input values to the console.
  const newPostValues = {
    link: newPostInput.value,
    name: newPostCaption.value,
  };

  renderCard(newPostValues);
  // Close the modal.

  //newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
}

// Create the submit listener.
newPostForm.addEventListener("submit", handleAddCardSubmit);

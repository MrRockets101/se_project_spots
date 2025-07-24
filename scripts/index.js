const initialCards = [
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
const newPostForm = newPostModal.querySelector(".modal__form");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostInput = document.querySelector("#card-image-input");
const newPostCaption = document.querySelector("#card-caption-input");
const card = document.querySelector(".card");
const cardImage = card.querySelector(".card__image");
const cardText = card.querySelector(".card__text");
const submitBtn = newPostModal.querySelector(".modal__submit-btn");

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

initialCards.forEach(function (card) {
  console.log(card.name);
  console.log(card.link);
});
editProfileBtn.addEventListener("click", function () {
  //editProfileModal.classList.add("modal_is-opened");
  editProfileDesiptionInput.value = profileDescription.textContent;
  editProfileNameInput.value = profileName.textContent;
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
  closeModal(editProfileModal);
}

// Create the form submission handler.
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Log both input values to the console.
  console.log(newPostInput.value);
  console.log(newPostCaption.value);
  // Close the modal.

  //newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
}

// Create the submit listener.
newPostForm.addEventListener("submit", handleAddCardSubmit);

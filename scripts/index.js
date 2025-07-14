const editProfileBtn = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

const newPostBtn = document.querySelector(".profile__button-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = editProfileModal.querySelector(".modal__close-btn");

newPostBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

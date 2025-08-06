const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector("#new-post-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  document.addEventListener("keydown", handleEscapeKey, { once: true });
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  // You might want to remove the escape key listener here if you want it to be added again only when the modal opens
  // document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeModal(newPostModal);
  }
}

// Open modal when newPostBtn is clicked
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// Close modal when close button is clicked
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Close modal when clicking outside of it or on a close button within the modal
newPostModal.addEventListener("click", function (event) {
  if (
    event.target.matches(".modal__close-btn") ||
    !event.target.closest(".modal")
  ) {
    closeModal(newPostModal);
  }
});

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}
const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal_is-opened"))
      if (
        target.matches(".modal__close-btn") ||
        target.closest(".modal__container")
      ) {
        closeModal(modal);
        document.removeEventListener("keydown", handleEscapeKey);
      }
  });
});

export function setButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "saving..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = defaultText;
  }
}

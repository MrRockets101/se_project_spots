export function setButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "saving..."
) {
  if (isLoading) {
    defaultText;
  } else {
    loadingText;
  }
}

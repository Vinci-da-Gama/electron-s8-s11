// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const showModalBtn = document.getElementById("show-modal"),
  closeModalBtn = document.getElementById("close-modal"),
  modal = document.getElementById("modal");

showModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");
const items = require("./items");

const showModalBtn = document.getElementById("show-modal"),
  closeModalBtn = document.getElementById("close-modal"),
  modal = document.getElementById("modal"),
  addItemBtn = document.getElementById("add-item"),
  itemUrl = document.getElementById("url"),
  searchInput = document.getElementById("search");

ipcRenderer.on("menu-show-modal", () => {
  showModalBtn.click();
});
ipcRenderer.on("menu-open-item", () => {
  items.openUrl();
});
ipcRenderer.on("menu-delete-item", () => {
  const { index } = items.getSelectedItem();
  items.delete(index);
});
ipcRenderer.on("menu-open-item-native", () => {
  items.openNative();
});
ipcRenderer.on("menu-focus-search", () => {
  searchInput.focus();
});

searchInput.addEventListener("keyup", (e) => {
  Array.from(document.getElementsByClassName("read-item")).forEach((item) => {
    console.log("16 -- item innerText: ", item.innerText.toLowerCase());
    let hasMatch = item.innerText.toLowerCase().includes(searchInput.value);
    item.style.display = hasMatch ? "flex" : "none";
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    items.changeSelection(e.key);
  }
});

const toggleModalButtons = () => {
  if (addItemBtn.disabled) {
    addItemBtn.disabled = false;
    addItemBtn.style.opacity = 1;
    addItemBtn.innerText = "Add Item";
    closeModalBtn.style.display = "inline";
  } else {
    addItemBtn.disabled = true;
    addItemBtn.style.opacity = 0.5;
    addItemBtn.innerText = "Adding...";
    closeModalBtn.style.display = "none";
  }
};

showModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  itemUrl.focus();
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

addItemBtn.addEventListener("click", () => {
  itemUrl.value && ipcRenderer.send("new-item", itemUrl.value);
  toggleModalButtons();
});

ipcRenderer.on("new-item-success", (e, newItem) => {
  items.addItem(newItem, true);

  toggleModalButtons();

  modal.style.display = "none";
  itemUrl.value = "";
});

itemUrl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addItemBtn.click();
});

const fs = require("fs");

let items = document.getElementById("items");

const storageItemKey = "readit-items";
const riClassName = "read-item";
const selectedClass = "selected";

let readerJs;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
  if (err) {
    console.log("12 -- err: ", err || err.message);
  }
  readerJs = data.toString();
});

exports.storage = JSON.parse(localStorage.getItem(storageItemKey)) || [];

window.addEventListener("message", (e) => {
  if (e.data.action === "delete-reader-item") {
    this.delete(e.data.targetIndex);
    e.source.close();
  }
});

exports.delete = (itemIndex) => {
  items.removeChild(items.childNodes[itemIndex]);
  this.storage.splice(itemIndex, 1);
  this.save();

  if (this.storage.length) {
    // redo selected item after deleted
    const itemIdxAfterDelete = itemIndex === 0 ? 0 : itemIndex - 1;
    document
      .getElementsByClassName(riClassName)
      [itemIdxAfterDelete].classList.add(selectedClass);
  }
};

exports.getSelectedItem = () => {
  const currItem = document.getElementsByClassName(
    `${riClassName} ${selectedClass}`
  )[0];
  let itemIdx = 0,
    child = currItem;
  while ((child = child.previousElementSibling) != null) itemIdx++;
  return {
    node: currItem,
    index: itemIdx,
  };
};

exports.save = () => {
  localStorage.setItem(storageItemKey, JSON.stringify(this.storage));
};

exports.select = (e) => {
  this.getSelectedItem().node.classList.remove(selectedClass);
  e.currentTarget.classList.add(selectedClass);
};

exports.changeSelection = (keyDirection) => {
  const currItem = this.getSelectedItem().node;
  if (keyDirection === "ArrowUp" && currItem.previousElementSibling) {
    currItem.classList.remove(selectedClass);
    currItem.previousElementSibling.classList.add(selectedClass);
  } else if (keyDirection === "ArrowDown" && currItem.nextElementSibling) {
    currItem.classList.remove(selectedClass);
    currItem.nextElementSibling.classList.add(selectedClass);
  }
};

exports.openUrl = () => {
  if (!this.storage.length) return;
  const { node, index } = this.getSelectedItem();
  const contentUrl = node.dataset.url;
  let readerWin = window.open(
    contentUrl,
    "",
    `
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
    `
  );
  readerWin.eval(readerJs.replace("{{index}}", index));
};

exports.addItem = (item, isNew = false) => {
  let itemNode = document.createElement("div");
  itemNode.setAttribute("class", riClassName);
  itemNode.setAttribute("data-url", item.url);
  itemNode.innerHTML = `<img src="${item.screenshot}" alt="${item.url}_${item.title}" /><h2>${item.title}</h2>`;
  items.appendChild(itemNode);

  // set selected item at beginning
  itemNode.addEventListener("click", this.select);
  if (document.getElementsByClassName(riClassName).length === 1) {
    itemNode.classList.add(selectedClass);
  }

  itemNode.addEventListener("dblclick", this.openUrl);

  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

this.storage.forEach((el) => {
  this.addItem(el);
});

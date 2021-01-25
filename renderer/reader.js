const readitClose = document.createElement("div");
readitClose.innerText = "Close and Del";

readitClose.style.position = "fixed";
readitClose.style.bottom = "15px";
readitClose.style.right = "15px";
readitClose.style.padding = "5px 10px";
readitClose.style.fontSize = "20px";
readitClose.style.fontWeight = "bold";
readitClose.style.backgroundColor = "dodgerblue";
readitClose.style.color = "#fff";
readitClose.style.borderRadius = "5px";
readitClose.style.cursor = "default";
readitClose.style.boxShadow = "2px 2px 2px rgba(0,0,0,.2)";
readitClose.style.zIndex = "3333";
readitClose.style.userSelect = "none";

readitClose.onclick = (e) => {
  window.opener.postMessage(
    {
      action: "delete-reader-item",
      targetIndex: "{{index}}",
    },
    "*"
  );
};

document.getElementsByTagName("body")[0].append(readitClose);

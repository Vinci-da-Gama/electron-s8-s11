const { Menu, shell } = require("electron");

module.exports = (mainWinWebcontent) => {
  const template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add New",
          accelerator: "CmdOrCtrl+o", // lowcase o is same as uppcase O here
          click: () => {
            mainWinWebcontent.send("menu-show-modal");
          },
        },
        {
          label: "Read Item",
          accelerator: "CmdOrCtrl+Enter",
          click: () => {
            mainWinWebcontent.send("menu-open-item");
          },
        },
        {
          label: "Delete Item",
          accelerator: "CmdOrCtrl+Backspace",
          click: () => {
            mainWinWebcontent.send("menu-delete-item");
          },
        },
        {
          label: "Open in Browser",
          accelerator: "CmdOrCtrl+Shift+Enter",
          click: () => {
            mainWinWebcontent.send("menu-open-item-native");
          },
        },
        {
          label: "Focus Search Input",
          accelerator: "CmdOrCtrl+s",
          click: () => {
            mainWinWebcontent.send("menu-focus-search");
          },
        },
      ],
    },
    { role: "editMenu" },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          label: "Learn more",
          click: () => {
            shell.openExternal(
              "https://github.com/Vinci-da-Gama/electron-s8-s11"
            );
          },
        },
      ],
    },
  ];
  if (process.platform === "darwin") template.unshift({ role: "appMenu" });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

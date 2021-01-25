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

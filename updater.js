const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
// logger for update
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.autoDownload = false;

module.exports = () => {
  autoUpdater.checkForUpdates();

  autoUpdater.on("update-available", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update available",
        message: "A new version is available. Do you want to update now?",
        buttons: ["Update", "No"],
      })
      .then((resp) => {
        const btnIdx = resp.response;
        btnIdx === 0 && autoUpdater.downloadUpdate();
      })
      .catch((error) => {
        console.log("25 -- update error: ", error.message);
      });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update ready",
        message: "Install & restart now?",
        buttons: ["Yes", "Later"],
      })
      .then((resp) => {
        console.log("38 - resp: ", resp);
        const btnIdx = resp.response;
        btnIdx === 0 && autoUpdater.quitAndInstall(false, true);
      })
      .catch((error) => {
        console.log("43 -- install error: ", error.message);
      });
  });
};

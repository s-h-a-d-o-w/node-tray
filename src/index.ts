import path from "node:path";
import { Tray, TrayItem } from "./Tray.js";

const ids = {
  autolaunch: Symbol(),
  exit: Symbol(),
};

const createTray = () => {
  const trayItems = [
    {
      id: ids.autolaunch,
      text: "Run on startup",
      enabled: true,
      checked: false,
    },
    {
      id: ids.exit,
      text: "Exit",
      enabled: true,
    },
  ];

  const tray = new Tray({
    icon: path.join(import.meta.dirname, "../assets/icon.ico"),
    items: trayItems,
    tooltip: `Spotify Ad Blocker`,
  });

  tray.on("click", function clickHandler(this: Tray, item: TrayItem) {
    if (item.id === ids.autolaunch) {
      item.checked = !item.checked;
      this.updateItem(item);
      this.updateIcon(
        path.join(import.meta.dirname, "../assets/icon2.ico"),
        "whatever",
      );
    } else if (item.id === ids.exit) {
      console.log("Exiting...");

      // No need to wait or anything because the main thread stays active until all other threads have finished executing anyway.
      this.destroy();
      process.exit(0);
    }
  });
};

createTray();

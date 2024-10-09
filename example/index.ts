import path from "node:path";
import {
  createTrayIcon,
  destroyTrayIcon,
  TrayItem,
  updateTrayIconImage,
  updateTrayItem,
  updateTrayTooltip,
} from "../src/tray.js";

const trayItems: TrayItem[] = [
  {
    id: Symbol(),
    text: "Toggle me",
    enabled: true,
    checked: false,
    onClick: (item) => {
      updateTrayItem({
        ...item,
        checked: !item.checked,
      });
      updateTrayIconImage(
        path.join(import.meta.dirname, "../assets/icon2.ico"),
      );
      updateTrayTooltip("Toggle happened");
    },
  },
  {
    id: Symbol(),
    text: "Exit",
    enabled: true,
    onClick: () => {
      console.log("Exiting...");

      // No need to wait or anything because the main thread stays active until all other threads have finished executing anyway.
      destroyTrayIcon();
      process.exit(0);
    },
  },
];

createTrayIcon({
  icon: path.join(import.meta.dirname, "../assets/icon.ico"),
  items: trayItems,
  tooltip: `Spotify Ad Blocker`,
});

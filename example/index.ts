import path from "node:path";
import {
  createTrayIcon,
  destroyTrayIcon,
  updateTrayIconImage,
  updateTrayItem,
  updateTrayTooltip,
  type TrayItem,
} from "../dist/tray.cjs";

const trayItems: TrayItem[] = [
  {
    id: Symbol("toggle"),
    text: "Toggle me",
    enabled: true,
    checked: false,
    onClick: (item) => {
      updateTrayItem({
        ...item,
        checked: !item.checked,
      });
      updateTrayIconImage(
        path.join(
          import.meta.dirname,
          item.checked ? "../assets/icon.ico" : "../assets/icon_white.ico",
        ),
      );
      updateTrayTooltip("Toggle happened");
    },
  },
  {
    id: Symbol("exit"),
    text: "Exit",
    enabled: true,
    onClick: () => {
      console.log("Exiting...");
      destroyTrayIcon();
      process.exit(0);
    },
  },
];

void createTrayIcon({
  icon: path.join(import.meta.dirname, "../assets/icon.ico"),
  items: trayItems,
  tooltip: `Spotify Ad Blocker`,
});

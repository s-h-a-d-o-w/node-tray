import path from "node:path";
import {
  createTrayIcon,
  destroyTrayIcon,
  updateTrayIconImage,
  updateTrayItem,
  updateTrayTooltip,
  type TrayItem,
} from "../src/tray.ts";

const ICON_EXTENSION = process.platform === "win32" ? ".ico" : ".png";

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
          item.checked
            ? `../assets/icon${ICON_EXTENSION}`
            : `../assets/icon_white${ICON_EXTENSION}`,
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
  icon: path.join(import.meta.dirname, `../assets/icon${ICON_EXTENSION}`),
  items: trayItems,
  tooltip: `Spotify Ad Blocker`,
});

import bindings from "bindings";

export type TrayItem = {
  // We didn't abstract away `id` so that users can have duplicate texts and update items from anywhere, not just via click handlers.
  id: symbol;
  text: string;

  /**
   * @default false
   */
  checked?: boolean;
  /**
   * @default true
   */
  enabled?: boolean;
  onClick?: (item: TrayItem) => void;
};

type TrayIcon = {
  icon: string;
  items: TrayItem[];

  tooltip?: string;
};

const tray = bindings("addon");
let _trayIcon: TrayIcon | undefined;

/**
 * Can only be called once - it's not possible to create multiple tray icons.
 */
export function createTrayIcon(trayIcon: TrayIcon) {
  if (_trayIcon) {
    throw new Error("May only be called once!");
  }
  _trayIcon = trayIcon;

  if (trayIcon.items.length > 0) {
    const uniqueIds = new Set(
      trayIcon.items.map(({ id }) => id).filter((id) => id !== undefined),
    );
    if (uniqueIds.size !== trayIcon.items.length) {
      throw new Error("IDs must be defined and unique!");
    }

    // Mutate with default values. (I figure if the user doesn't provide anything, they wouldn't mind us mutating their object. And they can always still update it later on however they want to.)
    trayIcon.items.forEach((item) => {
      item.checked ??= false;
      item.enabled ??= true;
    });

    tray.create(
      trayIcon.icon,
      trayIcon.tooltip,
      trayIcon.items,
      (item: TrayItem) => {
        // Since we can't mutate memory managed by the native addon, fresh objects are created and we establish the relationship via the shared immutable ids.
        trayIcon.items.find(({ id }) => item.id === id)?.onClick?.(item);
      },
    );
  } else {
    throw new Error("At least one item has to be provided.");
  }
}

export function destroyTrayIcon() {
  tray.exit();
}

export function updateTrayIconImage(icon: string) {
  wasCreatedGuard();
  tray.updateIcon(icon);
}

export function updateTrayItem(item: TrayItem) {
  wasCreatedGuard();

  item.checked ??= false;
  item.enabled ??= true;

  try {
    tray.update(item);
  } catch (e) {
    console.error(e);
  }
}

export function updateTrayTooltip(tooltip: string) {
  wasCreatedGuard();
  tray.updateTooltip(tooltip);
}

function wasCreatedGuard() {
  if (!_trayIcon) {
    throw new Error("Tray icon hasn't been created yet!");
  }
}

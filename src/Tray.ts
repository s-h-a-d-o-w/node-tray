import { EventEmitter } from "events";
import bindings from "bindings";

const tray = bindings("addon");

export type TrayItem = {
  id: symbol;
  text: string;
  enabled: boolean;
  checked?: boolean;
  wrappedId?: {
    id: symbol;
  };
};

export class Tray extends EventEmitter {
  icon: string;
  items: TrayItem[];
  tooltip: string;
  wrappedIds: {
    [key: symbol]: {
      id: symbol;
    };
  };

  addDefaults(item: TrayItem) {
    return Object.assign(
      {
        text: "",
        enabled: true,
        checked: false,
      },
      item,
    );
  }

  click(item: TrayItem) {
    this.emit("click", item);
  }

  constructor(opts: { icon: string; items: TrayItem[]; tooltip?: string }) {
    super();

    this.icon = opts.icon || "";
    this.tooltip = opts.tooltip || "";
    this.items = opts.items;

    // The IDs the user passes in are mostly just for their convenience, the native addon
    // uses references to objects that are not allowed to change.
    // These objects are based on the IDs the user provides. The structure looks like this:
    // let FOO = Symbol()
    // item: { id: FOO, text: '...', [...] }
    // Which we use for identification like so:
    // this.wrappedIds[FOO] = { id: FOO }
    this.wrappedIds = {};

    if (this.icon && this.items && this.items.length > 0) {
      const uniqueIds = new Set(
        this.items.map(({ id }) => id).filter((id) => id !== undefined),
      );
      if (uniqueIds.size !== this.items.length) {
        throw new Error("IDs must be defined and unique!");
      }

      // Prep items with default values and wrapping their IDs
      this.items = this.items.map((item) => {
        item = this.addDefaults(item);

        // this.wrappedIds[item.id] = {
        //   id: item.id,
        // };

        return item;
        // return this.wrapId(item);
      });

      tray.create(this.icon, this.tooltip, this.items, this.click.bind(this));
    } else {
      throw "tray: An icon and at least one item have to be provided.";
    }
  }

  destroy() {
    tray.exit();
  }

  // The whole id wrapping unfortunately is necessary to enable using <any> type
  // for it, since we need to keep persistent references inside the native code and there are only
  // references to objects.

  // Wrapping object has to stay the same object throughout!
  unwrapId(item: TrayItem) {
    item.id = item.wrappedId!.id;
    delete item.wrappedId;
    return item;
  }

  updateItem(item: TrayItem) {
    try {
      tray.update(item);
    } catch (e) {
      console.error(e);
    }
  }

  updateIcon(icon?: string, tooltip?: string) {
    if (typeof icon === "string") {
      this.icon = icon;
    }
    if (typeof tooltip === "string") {
      this.tooltip = tooltip;
    }

    tray.updateIcon(this.icon, this.tooltip);
  }

  wrapId(item: TrayItem) {
    item.wrappedId = this.wrappedIds[item.id];
    // @ts-expect-error
    delete item.id;
    return item;
  }
}

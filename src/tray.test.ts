import path from "node:path";
import {
  createTrayIcon,
  destroyTrayIcon,
  TrayItem,
  updateTrayIconImage,
  updateTrayItem,
  updateTrayTooltip,
} from "./tray.js";

const ids = {
  foo: Symbol(),
  bar: Symbol(),
};

const trayItems: TrayItem[] = [
  {
    id: ids.foo,
    text: "foo",
    enabled: true,
    checked: false,
  },
  {
    id: ids.bar,
    text: "bar",
    enabled: true,
  },
];

test("everything can be called without crashing", async () => {
  await createTrayIcon({
    icon: path.join(import.meta.dirname, "../assets/icon.ico"),
    items: trayItems,
    tooltip: `start`,
  });

  updateTrayItem({
    id: ids.bar,
    text: "baz",
  });
  updateTrayIconImage(path.join(import.meta.dirname, "../assets/icon2.ico"));
  updateTrayTooltip("finish");

  destroyTrayIcon();
});

test("only allowed to be called once", async () => {
  await createTrayIcon({
    icon: path.join(import.meta.dirname, "../assets/icon.ico"),
    items: trayItems,
    tooltip: `start`,
  });

  await expect(
    createTrayIcon({
      icon: path.join(import.meta.dirname, "../assets/icon.ico"),
      items: trayItems,
      tooltip: `start`,
    }),
  ).rejects.toMatchInlineSnapshot(`[Error: May only be called once!]`);

  destroyTrayIcon();
});

test("throws when attempting to use an incompatible image", async () => {
  await expect(
    createTrayIcon({
      icon: path.join(import.meta.dirname, "../assets/icon2.png"),
      items: trayItems,
      tooltip: `start`,
    }),
  ).rejects.toMatchInlineSnapshot(
    `[Error: Image mime type has to be "image/x-icon"! (Instead got: image/png)]`,
  );

  // Doesn't do anything because nothing was created but... also shouldn't cause an error.
  destroyTrayIcon();
});

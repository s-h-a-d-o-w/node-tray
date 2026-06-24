// oxlint-disable vitest/expect-expect vitest/prefer-expect-assertions
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  createTrayIcon,
  destroyTrayIcon,
  TrayItem,
  updateTrayIconImage,
  updateTrayItem,
  updateTrayTooltip,
} from "./tray.ts";

const ids = {
  foo: Symbol("foo"),
  bar: Symbol("bar"),
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

describe(createTrayIcon, () => {
  it("everything can be called without crashing", async () => {
    await createTrayIcon({
      icon: path.join(import.meta.dirname, "../assets/icon.ico"),
      items: trayItems,
      tooltip: `start`,
    });

    updateTrayItem({
      id: ids.bar,
      text: "baz",
    });
    updateTrayIconImage(
      path.join(import.meta.dirname, "../assets/icon_white.ico"),
    );
    updateTrayTooltip("finish");

    destroyTrayIcon();
  });

  it("is only allowed to be called once", async () => {
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

  it("throws when attempting to use an incompatible image", async () => {
    await expect(
      createTrayIcon({
        icon: path.join(import.meta.dirname, "../assets/icon_white.jpg"),
        items: trayItems,
        tooltip: `start`,
      }),
    ).rejects.toMatchInlineSnapshot(
      `[Error: Image mime type has to be "image/x-icon" or "image/png"! (Instead got: image/jpeg)]`,
    );

    // Doesn't do anything because nothing was created but... also shouldn't cause an error.
    destroyTrayIcon();
  });
});

[![npm version](https://img.shields.io/npm/v/node-tray.svg)](https://www.npmjs.com/package/node-tray)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# node-tray

Another library for rendering a tray icon.

## Requirements

### Linux

- libgtk-3-dev
- xorg-dev
- libayatana-appindicator3-dev

## Usage

See directory `example`.

When using a display scale other than 100% on Windows, the tray icon will look a bit soft. This can be resolved by enabling "compatibility setting -> high DPI -> scaling behavior performed by: application" for whatever executable you end up running this with/in. (Or inject a DPI manifest somehow - please let me know if you manage to do that successfully! 😄)

## Usage in a prebuilt app

If you want to use something like `node:sea` to publish your app, you have to ship the bindings library (and its dependencies) and `tray.node` alongside the .exe. You can check out [this project of mine](https://github.com/s-h-a-d-o-w/s3-smart-sync) for reference.

## Differences to other projects

- [`ctray`](https://github.com/diogoalmiro/ctray) seems decent - check whether it maybe fits your needs better! It doesn't seem to allow for updating tray items "in place" though. (And initially, it bothered me that it doesn't support MacOS. I can't test on MacOS but at least there's a theoretical implementation. Contributions welcome!)
- `systray` relies on a precompiled binary - problematic secure-wise: https://github.com/zaaack/node-systray/tree/master/traybin
- `trayicon` relies on a precompiled binary - problematic secure-wise: https://github.com/131/trayicon/blob/80837912e07c453ad39deea70b1fc566aa98faf3/index.js#L16.

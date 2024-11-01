[![npm version](https://img.shields.io/npm/v/node-tray.svg)](https://www.npmjs.com/package/node-tray)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# node-tray

Another library for rendering a tray icon on Windows.

## Usage

See `example`.

When using a display scale other than 100% on Windows, the tray icon will look a bit soft. This can be resolved by enabling "compatibility setting -> high DPI -> scaling behavior performed by: application" for whatever executable you end up running this with/in. (Or inject a DPI manifest somehow - please let me know if you manage to do that successfully! 😄)

## Usage in a prebuilt app

If you want to use something like `node:sea` to publish your app, you have to ship the bindings library (and its dependencies) and `tray.node` alongside the .exe. You can check out [this project of mine](https://github.com/s-h-a-d-o-w/s3-smart-sync) for reference.

## Differences to other projects

- [`ctray`](https://github.com/diogoalmiro/ctray) seems decent - check whether it maybe fits your needs better! It doesn't seem to allow for updating tray items "in place" though. (And initially, it bothered me that it doesn't support MacOS. Now, I'm supporting even less of course. I probably should have just contributed to that project instead of creating this. But it's done and I have to move on...)
- `systray` relies on a precompiled binary - problematic secure-wise: https://github.com/zaaack/node-systray/tree/master/traybin
- `trayicon` relies on a precompiled binary - problematic secure-wise: https://github.com/131/trayicon/blob/80837912e07c453ad39deea70b1fc566aa98faf3/index.js#L16.

## How to dev/build

### Windows

Should just work out of the box.

### Linux

Installing dependencies will probably fail, because compilation is part of that.

On Debian based systems:
1. `sudo apt-get install libgtk-3-dev xorg-dev libappindicator3-dev`
2. Run `install` again or `pnpm dev`.
3. If it still fails, you might have to update `PKG_CONFIG_PATH` in `node-gyp` depending on whether your distro installs the libraries somewhere else. (And possibly the precise version of `appindicator`.)

## Dev notes

- ~~Ideally use [this cross platform tray implementation](https://github.com/dmikushin/tray) instead of the current one (which originally also supports multiple platforms but is out of date anyway). I've not been able to compile it on my Windows machine.~~ It's not feasible to use this because it can't be compiled using just `node-gyp`. So the only thing that could be done would be to re-enable support for Linux using the original tray library.

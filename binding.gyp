{
  "targets": [{
    "target_name": "tray",
    "cflags!": [ "-fno-exceptions" ],
    "cflags_cc!": [ "-fno-exceptions" ],
    "sources": [ "./src/tray.cpp" ],
    "include_dirs": [
      "<!@(node -p \"require('node-addon-api').include\")"
    ],
    "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
    'conditions': [
      ['OS=="linux"', {
        'defines': ['TRAY_APPINDICATOR'],
        "include_dirs": [
          "<!(PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/share/pkgconfig pkg-config --cflags gtk+-3.0)",
          "<!(PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/share/pkgconfig pkg-config --cflags appindicator3-0.1)"
        ],
        'libraries': [
          "<!(PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/share/pkgconfig pkg-config pkg-config --libs gtk+-3.0)",
          "<!(PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/share/pkgconfig pkg-config --libs appindicator3-0.1)"
        ]
      }],
      ['OS=="win"', {
        'defines': ['TRAY_WINAPI']
      }],
      ['OS=="darwin"', {
        'defines': ['TRAY_APPKIT']
      }]
    ]
  }]
}
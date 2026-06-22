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
        'cflags': [
          '<!@(PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/share/pkgconfig pkg-config --cflags gtk+-3.0 ayatana-appindicator3-0.1)'
        ],
        'cflags_cc': [
          '<!@(PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/share/pkgconfig pkg-config --cflags gtk+-3.0 ayatana-appindicator3-0.1)'
        ],
        'libraries': [
          '<!@(PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/share/pkgconfig pkg-config --libs gtk+-3.0 ayatana-appindicator3-0.1)'
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
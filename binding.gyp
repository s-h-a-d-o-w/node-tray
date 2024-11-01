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
# SharpZone

Depth of field and hyperfocal distance.

H = f^2 / (N c) + f; near = H s / (H + (s - f)); far = H s / (H - (s - f)), infinite when s >= H.
Circle of confusion presets: full frame 0.030 mm, APS-C (Canon) 0.019 mm, Micro Four Thirds 0.015 mm. It is a convention for acceptable sharpness, not a physical constant.

Tests: Canon Europe 28 mm f/16 example (1,633 mm before the +f term), lensandshutter.com 50 mm f/8 at 10 ft (about 6 ft 3 in total).

Static client-side. `node test-engine.js` runs the tests.

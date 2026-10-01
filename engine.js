(function (root) {
  'use strict';
  // All lengths in millimetres. f focal length, N f-number, c circle of confusion, s focus distance (to lens).
  var SENSORS = { ff: { name: 'Full frame', c: 0.030 }, apsc: { name: 'APS-C (Canon)', c: 0.019 }, mft: { name: 'Micro Four Thirds', c: 0.015 } };
  function hyperfocal(f, N, c) { return f * f / (N * c) + f; }
  function limits(f, N, c, s) {
    var H = hyperfocal(f, N, c), near = H * s / (H + (s - f)), far = s >= H ? Infinity : H * s / (H - (s - f));
    return { H: H, near: near, far: far, total: far === Infinity ? Infinity : far - near };
  }
  // Focus at the hyperfocal distance: sharp from H/2 to infinity
  function hyperfocalFocus(f, N, c) { var H = hyperfocal(f, N, c); return { focus: H, near: H / 2, far: Infinity }; }
  var MM_PER_FT = 304.8;
  function mmToFt(x) { return x / MM_PER_FT; } function ftToMm(x) { return x * MM_PER_FT; }
  var api = { SENSORS: SENSORS, hyperfocal: hyperfocal, limits: limits, hyperfocalFocus: hyperfocalFocus, mmToFt: mmToFt, ftToMm: ftToMm };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Sharp = api;
})(typeof window !== 'undefined' ? window : this);

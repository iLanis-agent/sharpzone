var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
// Canon Europe worked example: 28mm, f/16, full frame c=0.030 -> f^2/(N c) = 784/0.48 = 1633 mm (the page omits the small +f term)
eq(E.hyperfocal(28, 16, 0.030) - 28, 1633.3333333, 'canon term', 1e-3); eq(E.hyperfocal(28, 16, 0.030), 1661.3333, 'with +f', 1e-3);
eq(E.SENSORS.ff.c, 0.030, 'ff coc'); eq(E.SENSORS.apsc.c, 0.019, 'apsc coc');
// lensandshutter.com: full frame 50mm focused at 10 ft, f/8 -> total DOF 6 ft 3 in (6.25 ft)
var L = E.limits(50, 8, 0.030, E.ftToMm(10)); eq(E.mmToFt(L.total), 6.25, 'lensandshutter 6ft3in', 0.1);
// 50mm f/8 FF hyperfocal = 2500/0.24 + 50
eq(E.hyperfocal(50, 8, 0.030), 10466.6667, 'H 50/8', 1e-3);
// Focus at H: far is infinity, near is H/2
var h = E.hyperfocalFocus(50, 8, 0.030); eq(h.near, 5233.3333, 'near H/2', 1e-3); eq(h.far === Infinity ? 1 : 0, 1, 'far inf');
var Lh = E.limits(50, 8, 0.030, E.hyperfocal(50, 8, 0.030)); eq(Lh.far === Infinity ? 1 : 0, 1, 'limits at H far inf'); eq(Lh.near, E.hyperfocal(50, 8, 0.030) / 2, 'near at H', 30); 
// monotonic: smaller aperture (bigger N) -> shorter hyperfocal; longer lens -> longer hyperfocal; bigger sensor CoC -> shorter
eq(E.hyperfocal(50, 16, 0.030) < E.hyperfocal(50, 8, 0.030) ? 1 : 0, 1, 'N'); eq(E.hyperfocal(85, 8, 0.030) > E.hyperfocal(50, 8, 0.030) ? 1 : 0, 1, 'f'); eq(E.hyperfocal(50, 8, 0.019) > E.hyperfocal(50, 8, 0.030) ? 1 : 0, 1, 'coc');
// near < s < far
L = E.limits(35, 5.6, 0.030, 3000); eq(L.near < 3000 && 3000 < L.far ? 1 : 0, 1, 'bracket');
// conversions
eq(E.mmToFt(304.8), 1, 'ft'); eq(E.ftToMm(10), 3048, 'mm');
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);

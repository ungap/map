var Map = require('../cjs');
var $Map = Map;
test();

delete require.cache[require.resolve('../cjs')];
delete global.Map;

if (typeof process !== 'undefined') {
  var i = 0;
  Object.defineProperty(global, 'Map', {
    configurable: true,
    get: function () {
      if (1 === i++)
        throw $Map;
      return $Map;
    },
    set: function (Map) {
      delete global.Map;
      global.Map = Map;
    }
  });
}

Map = require('../cjs');
global.Map = $Map;

test();

function test() {
  var a = {};
  var b = {};

  var ws1 = new Map;
  var ws2 = new Map([[a, b]]);

  console.assert(ws1.has(a) === false);
  console.assert(ws1.set(a, 456) === ws1);
  console.assert(ws1.set(a, 123) === ws1);
  console.assert(ws1.has(a) === true);
  console.assert(ws1.size === 1);
  ws1.clear();
  ws1.set(a, b);
  var entries = ws1.entries();
  if (entries instanceof Array) {
    console.assert(entries.length === 1);
    console.assert(entries[0][0] === a);
    console.assert(entries[0][1] === b);
  }
  var keys = ws1.keys();
  if (keys instanceof Array) {
    console.assert(keys.length === 1);
    console.assert(keys[0] === a);
  }
  var values = ws1.values();
  if (values instanceof Array) {
    console.assert(values.length === 1);
    console.assert(values[0] === b);
  }
  ws1.forEach(function (value, key, map) {
    console.assert(value === b);
    console.assert(key === a);
    console.assert(map === ws1);
    console.assert(this === ws2);
  }, ws2);
  ws1.clear();
  console.assert(ws1.has(a) === false);
  console.assert(ws1.set(a, 123) === ws1);
  console.assert(ws1.has(a) === true);
  console.assert(ws1.get(a) === 123);
  console.assert(ws1.delete(a) === true);
  console.assert(ws1.delete(a) === false);
  console.assert(ws1.has(a) === false);
  console.assert(ws1.get(a) === void 0);

  console.assert(ws2.has(a) === true);
  console.assert(ws2.has(b) === false);
  console.assert(ws2.get(a) === b);
  console.assert(ws2.delete(a) === true);
  console.assert(ws2.has(a) === false);
}

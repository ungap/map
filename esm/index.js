/*! (c) Andrea Giammarchi - ISC */
var self = {};
/* istanbul ignore next */
try { self.Map = Map; }
catch (Map) {
  (function (i, dPs) {'use strict';
    var proto = dPs(Map.prototype, {size: {
      configurable: true,
      get: function () {
        return this._k.length;
      }
    }});
    proto.clear = function () {
      var length = this._k.length;
      this._k.splice(0, length);
      this._v.splice(0, length);
    };
    proto.delete = function (key) {
      var had = has(this, key);
      if (had) {
        this._k.splice(i, 1);
        this._v.splice(i, 1);
      }
      return had;
    };
    proto.entries = function () {
      return this._k.map(pair, this._v);
    };
    proto.forEach = function (callback, context) {
      this._k.forEach(
        function (key, i)  {
          callback.call(context, this._v[i], key, this);
        },
        this
      );
    };
    proto.get = function (key) {
      return has(this, key) ? this._v[i] : void 0;
    };
    proto.has = function (key) {
      return has(this, key);
    };
    proto.keys = function () {
      return this._k.slice(0);
    };
    proto.set = function (key, value) {
      this._v[has(this, key) ? i : (this._k.push(key) - 1)] = value;
      return this;
    };
    proto.values = function () {
      return this._v.slice(0);
    };
    self.Map = Map;
    return Map;
    function Map(iterable) {
      dPs(this, {_k: {value: []}, _v: {value: []}});
      if (iterable)
        iterable.forEach(add, this);
    }
    function add(pair) {
      this.set(pair[0], pair[1]);
    }
    function has(self, value) {
      i = self._k.indexOf(value);
      return -1 < i;
    }
    function pair(v, i) {
      return [v, this[i]];
    }
  }(0, Object.defineProperties));
}
export default self.Map;

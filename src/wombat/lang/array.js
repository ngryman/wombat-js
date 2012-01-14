(function () {

  Object._oop(Array);
  var slice = Array.prototype.slice;


  /**
   * Array#indexOf polyfill
   * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
   * @see http://kangax.github.com/es5-compat-table/
   *
   * @param {Object} item The item to search in the array.
   * @param {Number} [fromIndex] From which index the search begins.
   * @return {Number} The index of the element if found, or -1.
   */
  function indexOf(item, fromIndex) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0)
      return -1;

    var n = 0;
    if (fromIndex != null) {
      n = Number(fromIndex);
      if (n !== n) // shortcut for verifying if it's NaN
        n = 0;
      else if (n !== 0 && n !== Infinity && n !== -Infinity)
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    if (n > len)
      return -1;

    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
    for (; k < len; k++)
      if (k in t && t[k] === item)
        return k;
    return -1;
  }


  /**
   * Array#lastIndexOf polyfill
   * Returns the last index at which a given element can be found in the array, or -1 if it is not present.
   * The array is searched backwards, starting at fromIndex.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
   * @see http://kangax.github.com/es5-compat-table/
   *
   * @param {Object} item The item to search in the array.
   * @param {Number} [fromIndex] From which index the search begins.
   * @return {Number} The index of the item if found, or -1.
   */
  function lastIndexOf(item , fromIndex) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0)
      return -1;

    var n = 0;
    if (fromIndex != null) {
      n = Number(fromIndex);
      if (n !== n) // shortcut for verifying if it's NaN
        n = 0;
      else if (n !== 0 && n !== Infinity && n !== -Infinity)
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    if (n > len)
      return -1;

    var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
    for (; k >= 0; k--)
      if (k in t && t[k] === item)
        return k;
    return -1;
  }


  /**
   * Array#filter polyfill
   * Creates a new array with all elements that pass the test implemented by the provided function.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
   * @see http://kangax.github.com/es5-compat-table/
   *
   * @param {Function} callback The callback used to filter the array.
   * @param {Object} [scope] The scope to apply when invoking the callback.
   * @return {Array} The filtered array.
   */
  function filter(callback, scope) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof callback !== 'function')
      throw new TypeError(callback + "is not a function");

    var res = [];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case callback mutates this
        if (callback.call(scope, val, i, t))
          res.push(val);
      }
    }

    return res;
  }


  /**
   * Array#forEach polyfill
   * Executes a provided function once per array element.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
   * @see http://kangax.github.com/es5-compat-table/
   * @see Array#each
   *
   * @param {Function} callback The callback invoked for each item of the array.
   * @param {Object} [scope] The scope to apply when invoking the callback.
   */
  function forEach(callback, scope) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0; // Hack to convert O.length to a UInt32
    if (typeof callback !== 'function')
      throw new TypeError(callback + "is not a function");

    for (var i = 0; i < len; i++)
      if (i in t)
        callback.call(scope, t[i], i, t);
  }


  /**
   * Array#every polyfill
   * Tests whether all elements in the array pass the test implemented by the provided function.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
   * @see http://kangax.github.com/es5-compat-table/
   *
   * @param {Function} callback The callback used to check every item of the array.
   * @param {Object} scope The scope to apply when invoking the callback.
   * @return {Boolean} Whether every items of the array passed the tests, or not.
   */
  function every(callback, scope) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0; // Hack to convert O.length to a UInt32
    if (typeof callback !== 'function')
      throw new TypeError(callback + "is not a function");

    for (var i = 0; i < len; i++)
      if (i in t && !callback.call(scope, t[i], i, t))
        return false;
    return true;
  }


  /**
   * Array#map polyfill
   * Creates a new array with the results of calling a provided function on every element in this array.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
   * @see http://kangax.github.com/es5-compat-table/
   *
   * @param {Function} callback The callback invoked for each item of the array.
   * @param {Object} scope The scope to apply when invoking the callback.
   * @return {Boolean} The result array.
   */
  function map(callback, scope) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0; // Hack to convert O.length to a UInt32
    if (typeof callback !== 'function')
      throw new TypeError(callback + "is not a function");

    var res = [];
    for (var i = 0; i < len; i++)
      res.push(callback.call(scope, t[i], i, t));
    return res;
  }


  /**
   * Array#some polyfill
   * Tests whether some element in the array passes the test implemented by the provided function.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
   * @see http://kangax.github.com/es5-compat-table/
   *
   * @param {Function} callback The callback invoked for each item of the array.
   * @param {Object} scope The scope to apply when invoking the callback.
   */
  function some(callback, scope) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0; // Hack to convert O.length to a UInt32
    if (typeof callback !== 'function')
      throw new TypeError(callback + "is not a function");

    for (var i = 0; i < len; i++)
      if (i in t && callback.call(scope, t[i], i, t))
        return true;
    return false;
  }


  /**
   * Clears the array of all its items.
   * This can be useful when we want to keep the reference and avoid to create a new array instance.
   */
  function clear() {
    this.length = 0;
  }


  /**
   * Gets the first item of the array.
   *
   * @return {Object} The first item of the array or undefined.
   */
  function first() {
    return this[0];
  }


  /**
   * Gets the last item of the array.
   *
   * @return {Object} The last item of the array or undefined.
   */
  function last() {
    return this[this.length - 1];
  }


  /**
   * Tells if the array contains the given item.
   *
   * @param item {Object} The item to be checked.
   * @param from {Number} The index from where to begin searching for the item.
   *
   * @example
   * [1,2,3].contains(1) => true
   * [1,2,3].contains(4) => false
   * [1,2,3].contains(1, 1) => false
   *
   * @return {Boolean} Whether the array contains the given item or not.
   */
  function contains(item, from) {
    return this.indexOf(item, from) != -1;
  }


  /**
   * Removes the item at the given index.
   *
   * @param index {Number} The index of the item to remove.
   * @return {Boolean} Whether the item was removed or not.
   */
  function removeAt(index) {
    return this.splice(index, 1).length == 1;
  }


  /**
   * Removes the given item if the array contains it.
   *
   * @param item {Object} The item to remove.
   * @return {Boolean} Whether the item was removed or not.
   */
  function remove(item) {
    return this.removeAt(this.indexOf(item));
  }


  /**
   * Removes empty items contained in the array. This is useful to ensure the array contains contiguous valid items.
   *
   * @return {Array} The compacted array.
   */
  function compact() {
    return this.filter(function (item) {
      return item != null;
    });
  }


  /**
   * Returns a flattened (one-dimensional) copy of the array, leaving the original array unchanged.
   *
   * @return {Array} The flattened array.
   */
  function flattern() {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var res = [];
    var t = Object(this);
    var len = t.length >>> 0; // Hack to convert O.length to a UInt32
    for (var i = 0; i < len; i++) {
      var val = t[i];
      res.concat(Array.isArray(val) ? val.flattern() : val);
    }
    return res;
  }


  /**
   * Filters the array by keeping only the specified items.
   *
   * @return {Array} The result array containing only the specified items.
   */
  function keep(/* val1, val2, ... */) {
    var values = slice.call(arguments, 0);
    return this.filter(function (item) {
      return values.contains(item);
    });
  }


  /**
   * Filters the array by removing only the specified items.
   *
   * @return {Array} The result array containing only the specified items.
   */
  function against(/* val1, val2, ... */) {
    var values = slice.call(arguments, 0);
    return this.filter(function (item) {
      return !values.contains(item);
    });
  }


  /**
   * Returns a valid random index of the array.
   *
   * @return {Number} A random index.
   */
  function randomIndex() {
    return Math.floor(Math.random() * (this.length + 1));
  }


  /**
   * Returns a valid random items of the array.
   *
   * @return {Object} A random item.
   */
  function random() {
    return this[this.randomIndex()];
  }


  /**
   * Returns a random item of the array and remove it.
   *
   * @return {Object} A random item.
   */
  function randomPop() {
    var index = this.randomIndex(),
        value = this[this.randomIndex()];
    this.removeAt(index);
    return value;
  }


  /**
   * Shuffles the array.
   */
  function shuffle() {
    this.sort(_shuffleSort);
  }


  /**
   * Returns a random number between 0 and 1 used to sort an array.
   *
   * @return {Number} A random number between 0 and 1.
   */
  function _shuffleSort() {
    return 0.5 - Math.random();
  }


  /**
   * Invokes a method for each element of the array and stores the results in a new array.
   *
   * @param {Function} method The method to invoke for each item of the array.
   * @return {Array} The result array.
   */
  function invoke(method) {
    var args = slice(arguments, 1);
    return this.map(function (item) {
      return item[methodName].apply(item, args);
    });
  }


  // polyfills
  Object.merge(Array, {
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    filter: filter,
    forEach: forEach,
    every: every,
    map: map,
    some: some
  });


  // improve Array
  Array.implement({
    clear:       clear,
    first:       first,
    last:        last,
    contains:    contains,
    remove:      remove,
    removeAt:    removeAt,
    compact:     compact,
    flattern:    flattern,
    keep:        keep,
    against:     against,
    random:      random,
    randomPop:   randomPop,
    randomIndex: randomIndex,
    shuffle:     shuffle,
    invoke:      invoke,
    each:        forEach
  });


  /**
   * Array#isArray polyfill
   * Returns true if an object is an array, false if it is not.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
   * @see http://kangax.github.com/es5-compat-table/
   *
   * @param {Object} v The value to test.
   * @return {Boolean} ture if an object is an array, or false.
   */
  function isArray(v) {
    return Object.prototype.toString.call(v) == '[object Array]';
  }


  // improve Array
  Object.mixin(Array, {
    isArray: isArray
  });

})();

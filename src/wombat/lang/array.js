(function () {

  Object._oop(Array);
  var slice = Array.prototype.slice;


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
  function contain(item, from) {
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
   * Returns the last item of the array and remove it.
   *
   * @return {Object} The last item of the array.
   */
  function pop() {
    var value = this.last();
    this.removeAt(this.length - 1);
    return value;
  }


  /**
   * Removes the given item if the array contains it.
   *
   * @param item {Object} The item to remove.
   * @return {Boolean} Whether the item was removed or not.
   */
  function remove(item) {
    var index = this.indexOf(item);
    if (index >= 0)
      return this.removeAt(this.indexOf(item));
    return false;
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
   * Incrementally builds a result value based on the successive results of the iterator. This can be used for array
   * construction, numerical sums/averages, etc.
   *
   * @param {Object} memo The initial value to which the iterator adds.
   * @param {Function} iterator An iterator function used to build the accumulated result.
   * @param {Object} [context] The context to use as `this` within calls to the iterator.
   */
  function inject(memo, iterator, context) {
    this.each(function (value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  }


  /**
   * Returns a flattened (one-dimensional) copy of the array, leaving the original array unchanged.
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce
   *
   * @return {Array} The flattened array.
   */
  function flatten() {
    return this.inject([], function (array, value) {
      if (Array.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }


  /**
   * Filters the array by keeping only the specified items.
   *
   * @return {Array} The result array containing only the specified items.
   */
  function keep(/* val1, val2, ... */) {
    var values = slice.call(arguments, 0);
    return this.filter(function (item) {
      return values.contain(item);
    });
  }


  /**
   * Filters the array by removing only the specified items.
   *
   * @return {Array} The result array containing only the specified items.
   */
  function without(/* val1, val2, ... */) {
    var values = slice.call(arguments, 0);
    return this.filter(function (item) {
      return !values.contain(item);
    });
  }


  /**
   * Returns a valid random index of the array.
   *
   * @return {Number} A random index.
   */
  function randomIndex() {
    if (this.length == 0) return -1;
    return Math.floor(Math.random() * this.length);
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
      value = this[index];
    this.removeAt(index);
    return value;
  }


  /**
   * Shuffles the array.
   */
  function shuffle() {
    this.sort(_shuffleSort);
    return this;
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
   * Invokes a method for each item of the array and stores the results in a new array.
   *
   * @param {Function} method The method to invoke for each item of the array.
   * @return {Array} An array of returned values.
   */
  function invoke(method) {
    var args = slice.call(arguments, 1);
    return this.map(function (item) {
      return item[method].apply(item, args);
    });
  }


  /**
   * Pre-baked implementation for a common use-case that fetch the same property for all the
   * items of the array.
   *
   * @param {String} property The name of the property to fetch.
   * @return {Array} An array of property values.
   */
  function pluck(property) {
    return this.map(function (item) {
      return item[property];
    });
  }


  /**
   * Returns a deep copy of the array.
   *
   * @return {Array} The cloned array.
   */
  /*function clone() {
    return this.inject([], function (array, value) {
      array.push(Array.isArray(value) ? value.clone() : value);
      return array;
    });
  }*/


  /** improve Array */
  Array.implement({
    clear:       clear,
    first:       first,
    last:        last,
    contain:     contain,
    remove:      remove,
    removeAt:    removeAt,
    pop:         pop,
    compact:     compact,
    inject:      inject,
    flatten:     flatten,
    keep:        keep,
    without:     without,
    random:      random,
    randomPop:   randomPop,
    randomIndex: randomIndex,
    shuffle:     shuffle,
    invoke:      invoke,
    pluck:       pluck,
    each:        Array.prototype.forEach
  });

})();

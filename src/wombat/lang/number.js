(function () {

  Object._oop(Number);


  /**
   *
   */
  function isNumber(v) {
    return typeof v === 'number' && isFinite(v);
  }


  /**
   *
   */
  function toInt() {
    return this >>> 0;
  }


  /**
   *
   */
  function toPixels() {
    return this + 'px';
  }


  /**
   * @return The number truncated to the nearest integer of less than or equal value.
   *
   * (4.9).floor() => 4
   * (4.2).floor() => 4
   * (-1.2).floor() => -2
   */
  function floor() {
    return Math.floor(this);
  }


  /**
   * @return The number truncated to the nearest integer of greater than or equal value.
   *
   * (4.9).ceil() => 5
   * (4.2).ceil() => 5
   * (-1.2).ceil() => -1
   */
  function ceil() {
    return Math.ceil(this);
  }


  /**
   *
   * @example
   * (4.5).round() => 5
   * (4.4).round() => 4
   *
   * @return {Number} The number rounded to the nearest integer.
   */
  function round() {
    return Math.round(this);
  }


  /**
   * @return {Number} The sign of this number, 0 if the number is 0.
   */
  function sign() {
    return this > 0 ? 1 : this < 0 ? -1 : 0;
  }


  /**
   * @return {Number} The absolute value of the number.
   */
  function abs() {
    return Math.abs(this);
  }


  /**
   * Return a number whose value is limited to the given range.
   *
   * @example
   * limit the output of this computation to between 0 and 255
   * (x * 255).clamp(0, 255)
   *
   * @param {Number} min The lower boundary of the output range.
   * @param {Number} max The upper boundary of the output range.
   * @return {Number} A number in the range [min, max].
   */
  function clamp(min, max) {
    return this >= min ? this <= max ? this : max : min;
  }


  /**
   * Generate uniformly distributed random numbers.
   *
   * @param {Number} [min] The lower boundary of the random range.
   * @param {Number} [max] The upper boundary of the random range.
   * @return {Number} A Random integer from [min, max) if min is given, from [0, max) if max is given,
   * otherwise a random float between 0 and 1.
   */
  function random(min, max) {
    if (max == null)
      max = min;
    if (max != null)
      return Math.floor(Math.random() * max) + (min >>> 0);
    return Math.random();
  }


  /**
   * Return the the nearest grid resolution less than or equal to the number.
   *
   * @example
   * (7).snap(8) => 0
   * (4).snap(8) => 0
   * (12).snap(8) => 8
   *
   * @param {Number} resolution The grid resolution to snap to.
   * @return {Number} The nearest multiple of resolution lower than the number.
   */
  function snap(resolution) {
    return (this / resolution).floor() * resolution;
  }


  /**
   *
   */
  function times(callback, scope) {
    for (var i = 0; i < this; i++)
      callback.call(scope, i);
  }


  Number.implement({
    isNumber: isNumber,
    toInt:    toInt,
    toPixels: toPixels,
    floor:    floor,
    ceil:     ceil,
    round:    round,
    sign:     sign,
    abs:      abs,
    clamp:    clamp,
    random:   random,
    snap:     snap,
    times:    times
  });


  /**
   *
   */
  function fromPixels(pixels) {
    return parseInt(pixels.replace(/px/, ''));
  }


  Object.mixin(Number, {
    fromPixels: fromPixels
  });

})();

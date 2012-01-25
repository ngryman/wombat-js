(function () {

  _oop(Object);


  /**
   * Returns whether the value is an object or not.
   * This method does not consider null as an object.
   *
   * @param {?} val The value to be tested.
   */
  function isObject(val) {
    return val === Object(val);
  }


  /**
   * Mix-in source object to target object, overriding eventually common properties.
   * @see Object.merge
   * @static
   *
   * @param {Object} target The target object where properties will be copied.
   * @param {Object} source The source object from where properties are taken from.
   * @return {Object} The target object.
   */
  function mixin(target, source) {
    if (target == null || source == null)
      throw new TypeError("both target and source must be objects");

    for (var property in source)
      target[property] = source[property];
    return target;
  }


  /**
   * Merge source object to target object, copying only non-common properties.
   * @see Object.mixin
   * @static
   *
   * @param {Object} target The target object where properties will be copyied.
   * @param {Object} source The source object from where properties are taken from.
   * @return {Object} The target object.
   */
  function merge(target, source) {
    if (target == null || source == null)
      throw new TypeError("both target and source must be objects");

    for (var property in source)
      if (!target.hasOwnProperty(property))
        target[property] = source[property];
    return target;
  }


  /**
   * Whether the object is initializing and we should not call our "init" constructor.
   * @see http://ejohn.org/blog/simple-javascript-inheritance/
   * @private
   *
   * @type {Boolean}
   */
  var _initializing = false;

  /**
   * Make an object "OOP", that is augmented with the utility methods "extend" & "implement".
   * @see Object.extend
   * @see Object.implement
   *
   * @param {Object} klass Object type to be augmented.
   * @return {Object} The augmented object type.
   */
  function _oop(klass) {
    mixin(klass, {
      extend:    extend,
      implement: implement
    });
    return klass;
  }

  /**
   * Extend (inherit) from the calling object.
   * @see http://ejohn.org/blog/simple-javascript-inheritance/
   * @static
   *
   * @param {Object} classDefinition Hash of methods & properties used to augment the calling object.
   * @return {Object} The newly created object type.
   */
  function extend(classDefinition) {
    var prototype;

    // instantiate the parent class, without calling the constructor
    _initializing = true;
    prototype = new this();
    _initializing = false;

    // copy properties
    for (var name in classDefinition) {
      var def = classDefinition[name], base = prototype[name];

      // overriding ?
      if (typeof base == 'function' && typeof def == 'function') {
        prototype[name] = (function (fn, base) {
          return function () {
            this.parent = base;

            var ret = fn.apply(this, arguments);
            delete this.parent;

            return ret;
          };
        }(def, base));
      }
      // just copy the property
      else
        prototype[name] = def;
    }

    // dummy class constructor
    var klass = function () {
      if (!_initializing && this.init)
        this.init.apply(this, arguments);
    };

    // prototype inherence
    klass.prototype = prototype;
    klass.prototype.constructor = klass;

    // make it OO (extensible, implementor)
    return _oop(klass);
  }


  /**
   * Implement the "mixinDefinition".
   * @static
   *
   * @param {Object} mixinDefinition Hash of methods & properties used to augment the calling object.
   * @param {Object} [mixinOverrides] Hash of methods & properties overrides to specify another implementation.
   * @return {Object} The augmented calling object.
   */
  function implement(mixinDefinition, mixinOverrides) {
    // TODO: implement mixinOverride
    // TODO: make this.super available here too, perhaps by refactoring Object.extend method

    // inject mixin directly into prototype
    return mixin(this.prototype, mixinDefinition);
  }


  /**
   * Clones an object and returns an deep copy of it.
   *
   * @param {Object} source Object to be cloned.
   * @return {Object} The cloned object.
   */
  function clone(source) {
    // returns a new instance of immutable types (string, numbers, etc...)
    if (!(Object.isObject(source) | Array.isArray(source))) return source.constructor(source);

    // instantiates the clone, keep the same prototype chain
    var result = new source.constructor, sourceProp;
    for (var property in source) {
      sourceProp = source[property];
      if (!Function.isFunction(sourceProp) && (Object.isObject(sourceProp) || Array.isArray(sourceProp)))
        result[property] = Object.clone(sourceProp);
      else
        result[property] = sourceProp;
    }

    return result;
  }


  // improve Object
  mixin(Object, {
    isObject: isObject,
    mixin: mixin,
    merge: merge,
    clone: clone,
    _oop:  _oop
  });

})();

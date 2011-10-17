(function() {
	
	_oopize(Object);
	
	
	/**
	 * Object.create polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
	 *   http://kangax.github.com/es5-compat-table/
	 */
	/*Object.create = Object.create || function (o) {
		if (arguments.length > 1) {
			throw new Error('Object.create implementation only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};*/
	
	
	/**
	 * Mixin source object to target object, overriding eventually common properties.
	 * @see Object.merge
	 * @static
	 * 
	 * @param {Object} target The target object where properties will be copyied.
	 * @param {Object} source The source object from where properties are taken from.
	 * @returns {Object} the target object.
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
	 * @returns {Object} the target object.
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
     * Weither the object is initilizing and we should dont call our "init" constructor.
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
     * @returns {Object} the augmented object type.
     */
    function _oopize(klass) {
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
     * @returns {Object} the newly created object type.
     */
    function extend(classDefinition) {
    	var parent = this.prototype, prototype;

		// instanciate the parent class, without calling the constructor
		_initializing = true;
		prototype     = new this();
		_initializing = false;

		// copy properties
		for (var name in classDefinition) {
			var def = classDefinition[name], base = prototype[name];

			// overriding ?
			if (typeof base == 'function' && typeof def == 'function') {
				prototype[name] = (function(fn, base) {
					return function() {
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
		var klass = function() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		};

		// prototype inherence
		klass.prototype = prototype;
		klass.prototype.constructor = klass;

		// make it OO (extensible, implementor)
		return _oopize(klass);
	}
    
    
    /**
     * Implement the "mixinDefinition".
     * @static
     * 
     * @param {Object} mixinDefinition Hash of methods & properties used to augment the calling object.
     * @param {Object} [mixinOverrides] Hash of methods & properties overrides to specify another implementation.
     * @returns {Object} the augmented calling object.
     */
    function implement(mixinDefinition, mixinOverrides) {
    	// TODO: implement mixinOverride
    	// TODO: make this.super available here too, perhaps by refactoring Object.extend method
    	
    	// inject mixin directly into prototype
		mixin(this.prototype, mixinDefinition);
	}
    
    
    mixin(Object, {
    	mixin:   mixin,
		merge:   merge,
		_oopize: _oopize
	});
	
})();

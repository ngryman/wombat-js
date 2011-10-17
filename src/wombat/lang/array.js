(function() {
    
    Object._oopize(Array);
    var slice = Array.prototype.slice;


	/*
	 * Array.isArray polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.isArray = Array.isArray || function (v) {
		return Object.prototype.toString.call(v) == '[object Array]';
	};


	/*
	 * Array#indexOf polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.prototype.indexOf = Array.prototype.indexOf || function(searchElement /*, fromIndex */) {
		"use strict";
        
		if (this === void 0 || this === null)
			throw new TypeError();

		var t   = Object(this);
		var len = t.length >>> 0;
		if (len === 0)
			return -1;

		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n !== n) // shortcut for verifying if it's NaN
				n = 0;
			else if (n !== 0 && n !== Infinity && n !== -Infinity)
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}

		if (n > len)
			return -1;

		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++)
			if (k in t && t[k] === searchElement)
				return k;
		return -1;
	};


	/*
	 * Array#lastIndexOf polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.prototype.lastIndexOf = Array.prototype.lastIndexOf || function(searchElement /*, fromIndex */) {
		"use strict";
		
		if (this === void 0 || this === null)
			throw new TypeError();

		var t   = Object(this);
		var len = t.length >>> 0;
		if (len === 0)
			return -1;

		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n !== n) // shortcut for verifying if it's NaN
				n = 0;
			else if (n !== 0 && n !== Infinity && n !== -Infinity)
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}

		if (n > len)
			return -1;

		var k = n >= 0 ? Math.min(n, len -1) : len - Math.abs(n);
		for (; k >= 0; k--)
			if (k in t && t[k] === searchElement)
				return k;
		return -1;
	};


	/*
	 * Array#filter polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.prototype.filter = Array.prototype.filter || function(callback /*, scope */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t   = Object(this);
		var len = t.length >>> 0;
		if (typeof callback !== 'function')
			throw new TypeError(callback + "is not a function");

		var res   = [];
		var scope = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i]; // in case callback mutates this
				if (callback.call(scope, val, i, t))
					res.push(val);
			}
		}

		return res;
	};


	/*
	 * Array#each, Array#forEach polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.prototype.each =
	Array.prototype.forEach = Array.prototype.forEach || function(callback /*, scope */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t   = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		if (typeof callback !== 'function')
			throw new TypeError(callback + "is not a function");

		var scope = arguments[1];
		for (var i = 0; i < len; i++)
			if (i in t)
				callback.call(scope, t[i], i, t);
	};


	/*
	 * Array#every polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.prototype.every = Array.prototype.every || function(callback /*, scope */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t   = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		if (typeof callback !== 'function')
			throw new TypeError(callback + "is not a function");

		var scope = arguments[1];
		for (var i = 0; i < len; i++)
			if (i in t && !callback.call(scope, t[i], i, t))
				return false;
		return true;
	};


	/*
	 * Array#map polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.prototype.map = Array.prototype.map || function(callback /*, scope */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t   = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		if (typeof callback !== 'function')
			throw new TypeError(callback + "is not a function");

		var res   = [];
		var scope = arguments[1];
		for (var i = 0; i < len; i++)
			res.push(callback.call(scope, t[i], i, t));
		return res;
	};


	/*
	 * Array#some polyfill
	 *
	 *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	 *   http://kangax.github.com/es5-compat-table/
	 */
	Array.prototype.some = Array.prototype.some || function(callback /*, scope */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t   = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		if (typeof callback !== 'function')
			throw new TypeError(callback + "is not a function");

		var scope = arguments[1];
		for (var i = 0; i < len; i++)
			if (i in t && callback.call(scope, t[i], i, t))
				return true;
		return false;
	};


    function clear() {
        this.length = 0;
        return this;
    }
    
    
    function first() {
        return this[0];
    }
    
    
    function last() {
        return this[this.length - 1];
    }
    
    
    function contains(item, from) {
        return this.indexOf(item, from) != -1;
    }
    
    
    function remove(item) {
        for (var i = this.length - 1; i--;)
            if (this[i] === item) this.splice(i, 1);
        return this;
    }
    
    
    function removeAt(index) {
        return this.splice(index, 1).length == 1;
    }
    
    
    function compact() {
        return this.filter(function(item) {
            return item != null;
        });
    }
    
        
	function flattern() {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

        var res = [];
		var t   = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		for (var i = 0; i < len; i++) {
            var val = t[i];
            res.concat(Array.isArray(val) ? val.flattern() : val);
		}
		return res;
	}
    
    
    function keep(/* val1, val2, ... */) {
        var values = slice.call(arguments, 0);
        return this.filter(function(item) {
            return values.contains(item);
        });
    }
    
    
    function against(/* val1, val2, ... */) {
        var values = slice.call(arguments, 0);
        return this.filter(function(item) {
            return !values.contains(item);
        });
    }
    
    
    function random() {
        return this[this.randomIndex()];
    }
    
    
    function randomPop() {
        var value = this[this.randomIndex()];
        this.removeAt(index);
        return value;
    }
    
    
    function randomIndex() {
        return Math.floor(Math.random() * (this.length + 1));
    }
    
    
    function shuffle() {
        this.sort(_shuffleSort);
    }
    
    function _shuffleSort() {
        return 0.5 - Math.random();
    }
    
    
    function invoke(method) {
        var args = slice(arguments, 1);
        return this.map(function(item) {
            return item[methodName].apply(item, args);
        });
    }
    
    
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
        invoke:      invoke
    });
	
})();

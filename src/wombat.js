/*
 * <%= WOMBAT_VERSION %>
 * 
 * = compat
 * = require wombat/lang
 */

(function() {
    
    function isArray(val) {
    	return Array.isArray(val);
    }
    
    
    function isString(val) {
        return String.isString(val);
    }
    
    
    function isBoolean(val) {
        return Boolean.isBoolean(val);
    }
    
    
    function isNumber(val) {
        return Number.isNumber(val);
    }
    
    
    function isFunction(val) {
        return Function.isFunction(val);
    }
    
    
    function notImplemented() {
        throw new Error(arguments.callee + " is not implemented yet in " + this.getClassName());
    };
    
    
    this.wombat = this.wb = {
        isArray:    isArray,
        isString:   isString,
        isBoolean:  isBoolean,
        isNumber:   isNumber,
        isFunction: isFunction
    };
    
})();

(function() {
    
    var slice = Array.prototype.slice;
    Object._oopize(Function);
    
    
    Function.isFunction = function(v) {
        return typeof v == 'function';
    }
    
    
    /*
     * Function#bind polyfill
     *
     *   https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
     */
    Function.prototype.bind = Function.prototype.bind || function(scope) {
        if (!Function.isFunction())
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            
        var method = this, args = slice.call(arguments, 1);
        return function() {
            return method.apply(scope, mixin(args, arguments));
        };
    }
    
    
    function EMPTY() {}
    
    
    Object.mixin(Function, {
        EMPTY: EMPTY
    });
    
})();

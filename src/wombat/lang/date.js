(function() {
    
    Object._oopize(Date);
    
    
    Date.now = Date.now || function() {
        return +new Date();
    };
    
})();

beforeEach(function() {
  this.addMatchers({
    toBeFunction: function() {
      return typeof this.actual == 'function';
    }
  });
});
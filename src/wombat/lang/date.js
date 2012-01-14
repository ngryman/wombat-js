(function () {

  Object._oop(Date);


  Date.now = Date.now || function () {
    return +new Date();
  };

})();

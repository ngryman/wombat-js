describe('Object', function () {
  it('should be conform to API v1', function () {
    expect(Object.mixin).toBeFunction();
    expect(Object.merge).toBeFunction();
    expect(Object.extend).toBeFunction();
    expect(Object.implement).toBeFunction();
  });


  it('should mix two objects', function () {
    expect(Object.mixin({a: 1}, {b: 2})).toEqual({a: 1, b: 2});
    expect(Object.mixin({a: 1}, {a: 2})).toEqual({a: 2});
    expect(Object.mixin({a: 1}, {})).toEqual({a: 1});
    expect(Object.mixin({}, {a: 1})).toEqual({a: 1});

    expect(
      function () {
        Object.mixin(null, null)
      }).toThrow("both target and source must be objects");
    expect(
      function () {
        Object.mixin({a: 1}, null)
      }).toThrow("both target and source must be objects");
    expect(
      function () {
        Object.mixin(null, {a: 1})
      }).toThrow("both target and source must be objects");
  });


  it('should merge two objects', function () {
    expect(Object.merge({a: 1}, {b: 2})).toEqual({a: 1, b: 2});
    expect(Object.merge({a: 1}, {a: 2})).toEqual({a: 1});
    expect(Object.merge({a: 1}, {})).toEqual({a: 1});
    expect(Object.merge({}, {a: 1})).toEqual({a: 1});

    expect(
      function () {
        Object.merge(null, null)
      }).toThrow("both target and source must be objects");
    expect(
      function () {
        Object.merge({a: 1}, null)
      }).toThrow("both target and source must be objects");
    expect(
      function () {
        Object.merge(null, {a: 1})
      }).toThrow("both target and source must be objects");
  });


  var O1 = Object.extend({b: 2});
  var O2 = O1.extend({b: 3, f: jasmine.createSpy() });
  var O3 = O2.extend({f: function () {
    this.parent()
  }});
  var O4 = O2.extend({f: function () {
  }});


  it('should extend an object', function () {
    var o1 = new O1();
    expect(O1.extend).toBeFunction();
    expect(O1.implement).toBeFunction();
    expect(o1.b).toEqual(2);
  });


  it('should extend an object overriding existing properties', function () {
    var o2 = new O2();
    expect(O2.extend).toBeFunction();
    expect(O2.implement).toBeFunction();
    expect(o2.b).toEqual(3);
    expect(o2.f).toBeFunction();
  });


  it('should extend an object overriding existing methods which could be accessible with this.parent', function () {
    var o3 = new O3();
    expect(O3.extend).toBeFunction();
    expect(O3.implement).toBeFunction();
    expect(o3.b).toEqual(3);
    expect(o3.f).toBeFunction();

    o3.f();
    expect(O2.prototype.f).toHaveBeenCalled();
    O2.prototype.f.reset();

    var o4 = new O4();
    o4.f();
    expect(O2.prototype.f).not.toHaveBeenCalled();
  });


  it('should implement an object like it is an interface', function () {
    var I = {f1: jasmine.createSpy(), f2: function () {}};

    var O1 = Object.extend();
    O1.implement(I);
    var o1 = new O1();
    expect(o1.f1).toBeFunction();
    expect(o1.f2).toBeFunction();

    var O2 = Object.extend({f1: function () {}});
    O2.implement(I);
    var o2 = new O2();
    expect(o2.f1).toBeFunction();
    expect(o2.f2).toBeFunction();
    o2.f1();
    expect(O2.prototype.f1).toHaveBeenCalled();
  });
});
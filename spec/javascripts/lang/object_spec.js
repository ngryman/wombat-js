describe('Object', function () {
  it('should be conform to API v1', function () {
    expect(Object.isObject).toBeFunction('isObject');
    expect(Object.mixin).toBeFunction('mixin');
    expect(Object.merge).toBeFunction('merge');
    expect(Object.clone).toBeFunction('clone');
    expect(Object.extend).toBeFunction('extend');
    expect(Object.implement).toBeFunction('implement');
  });


  it('should recognize an object', function() {
    expect(Object.isObject(arguments)).toBeTruthy();
    expect(Object.isObject([1, 2, 3])).toBeTruthy();
    expect(Object.isObject(function () {})).toBeTruthy();
    expect(!Object.isObject(null)).toBeTruthy();
    expect(!Object.isObject(undefined)).toBeTruthy();
    expect(!Object.isObject('string')).toBeTruthy();
    expect(!Object.isObject(12)).toBeTruthy();
    expect(!Object.isObject(true)).toBeTruthy();
    expect(Object.isObject(new String('string'))).toBeTruthy();
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


  it('should clone a string', function() {
    var model = 'wombat';
    var clone = Object.clone(model);
    expect(clone).toEqual(model);
    clone += ' rox';
    expect(clone).not.toEqual(model);
  });


  it('should clone a number', function() {
    var model = 1337;
    var clone = Object.clone(model);
    expect(clone).toEqual(model);
    clone -= 1295;
    expect(clone).not.toEqual(model);
  });


  it('should clone an array', function() {
    var model, clone;

    model = [1, 2, 3];
    debugger;
    clone = Object.clone(model);
    expect(clone).toEqual(model);
    expect(clone).not.toBe(model);
    clone.push(4);
    expect(clone.length).toEqual(4);
    expect(model.length).toEqual(3);

    model = [[1, 2, 3], [4, 5, 6]];
    clone = Object.clone(model);
    expect(clone).toEqual(model);
    expect(clone).not.toBe(model);
    expect(clone[0]).not.toBe(model[0]);
    expect(clone[1]).not.toBe(model[1]);
    clone.push([7, 8, 9]);
    expect(clone.length).toEqual(3);
    expect(model.length).toEqual(2);
  });


  it('should clone a literal object', function() {
    var model = {name: 'wombat', version: [1, 337]};
//    var model = {name: 'wombat', age: [13, 37], sex: {very: 'long'}};
    var clone = Object.clone(model);
    expect(clone).toEqual(model);
    expect(clone).not.toBe(model);
    clone.name += ' xl';
    clone.version[0] = 2;
    expect(clone).not.toEqual(model);
    expect(clone.name).toEqual('wombat xl');
    expect(model.name).toEqual('wombat');
    expect(clone.version).toEqual([2, 337]);
    expect(model.version).toEqual([1, 337]);
  });


  it('should clone a literal object with nested object', function() {
    var model = {name: 'wombat', sex: {very: 'long'}};
    var clone = Object.clone(model);
    expect(clone).toEqual(model);
    expect(clone).not.toBe(model);
    expect(clone.sex).toEqual(model.sex);
    expect(clone.sex).not.toBe(model.sex);
    clone.name += ' xl';
    clone.sex = {very: 'large', extra: 'smooth'};
    expect(clone).not.toEqual(model);
    expect(clone.sex).not.toEqual(model.sex);
    expect(clone.name).toEqual('wombat xl');
    expect(model.name).toEqual('wombat');
    expect(clone.sex).toEqual({very: 'large', extra: 'smooth'});
    expect(model.sex).toEqual({very: 'long'});
  });
});

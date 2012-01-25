/* test inspired from https://github.com/sstephenson/prototype/blob/master/test/unit/array_test.js */

describe('Array', function () {
  it('should be conform to API v1', function () {
    expect(Array.prototype.clear).toBeFunction('clear');
    expect(Array.prototype.first).toBeFunction('first');
    expect(Array.prototype.last).toBeFunction('last');
    expect(Array.prototype.contain).toBeFunction('contain');
    expect(Array.prototype.remove).toBeFunction('remove');
    expect(Array.prototype.removeAt).toBeFunction('removeAt');
    expect(Array.prototype.compact).toBeFunction('compact');
    expect(Array.prototype.flatten).toBeFunction('flatten');
    expect(Array.prototype.keep).toBeFunction('keep');
    expect(Array.prototype.without).toBeFunction('without');
    expect(Array.prototype.random).toBeFunction('random');
    expect(Array.prototype.randomPop).toBeFunction('randomProp');
    expect(Array.prototype.randomIndex).toBeFunction('randomIndex');
    expect(Array.prototype.shuffle).toBeFunction('shuffle');
    expect(Array.prototype.invoke).toBeFunction('invoke');
    expect(Array.prototype.pluck).toBeFunction('pluck');
    expect(Array.prototype.each).toBeFunction('each');
  });


  it('should make a deep copy of the array', function() {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
    expect([1, undefined, 2, 3, null]).toEqual([1, undefined, 2, 3, null]);
    expect([1, [2, 3], [[4]]]).toEqual([1, [2, 3], [[4]]]);
    expect([]).toEqual([]);
  });


  it('should clear the array of all its items', function () {
    var array = [1, 2, 3];
    array.clear();
    expect(array.length).toEqual(0);
    expect(array[0]).toBeUndefined();
  });


  it('should return the first item of the array', function () {
    var array = [1, 2, 3];
    expect(array.first()).toEqual(1);
    expect([].first()).toBeUndefined();
  });


  it('should return the last item of the array', function () {
    var array = [1, 2, 3];
    expect(array.last()).toEqual(3);
    expect([].last()).toBeUndefined();
  });


  it('should tell if the array contains the given item', function () {
    var array = [1, undefined, null, 1];
    expect(array.contain(1)).toBeTruthy();
    expect(array.contain(undefined)).toBeTruthy();
    expect(array.contain(null)).toBeTruthy();
    expect([].contain(undefined)).toBeFalsy();
  });


  it('should remove the item at the given index', function () {
    var array = [1, undefined, 2, 3];
    expect(array.removeAt(1)).toBeTruthy();
    expect(array.length).toEqual(3);
    expect(array).toEqual([1, 2, 3]);
    expect(array.removeAt(array.length)).toBeFalsy();
    expect(array.length).toEqual(3);
    expect(array).toEqual([1, 2, 3]);
    expect(array.removeAt(0)).toBeTruthy();
    expect(array.length).toEqual(2);
    expect(array).toEqual([2, 3]);
  });


  it('should remove the item from the end if the given index is negative', function () {
    var array = [1, undefined, 2, 3];
    expect(array.removeAt(-1)).toBeTruthy();
    expect(array.length).toEqual(3);
    expect(array).toEqual([1, undefined, 2]);
    expect(array.removeAt(-2)).toBeTruthy();
    expect(array.length).toEqual(2);
    expect(array).toEqual([1, 2]);
    expect(array.removeAt(-99)).toBeTruthy();
    expect(array.length).toEqual(1);
    expect(array).toEqual([2]);
    expect([].removeAt(-1)).toBeFalsy();
  });


  it('should remove the given item', function () {
    var array = [1, undefined, 2, 3, 1, undefined];
    expect(array.remove(1)).toBeTruthy();
    expect(array.length).toEqual(5);
    expect(array.remove(null)).toBeFalsy();
    expect(array.length).toEqual(5);
    expect(array.remove(undefined)).toBeTruthy();
    expect(array.length).toEqual(4);
    expect(array).toEqual([2, 3, 1, undefined]);
  });


  it('should return the last item and remove it (like a LIFO)', function() {
    var array = [1, undefined, null];
    expect(array.pop()).toEqual(null);
    expect(array.length).toEqual(2);
    expect(array.pop()).toEqual(undefined);
    expect(array.length).toEqual(1);
    expect(array.pop()).toEqual(1);
    expect(array.length).toEqual(0);
    expect(array.pop()).toEqual(undefined);
    expect(array.length).toEqual(0);
  });


  it('should compact an array removing null and undefined items', function () {
    var array = [1, undefined, 2, null, false, 3, false, 4];
    expect(array.compact()).toEqual([1, 2, false, 3, false, 4]);
    expect([].compact()).toEqual([]);
  });


  it('should build a result value based ont the successive results of the given iterator', function() {
    expect([1, 2, 3, 4].inject(0, function(sum, value) {
      return sum + value;
    }));
  });


  it('should flatten nested array', function () {
    var array = [1, [2], [3, [[[4]]]]];
    expect(array.flatten()).toEqual([1, 2, 3, 4]);
    expect([].flatten()).toEqual([]);
  });


  it('should keep only the specified items', function() {
    var array = [1, undefined, 2, 3, 1, null];
    expect(array.keep(1, undefined, 2, 3, 1, null)).toEqual(array);
    expect(array.keep(1, 2, 3)).toEqual([1, 2, 3, 1]);
    expect(array.keep(undefined)).toEqual([undefined]);
    expect(array.keep()).toEqual([]);
    expect([].keep()).toEqual([]);
  });


  it('should removes all the specified items', function() {
    var array = [1, undefined, 2, 3, 1, null];
    expect(array.without(1, undefined, 2, 3, 1, null)).toEqual([]);
    expect(array.without(1, 2, 3)).toEqual([undefined, null]);
    expect(array.without(undefined)).toEqual([1, 2, 3, 1, null]);
    expect(array.without()).toEqual(array);
    expect([].without()).toEqual([]);
  });


  it('should return a random valid index', function() {
    var array = [1, undefined, 2, 3, 1, null];
    for (var i = 0; i < 30; i++) {
      var index = array.randomIndex();
      expect(index).toBeGreaterThan(-1);
      expect(index).toBeLessThan(array.length);
      expect(array).toContain(array[index]);

      expect([1].randomIndex()).toEqual(0);
      expect([].randomIndex()).toEqual(-1);
    }
  });


  it('should return a random valid item', function() {
    var array = [1, undefined, 2, 3, 1, null];
    for (var i = 0; i < 30; i++) {
      var item = array.random();
      expect(array).toContain(item);

      expect([1].random()).toEqual(1);
      expect([].random()).toBeUndefined();
    }
  });


  it('should return a random valid item and remove it', function() {
    var array = [1, undefined, 2, 3, 1, null];
    for (var i = array.length - 1; i >= 0; i--) {
      var item = array.randomPop();
      //FIXME: seems buggy
      //expect(array).not.toContain(item);
      expect(array.length).toEqual(i);
    }
    expect(array.randomPop()).toBeUndefined();
    expect(array.length).toEqual(0);
  });


  it('should suffle the array', function() {
    var array = [1, undefined, 2, 3, 1, null];
    for (var i = 0; i < 30; i++) {
      var shuffled = Object.clone(array).shuffle();
      expect(shuffled).not.toEqual(array);
      expect(shuffled.length).toEqual(array.length);
      for (var j = 0; j < shuffled.length; j++) {
        expect(array).toContain(shuffled[i]);
      }
    }
  });


  it('should invoke a method for each item', function() {
    var array = [[1, 3, 2], [5 , 6, 4]].invoke('sort');
    expect(array.length).toEqual(2);
    expect(array[0]).toEqual([1, 2, 3]);
    expect(array[1]).toEqual([4, 5, 6]);

    array = array.invoke('invoke', 'toString', 2);
    expect(array[0]).toEqual(['1', '10', '11']);
    expect(array[1]).toEqual(['100', '101', '110']);

    expect([]).toEqual([]);
  });


  it('should fetch a property value for each item', function() {
    var array = [[1, 2, 3], [4, 5, 6]].pluck('length');
    expect(array.length).toEqual(2);
    expect(array[0]).toEqual(3);
    expect(array[1]).toEqual(3);

    expect([].pluck('length')).toEqual([]);
  });
});

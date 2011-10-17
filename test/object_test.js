test('Object conformance API v1', function() {
	// static methods
	equal('function', typeof Object.mixin, "Object.mixin");
	equal('function', typeof Object.merge, "Object.merge");
	equal('function', typeof Object.extend, "Object.extend");
	equal('function', typeof Object.implement, "Object.implement");
});

test('Object.mixin', function() {
	// functional testing
	deepEqual({a: 1, b: 2}, Object.mixin({a: 1}, {b: 2}), "mixin literal objects");
	deepEqual({a: 2}, Object.mixin({a: 1}, {a: 2}), "mixin literal objects with overriding on the same property");
	deepEqual({a: 1}, Object.mixin({a: 1}, {}), "mixin one empty object and one literal object");
	// stress testing
	raises(function() { Object.mixin(null, null) }, TypeError, "both target and source must be objects");
	raises(function() { Object.mixin({a: 1}, null) }, TypeError, "both target and source must be objects");
	raises(function() { Object.mixin(null, {a: 1}) }, TypeError, "both target and source must be objects");
});

test('Object.merge', function() {
	// functional testing
	deepEqual({a: 1, b: 2}, Object.merge({a: 1}, {b: 2}), "merge literal objects");
	deepEqual({a: 1}, Object.merge({a: 1}, {a: 2}), "merge literal objects with overriding on the same property");
	deepEqual({a: 1}, Object.merge({a: 1}, {}), "merge one empty object and one literal object");
	// stress testing
	raises(function() { Object.merge(null, null) }, TypeError, "both target and source must be objects");
	raises(function() { Object.merge({a: 1}, null) }, TypeError, "both target and source must be objects");
	raises(function() { Object.merge(null, {a: 1}) }, TypeError, "both target and source must be objects");
});

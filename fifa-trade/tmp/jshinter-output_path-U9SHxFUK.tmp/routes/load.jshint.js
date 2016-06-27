QUnit.module('JSHint | routes/load.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/load.js should pass jshint.\nroutes/load.js: line 33, col 27, Missing semicolon.\nroutes/load.js: line 37, col 11, Missing semicolon.\nroutes/load.js: line 7, col 9, \'$\' is not defined.\nroutes/load.js: line 12, col 17, \'$\' is not defined.\nroutes/load.js: line 19, col 25, \'$\' is not defined.\n\n5 errors');
});

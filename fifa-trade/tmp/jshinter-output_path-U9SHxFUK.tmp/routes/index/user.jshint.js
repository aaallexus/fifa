QUnit.module('JSHint | routes/index/user.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/index/user.js should pass jshint.\nroutes/index/user.js: line 7, col 16, \'$\' is not defined.\n\n1 error');
});

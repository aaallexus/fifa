QUnit.module('JSHint | app.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'app.js should pass jshint.\napp.js: line 6, col 5, \'restUrl\' is defined but never used.\n\n1 error');
});

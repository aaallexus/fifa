define('fifa-trade/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 32, col 27, Missing semicolon.\nroutes/index.js: line 36, col 11, Missing semicolon.\nroutes/index.js: line 1, col 16, \'Ember\' is not defined.\nroutes/index.js: line 5, col 9, \'$\' is not defined.\nroutes/index.js: line 11, col 17, \'$\' is not defined.\nroutes/index.js: line 18, col 25, \'$\' is not defined.\n\n6 errors');
  });
});
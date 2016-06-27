define('fifa-trade/tests/controllers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/index.js should pass jshint.\ncontrollers/index.js: line 46, col 34, \'data\' is defined but never used.\ncontrollers/index.js: line 1, col 17, \'Ember\' is not defined.\ncontrollers/index.js: line 12, col 23, \'$\' is not defined.\ncontrollers/index.js: line 14, col 17, \'$\' is not defined.\ncontrollers/index.js: line 16, col 17, \'$\' is not defined.\ncontrollers/index.js: line 39, col 13, \'$\' is not defined.\n\n6 errors');
  });
});
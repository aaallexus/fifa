define('fifa-trade/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass jshint.\napp.js: line 6, col 5, \'restUrl\' is defined but never used.\n\n1 error');
  });
});
define('fifa-trade/tests/components/top-menu.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/top-menu.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/top-menu.js should pass jshint.');
  });
});
define('fifa-trade/tests/controllers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/index.js should pass jshint.\ncontrollers/index.js: line 46, col 34, \'data\' is defined but never used.\ncontrollers/index.js: line 1, col 17, \'Ember\' is not defined.\ncontrollers/index.js: line 12, col 23, \'$\' is not defined.\ncontrollers/index.js: line 14, col 17, \'$\' is not defined.\ncontrollers/index.js: line 16, col 17, \'$\' is not defined.\ncontrollers/index.js: line 39, col 13, \'$\' is not defined.\n\n6 errors');
  });
});
define('fifa-trade/tests/helpers/date-to-str.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/date-to-str.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/date-to-str.js should pass jshint.');
  });
});
define('fifa-trade/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('fifa-trade/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('fifa-trade/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'fifa-trade/tests/helpers/start-app', 'fifa-trade/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _fifaTradeTestsHelpersStartApp, _fifaTradeTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _fifaTradeTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _fifaTradeTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('fifa-trade/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('fifa-trade/tests/helpers/resolver', ['exports', 'fifa-trade/resolver', 'fifa-trade/config/environment'], function (exports, _fifaTradeResolver, _fifaTradeConfigEnvironment) {

  var resolver = _fifaTradeResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _fifaTradeConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _fifaTradeConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('fifa-trade/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('fifa-trade/tests/helpers/start-app', ['exports', 'ember', 'fifa-trade/app', 'fifa-trade/config/environment'], function (exports, _ember, _fifaTradeApp, _fifaTradeConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _fifaTradeConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _fifaTradeApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('fifa-trade/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('fifa-trade/tests/integration/components/top-menu-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('top-menu', 'Integration | Component | top menu', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.6.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 12
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'top-menu', ['loc', [null, [1, 0], [1, 12]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.6.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.6.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'top-menu', [], [], 0, null, ['loc', [null, [2, 4], [4, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('fifa-trade/tests/integration/components/top-menu-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/top-menu-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/top-menu-test.js should pass jshint.');
  });
});
define('fifa-trade/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('fifa-trade/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('fifa-trade/tests/routes/index/load.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index/load.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index/load.js should pass jshint.');
  });
});
define('fifa-trade/tests/routes/index/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index/user.js should pass jshint.\nroutes/index/user.js: line 7, col 16, \'$\' is not defined.\n\n1 error');
  });
});
define('fifa-trade/tests/routes/index-load.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index-load.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index-load.js should pass jshint.');
  });
});
define('fifa-trade/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 32, col 27, Missing semicolon.\nroutes/index.js: line 36, col 11, Missing semicolon.\nroutes/index.js: line 1, col 16, \'Ember\' is not defined.\nroutes/index.js: line 5, col 9, \'$\' is not defined.\nroutes/index.js: line 11, col 17, \'$\' is not defined.\nroutes/index.js: line 18, col 25, \'$\' is not defined.\n\n6 errors');
  });
});
define('fifa-trade/tests/routes/load.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/load.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/load.js should pass jshint.\nroutes/load.js: line 33, col 27, Missing semicolon.\nroutes/load.js: line 37, col 11, Missing semicolon.\nroutes/load.js: line 7, col 9, \'$\' is not defined.\nroutes/load.js: line 12, col 17, \'$\' is not defined.\nroutes/load.js: line 19, col 25, \'$\' is not defined.\n\n5 errors');
  });
});
define('fifa-trade/tests/test-helper', ['exports', 'fifa-trade/tests/helpers/resolver', 'ember-qunit'], function (exports, _fifaTradeTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_fifaTradeTestsHelpersResolver['default']);
});
define('fifa-trade/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('fifa-trade/tests/unit/helpers/date-to-str-test', ['exports', 'fifa-trade/helpers/date-to-str', 'qunit'], function (exports, _fifaTradeHelpersDateToStr, _qunit) {

  (0, _qunit.module)('Unit | Helper | date to str');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _fifaTradeHelpersDateToStr.dateToStr)([42]);
    assert.ok(result);
  });
});
define('fifa-trade/tests/unit/helpers/date-to-str-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/helpers/date-to-str-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/date-to-str-test.js should pass jshint.');
  });
});
define('fifa-trade/tests/unit/routes/index/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index/user', 'Unit | Route | index/user', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('fifa-trade/tests/unit/routes/index/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/user-test.js should pass jshint.');
  });
});
define('fifa-trade/tests/unit/routes/load-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:load', 'Unit | Route | load', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('fifa-trade/tests/unit/routes/load-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/load-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/load-test.js should pass jshint.');
  });
});
define('fifa-trade/tests/unit/routes/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:user', 'Unit | Route | user', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('fifa-trade/tests/unit/routes/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/user-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('fifa-trade/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
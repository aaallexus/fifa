"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('fifa-trade/app', ['exports', 'ember', 'fifa-trade/resolver', 'ember-load-initializers', 'fifa-trade/config/environment'], function (exports, _ember, _fifaTradeResolver, _emberLoadInitializers, _fifaTradeConfigEnvironment) {

  var restUrl = 'http://fifa-trade.com/';

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _fifaTradeConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _fifaTradeConfigEnvironment['default'].podModulePrefix,
    Resolver: _fifaTradeResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _fifaTradeConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('fifa-trade/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'fifa-trade/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _fifaTradeConfigEnvironment) {

  var name = _fifaTradeConfigEnvironment['default'].APP.name;
  var version = _fifaTradeConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('fifa-trade/components/top-menu', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({});
});
define('fifa-trade/controllers/index', ['exports'], function (exports) {
    exports['default'] = Ember.Controller.extend({
        restUrl: 'http://fifa-trade.com/',
        actions: {
            showMenu: function showMenu() {
                var menu = $('#rightMenu');
                menu.show();
                $('<div  class="dialog-background"></div>').insertBefore(menu).click(function () {
                    menu.hide();
                    $(this).remove();
                });
                menu.show();
            }
        }
    });
});
define('fifa-trade/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('fifa-trade/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('fifa-trade/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'fifa-trade/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _fifaTradeConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_fifaTradeConfigEnvironment['default'].APP.name, _fifaTradeConfigEnvironment['default'].APP.version)
  };
});
define('fifa-trade/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('fifa-trade/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('fifa-trade/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('fifa-trade/initializers/export-application-global', ['exports', 'ember', 'fifa-trade/config/environment'], function (exports, _ember, _fifaTradeConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_fifaTradeConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _fifaTradeConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_fifaTradeConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('fifa-trade/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('fifa-trade/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('fifa-trade/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("fifa-trade/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('fifa-trade/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('fifa-trade/router', ['exports', 'ember', 'fifa-trade/config/environment'], function (exports, _ember, _fifaTradeConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _fifaTradeConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('index', { path: '/' });
  });

  exports['default'] = Router;
});
define('fifa-trade/routes/index', ['exports'], function (exports) {
	exports['default'] = Ember.Route.extend({
		model: function model() {
			var restUrl = this.controllerFor('index').get('restUrl');
			$.ajax({
				'url': restUrl + 'getMenu',
				'type': 'POST',
				'dataType': 'json'
			});
		}
	});
});
define('fifa-trade/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("fifa-trade/templates/components/top-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "fifa-trade/templates/components/top-menu.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("fifa-trade/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.6.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 94,
            "column": 9
          }
        },
        "moduleName": "fifa-trade/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "top-menu row");
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-8");
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4, "class", "left-menu");
        var el5 = dom.createTextNode("\n		");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-4 pull-right text-right");
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4, "class", "right-menu");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "form-horizontal");
        var el6 = dom.createTextNode("\n			    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "dropdown staus-bar btn-notifi");
        var el7 = dom.createTextNode("\n			        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "class", "dropdown-toggle account");
        dom.setAttribute(el7, "href", "#");
        var el8 = dom.createTextNode("\n			            Войти в систему\n			        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n			        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "dropdown-menu pull-right login-form");
        dom.setAttribute(el7, "id", "rightMenu");
        var el8 = dom.createTextNode("\n			            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8, "class", "nav nav-tabs");
        var el9 = dom.createTextNode("\n			                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        dom.setAttribute(el9, "class", "active");
        var el10 = dom.createElement("a");
        dom.setAttribute(el10, "href", "#auth-tab");
        dom.setAttribute(el10, "data-toggle", "tab");
        dom.setAttribute(el10, "aria-expanded", "true");
        var el11 = dom.createTextNode("Авторизация");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n			                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        dom.setAttribute(el9, "class", "");
        var el10 = dom.createElement("a");
        dom.setAttribute(el10, "href", "#reg-tab");
        dom.setAttribute(el10, "data-toggle", "tab");
        dom.setAttribute(el10, "aria-expanded", "false");
        var el11 = dom.createTextNode("Регистрация");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n			            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n			            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "tab-content");
        var el9 = dom.createTextNode("\n			                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "tab-pane active");
        dom.setAttribute(el9, "id", "auth-tab");
        var el10 = dom.createTextNode("\n			                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("form");
        dom.setAttribute(el10, "method", "POST");
        dom.setAttribute(el10, "action", "auth/");
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("input");
        dom.setAttribute(el12, "class", "form-control");
        dom.setAttribute(el12, "name", "login");
        dom.setAttribute(el12, "placeholder", "Логин");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("input");
        dom.setAttribute(el12, "type", "password");
        dom.setAttribute(el12, "name", "password");
        dom.setAttribute(el12, "class", "form-control");
        dom.setAttribute(el12, "placeholder", "Пароль");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "col-md-8");
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("input");
        dom.setAttribute(el13, "type", "checkbox");
        dom.setAttribute(el13, "id", "savePassword");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        dom.setAttribute(el13, "for", "savePassword");
        var el14 = dom.createTextNode("Запомнить");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                            ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "col-md-4");
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("button");
        dom.setAttribute(el13, "class", "btn btn-success");
        var el14 = dom.createTextNode("Войти");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                            ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                    ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n			                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "row");
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "auth-divider");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("span");
        var el13 = dom.createTextNode("\n			                                или\n			                            ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                    ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n			                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "row");
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("a");
        dom.setAttribute(el11, "href", "auth/fb.php");
        var el12 = dom.createTextNode("Facebook");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("a");
        dom.setAttribute(el11, "href", "auth/vk.php");
        var el12 = dom.createTextNode("VKontakte");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                    ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n			                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n			                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "tab-pane");
        dom.setAttribute(el9, "id", "reg-tab");
        var el10 = dom.createTextNode("\n			                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("form");
        dom.setAttribute(el10, "method", "POST");
        dom.setAttribute(el10, "id", "regform");
        dom.setAttribute(el10, "action", "auth/reg.php");
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("input");
        dom.setAttribute(el12, "class", "form-control");
        dom.setAttribute(el12, "type", "text");
        dom.setAttribute(el12, "name", "login");
        dom.setAttribute(el12, "placeholder", "Логин");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("input");
        dom.setAttribute(el12, "type", "password");
        dom.setAttribute(el12, "type", "text");
        dom.setAttribute(el12, "class", "form-control");
        dom.setAttribute(el12, "name", "password");
        dom.setAttribute(el12, "placeholder", "Введите пароль");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("input");
        dom.setAttribute(el12, "type", "password");
        dom.setAttribute(el12, "type", "text");
        dom.setAttribute(el12, "class", "form-control");
        dom.setAttribute(el12, "name", "repeat_password");
        dom.setAttribute(el12, "placeholder", "Повторите пароль");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("input");
        dom.setAttribute(el12, "class", "form-control");
        dom.setAttribute(el12, "type", "text");
        dom.setAttribute(el12, "name", "email");
        dom.setAttribute(el12, "placeholder", "Введите E-mail");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "col-md-12");
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("input");
        dom.setAttribute(el13, "type", "checkbox");
        dom.setAttribute(el13, "id", "reciveMessage");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        dom.setAttribute(el13, "for", "reciveMessage");
        var el14 = dom.createTextNode("Я хочу получать уведомления");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                            ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "col-md-12");
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("input");
        dom.setAttribute(el13, "type", "checkbox");
        dom.setAttribute(el13, "id", "reciveMessage");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        dom.setAttribute(el13, "for", "reciveMessage");
        var el14 = dom.createTextNode("Я соглашаюсь с правилами");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                            ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "col-md-12");
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("input");
        dom.setAttribute(el13, "type", "checkbox");
        dom.setAttribute(el13, "id", "reciveMessage");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                                ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        dom.setAttribute(el13, "for", "reciveMessage");
        var el14 = dom.createTextNode("Я не робот");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n			                            ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "col-md-4");
        var el12 = dom.createTextNode("\n			                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("button");
        dom.setAttribute(el12, "class", "btn btn-success");
        var el13 = dom.createTextNode("Зарегистрироваться");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n			                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n			                    ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n			                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n			            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n			        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n			    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 3, 1, 1, 1, 1]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["showMenu"], [], ["loc", [null, [11, 55], [11, 76]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('fifa-trade/config/environment', ['ember'], function(Ember) {
  var prefix = 'fifa-trade';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("fifa-trade/app")["default"].create({"name":"fifa-trade","version":"0.0.0+7b60a302"});
}

/* jshint ignore:end */
//# sourceMappingURL=fifa-trade.map
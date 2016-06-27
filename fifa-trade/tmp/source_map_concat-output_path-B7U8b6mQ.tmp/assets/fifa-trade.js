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
        restUrl: 'http://rest.fifa-trade.com/',
        isLoad: false,
        facebookAuth: function facebookAuth() {
            window.location = this.get('restUrl') + 'auth/fb.php';
        },
        vkAuth: function vkAuth() {
            window.location = this.get('restUrl') + 'auth/vk.php?session_id=' + this.get('sessionId');
        },
        actions: {
            showMenu: function showMenu() {
                var menu = $('#rightMenu');
                menu.show();
                $('<div  class="dialog-background"></div>').insertBefore(menu).click(function () {
                    menu.hide();
                    $(this).remove();
                });
                menu.show();
            },
            goTo: function goTo(router) {
                this.transitionToRoute(router);
            },
            auth: function auth(typeAuth) {
                switch (typeAuth) {
                    case 'facebook':
                        this.facebookAuth();
                        break;
                    case 'vk':
                        this.vkAuth();
                        break;
                }
            },
            goToCabinet: function goToCabinet(id_user) {
                this.transitionToRoute('index.user', id_user);
            },
            logout: function logout() {
                var self = this;
                $.ajax({
                    'url': this.get('restUrl') + 'logout',
                    'type': 'POST',
                    'dataType': 'json',
                    'data': {
                        'session_id': this.get('sessionId')
                    },
                    success: function success(data) {
                        self.transitionToRoute('index');
                        location.reload();
                    }
                });
            }
        }
    });
});
define('fifa-trade/helpers/date-to-str', ['exports', 'ember'], function (exports, _ember) {
  exports.dateToStr = dateToStr;

  function dateToStr(params /*, hash*/) {
    return params;
  }

  exports['default'] = _ember['default'].Helper.helper(dateToStr);
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
    this.route('index', { path: '/' }, function () {
      this.route('load');
      this.route('user', { path: '/id/:id' });
    });
    this.route('load');
  });

  exports['default'] = Router;
});
define("fifa-trade/routes/index/load", ["exports"], function (exports) {});
define('fifa-trade/routes/index/user', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model(arg) {
			var restUrl = this.controllerFor('index').get('restUrl');
			var sessionId = this.controllerFor('index').get('sessionId');
			return $.ajax({
				'url': restUrl + 'getUser',
				'type': 'POST',
				'dataType': 'json',
				'data': {
					'session_id': sessionId,
					'id': arg.id
				},
				success: function success(data) {
					var curDate = new Date();
					var date = data.birthday.split('-');
					var birthday = new Date(date[0], date[1] - 1, date[2]);
					var age = curDate.getFullYear() - birthday.getFullYear();
					age = curDate.setFullYear(1972) < birthday.setFullYear(1972) ? age - 1 : age;
					data.age = age;
					return data;
				}
			});
		}
	});
});
define('fifa-trade/routes/index-load', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			alert(12);
		}
	});
});
define('fifa-trade/routes/index', ['exports'], function (exports) {
	exports['default'] = Ember.Route.extend({
		model: function model() {
			var self = this;
			var restUrl = this.controllerFor('index').get('restUrl');
			$.ajax({
				'url': 'session.php',
				'dataType': 'json',
				'async': false,
				success: function success(session) {
					self.controllerFor('index').set('sessionId', session.session_id);
					$.ajax({
						'url': restUrl + 'getMenu',
						'type': 'POST',
						'dataType': 'json',
						success: function success(data) {
							self.controllerFor('index').set('leftMenu', data);
							self.controllerFor('index').set('isLoad', true);
							$.ajax({
								'url': restUrl + 'getCurUser',
								'type': 'POST',
								'dataType': 'json',
								'data': {
									'session_id': self.controllerFor('index').get('sessionId')
								},
								success: function success(data) {
									self.controllerFor('index').set('curUser', data);
								},
								error: function error() {}
							});
						}
					});
				}
			});
		}
	});
});
define('fifa-trade/routes/load', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			var self = this;
			var restUrl = this.controllerFor('index').get('restUrl');
			$.ajax({
				'url': 'session.php',
				'dataType': 'json',
				success: function success(session) {
					self.controllerFor('index').set('sessionId', session.session_id);
					$.ajax({
						'url': restUrl + 'getMenu',
						'type': 'POST',
						'dataType': 'json',
						success: function success(data) {
							self.controllerFor('index').set('leftMenu', data);
							self.controllerFor('index').set('isLoad', true);
							$.ajax({
								'url': restUrl + 'getCurUser',
								'type': 'POST',
								'dataType': 'json',
								'data': {
									'session_id': self.controllerFor('index').get('sessionId')
								},
								success: function success(data) {
									self.controllerFor('index').set('curUser', data[0]);
									self.transitionTo('index');
								},
								error: function error() {
									self.transitionTo('index');
								}
							});
						}
					});
				}
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
define("fifa-trade/templates/index/user", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.6.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 68,
            "column": 0
          }
        },
        "moduleName": "fifa-trade/templates/index/user.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cabinet");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-3");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4, "class", "user-photo");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "id", "sendMessage");
        var el5 = dom.createTextNode("Написать сообщение");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "id", "addFriend");
        var el5 = dom.createTextNode("Добавить в друзья");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-9");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "nav nav-tabs");
        var el4 = dom.createTextNode("\n	        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "active");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#main-tab");
        dom.setAttribute(el5, "data-toggle", "tab");
        dom.setAttribute(el5, "aria-expanded", "true");
        var el6 = dom.createTextNode("Общие");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#dealings-tab");
        dom.setAttribute(el5, "data-toggle", "tab");
        dom.setAttribute(el5, "aria-expanded", "false");
        var el6 = dom.createTextNode("Сделки");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#players-tab");
        dom.setAttribute(el5, "data-toggle", "tab");
        dom.setAttribute(el5, "aria-expanded", "false");
        var el6 = dom.createTextNode("Игроки");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#friends-tab");
        dom.setAttribute(el5, "data-toggle", "tab");
        dom.setAttribute(el5, "aria-expanded", "false");
        var el6 = dom.createTextNode("Друзья");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#settings-tab");
        dom.setAttribute(el5, "data-toggle", "tab");
        dom.setAttribute(el5, "aria-expanded", "false");
        var el6 = dom.createTextNode("Настройки");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "tab-content");
        var el4 = dom.createTextNode("\n        	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "tab-pane active");
        dom.setAttribute(el4, "id", "main-tab");
        var el5 = dom.createTextNode("\n        		");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        var el7 = dom.createTextNode("Мои данные");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("table");
        dom.setAttribute(el6, "class", "table table-striped");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("tbody");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Логин");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        dom.setAttribute(el9, "id", "userLogin");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Имя");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        dom.setAttribute(el9, "id", "userName");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Фамилия");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        dom.setAttribute(el9, "id", "userSurname");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Страна");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        dom.setAttribute(el9, "id", "userCountry");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Город");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        dom.setAttribute(el9, "id", "userCity");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Дата рождения");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        dom.setAttribute(el9, "id", "userBirthday");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("(");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode(")");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Регистрация");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Последнее посещение");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("tr");
        var el9 = dom.createElement("td");
        var el10 = dom.createTextNode("Любимый клуб");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("td");
        dom.setAttribute(el9, "id", "userClub");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-6");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h5");
        dom.setAttribute(el8, "class", "title");
        var el9 = dom.createTextNode("Для связи со мной");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        dom.setAttribute(el7, "id", "userSkype");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        dom.setAttribute(el7, "id", "userEmail");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        dom.setAttribute(el7, "id", "userPhone");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        dom.setAttribute(el7, "id", "userIcq");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-6");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h5");
        dom.setAttribute(el8, "class", "title");
        var el9 = dom.createTextNode("Я в социальных сетях");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "tab-pane");
        dom.setAttribute(el4, "id", "dealings-tab");
        var el5 = dom.createTextNode("\n\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "tab-pane");
        dom.setAttribute(el4, "id", "players-tab");
        var el5 = dom.createTextNode("\n\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "tab-pane");
        dom.setAttribute(el4, "id", "friends-tab");
        var el5 = dom.createTextNode("\n\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "tab-pane");
        dom.setAttribute(el4, "id", "settings-tab");
        var el5 = dom.createTextNode("\n\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 1, 1]);
        var element2 = dom.childAt(element0, [3, 3, 1, 1, 3, 1]);
        var element3 = dom.childAt(element2, [11, 1]);
        var morphs = new Array(11);
        morphs[0] = dom.createAttrMorph(element1, 'src');
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 1]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3, 1]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [5, 1]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [7, 1]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element2, [9, 1]), 0, 0);
        morphs[6] = dom.createMorphAt(element3, 0, 0);
        morphs[7] = dom.createMorphAt(element3, 2, 2);
        morphs[8] = dom.createMorphAt(dom.childAt(element2, [13, 1]), 0, 0);
        morphs[9] = dom.createMorphAt(dom.childAt(element2, [15, 1]), 0, 0);
        morphs[10] = dom.createMorphAt(dom.childAt(element2, [17, 1]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "src", ["concat", [["get", "model.photo", ["loc", [null, [4, 34], [4, 45]]]]]]], ["content", "model.login", ["loc", [null, [23, 44], [23, 59]]]], ["content", "model.name", ["loc", [null, [24, 41], [24, 55]]]], ["content", "model.surname", ["loc", [null, [25, 48], [25, 65]]]], ["content", "model.country", ["loc", [null, [26, 47], [26, 64]]]], ["content", "model.city", ["loc", [null, [27, 43], [27, 57]]]], ["content", "model.birthday", ["loc", [null, [28, 55], [28, 73]]]], ["content", "model.age", ["loc", [null, [28, 74], [28, 87]]]], ["content", "model.date_reg", ["loc", [null, [29, 35], [29, 53]]]], ["content", "model.last_visit", ["loc", [null, [30, 43], [30, 63]]]], ["content", "model.club", ["loc", [null, [31, 50], [31, 64]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("fifa-trade/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 4
            },
            "end": {
              "line": 8,
              "column": 4
            }
          },
          "moduleName": "fifa-trade/templates/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "href", "#");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element9 = dom.childAt(fragment, [1, 0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element9);
          morphs[1] = dom.createMorphAt(element9, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["goTo", ["get", "menuItem.url", ["loc", [null, [7, 37], [7, 49]]]]], [], ["loc", [null, [7, 21], [7, 51]]]], ["content", "menuItem.title", ["loc", [null, [7, 52], [7, 70]]]]],
        locals: ["menuItem"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 8
            },
            "end": {
              "line": 29,
              "column": 8
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
          var el1 = dom.createTextNode("			    		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "dropdown-toggle account");
          dom.setAttribute(el1, "data-toggle", "dropdown");
          dom.setAttribute(el1, "id", "showRightMenu");
          dom.setAttribute(el1, "href", "#");
          var el2 = dom.createTextNode("\n				            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2, "class", "userpic");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "dropdown-menu pull-right login-form");
          var el2 = dom.createTextNode("\n				        	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2, "class", "user-menu");
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#");
          var el5 = dom.createTextNode("Личный кабинет");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createTextNode("Сообщения");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createTextNode("Мои игроки");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.setAttribute(el3, "class", "divider");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#");
          var el5 = dom.createTextNode("Выход");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				        	");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var element5 = dom.childAt(element4, [1]);
          var element6 = dom.childAt(fragment, [3, 1]);
          var element7 = dom.childAt(element6, [1, 0]);
          var element8 = dom.childAt(element6, [9, 0]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element5, 'src');
          morphs[1] = dom.createMorphAt(element4, 2, 2);
          morphs[2] = dom.createElementMorph(element7);
          morphs[3] = dom.createElementMorph(element8);
          return morphs;
        },
        statements: [["attribute", "src", ["concat", [["get", "curUser.photo_small", ["loc", [null, [18, 44], [18, 63]]]]]]], ["content", "curUser.name", ["loc", [null, [18, 67], [18, 83]]]], ["element", "action", ["goToCabinet", ["get", "curUser.id", ["loc", [null, [22, 53], [22, 63]]]]], [], ["loc", [null, [22, 30], [22, 65]]]], ["element", "action", ["logout"], [], ["loc", [null, [26, 30], [26, 49]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 8
            },
            "end": {
              "line": 108,
              "column": 8
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
          var el1 = dom.createTextNode("				        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "dropdown-toggle account");
          dom.setAttribute(el1, "href", "#");
          var el2 = dom.createTextNode("\n				            Войти в систему\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "dropdown-menu pull-right login-form");
          dom.setAttribute(el1, "id", "rightMenu");
          var el2 = dom.createTextNode("\n				            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2, "class", "nav nav-tabs");
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.setAttribute(el3, "class", "active");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#auth-tab");
          dom.setAttribute(el4, "data-toggle", "tab");
          dom.setAttribute(el4, "aria-expanded", "true");
          var el5 = dom.createTextNode("Авторизация");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.setAttribute(el3, "class", "");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#reg-tab");
          dom.setAttribute(el4, "data-toggle", "tab");
          dom.setAttribute(el4, "aria-expanded", "false");
          var el5 = dom.createTextNode("Регистрация");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "tab-content");
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "tab-pane active");
          dom.setAttribute(el3, "id", "auth-tab");
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("form");
          dom.setAttribute(el4, "method", "POST");
          dom.setAttribute(el4, "action", "auth/");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "name", "login");
          dom.setAttribute(el6, "placeholder", "Логин");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "type", "password");
          dom.setAttribute(el6, "name", "password");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "placeholder", "Пароль");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-8");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "savePassword");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "savePassword");
          var el8 = dom.createTextNode("Запомнить");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-4");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("button");
          dom.setAttribute(el7, "class", "btn btn-success");
          var el8 = dom.createTextNode("Войти");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "row");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "auth-divider");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("span");
          var el7 = dom.createTextNode("\n				                                или\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "row");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("a");
          dom.setAttribute(el5, "href", "#");
          var el6 = dom.createTextNode("Facebook");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("a");
          dom.setAttribute(el5, "href", "#");
          var el6 = dom.createTextNode("VKontakte");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "tab-pane");
          dom.setAttribute(el3, "id", "reg-tab");
          var el4 = dom.createTextNode("\n				                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("form");
          dom.setAttribute(el4, "method", "POST");
          dom.setAttribute(el4, "id", "regform");
          dom.setAttribute(el4, "action", "auth/reg.php");
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "name", "login");
          dom.setAttribute(el6, "placeholder", "Логин");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "type", "password");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "name", "password");
          dom.setAttribute(el6, "placeholder", "Введите пароль");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "type", "password");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "name", "repeat_password");
          dom.setAttribute(el6, "placeholder", "Повторите пароль");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("input");
          dom.setAttribute(el6, "class", "form-control");
          dom.setAttribute(el6, "type", "text");
          dom.setAttribute(el6, "name", "email");
          dom.setAttribute(el6, "placeholder", "Введите E-mail");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-12");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "reciveMessage");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "reciveMessage");
          var el8 = dom.createTextNode("Я хочу получать уведомления");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-12");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "reciveMessage");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "reciveMessage");
          var el8 = dom.createTextNode("Я соглашаюсь с правилами");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "row");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "col-md-12");
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("input");
          dom.setAttribute(el7, "type", "checkbox");
          dom.setAttribute(el7, "id", "reciveMessage");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                                ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("label");
          dom.setAttribute(el7, "for", "reciveMessage");
          var el8 = dom.createTextNode("Я не робот");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n				                            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "col-md-4");
          var el6 = dom.createTextNode("\n				                            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("button");
          dom.setAttribute(el6, "class", "btn btn-success");
          var el7 = dom.createTextNode("Зарегистрироваться");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n				                        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				                    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(fragment, [3, 3, 1, 5]);
          var element2 = dom.childAt(element1, [1]);
          var element3 = dom.childAt(element1, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createElementMorph(element2);
          morphs[2] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [["element", "action", ["showMenu"], [], ["loc", [null, [30, 56], [30, 77]]]], ["element", "action", ["auth", "facebook"], [], ["loc", [null, [65, 40], [65, 68]]]], ["element", "action", ["auth", "vk"], [], ["loc", [null, [66, 40], [66, 62]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 119,
            "column": 6
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
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
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
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("			    ");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "breadcrumbs");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element10 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element10, [1, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element10, [3, 1, 1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "leftMenu", ["loc", [null, [6, 12], [6, 20]]]]], [], 0, null, ["loc", [null, [6, 4], [8, 13]]]], ["block", "if", [["get", "curUser.id", ["loc", [null, [16, 14], [16, 24]]]]], [], 1, 2, ["loc", [null, [16, 8], [108, 15]]]], ["content", "outlet", ["loc", [null, [118, 1], [118, 11]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("fifa-trade/templates/load", ["exports"], function (exports) {
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
        "moduleName": "fifa-trade/templates/load.hbs"
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
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
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
  require("fifa-trade/app")["default"].create({"name":"fifa-trade","version":"0.0.0+73949007"});
}

/* jshint ignore:end */
//# sourceMappingURL=fifa-trade.map
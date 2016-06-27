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
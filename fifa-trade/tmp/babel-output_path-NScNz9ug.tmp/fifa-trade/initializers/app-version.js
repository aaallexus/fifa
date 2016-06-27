define('fifa-trade/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'fifa-trade/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _fifaTradeConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_fifaTradeConfigEnvironment['default'].APP.name, _fifaTradeConfigEnvironment['default'].APP.version)
  };
});
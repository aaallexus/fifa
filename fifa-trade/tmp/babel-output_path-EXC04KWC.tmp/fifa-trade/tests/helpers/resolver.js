define('fifa-trade/tests/helpers/resolver', ['exports', 'fifa-trade/resolver', 'fifa-trade/config/environment'], function (exports, _fifaTradeResolver, _fifaTradeConfigEnvironment) {

  var resolver = _fifaTradeResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _fifaTradeConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _fifaTradeConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
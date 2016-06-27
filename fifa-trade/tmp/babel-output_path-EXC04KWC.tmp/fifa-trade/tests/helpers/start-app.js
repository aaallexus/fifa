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
define('fifa-trade/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'fifa-trade/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _fifaTradeConfigEnvironment) {

  var name = _fifaTradeConfigEnvironment['default'].APP.name;
  var version = _fifaTradeConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
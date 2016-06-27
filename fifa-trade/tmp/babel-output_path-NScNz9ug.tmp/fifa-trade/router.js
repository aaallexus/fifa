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
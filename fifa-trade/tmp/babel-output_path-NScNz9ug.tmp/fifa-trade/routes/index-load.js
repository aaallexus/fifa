define('fifa-trade/routes/index-load', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			alert(12);
		}
	});
});
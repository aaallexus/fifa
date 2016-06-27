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
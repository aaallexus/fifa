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
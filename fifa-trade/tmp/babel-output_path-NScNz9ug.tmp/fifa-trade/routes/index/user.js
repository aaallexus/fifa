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
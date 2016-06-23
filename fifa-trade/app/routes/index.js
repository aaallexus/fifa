export default Ember.Route.extend({
	model:function(){
		var restUrl=this.controllerFor('index').get('restUrl');
		$.ajax({
			'url':restUrl+'getMenu',
			'type':'POST',
			'dataType':'json'
		});
	}
});
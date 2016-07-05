import Ember from 'ember';

export default Ember.Route.extend({
	model:function(){
		var self=this;
		var restUrl=this.controllerFor('index').get('restUrl');
		var sessionId=this.controllerFor('index').get('sessionId');
		var userId=this.controllerFor('index.user').get('userId');
		this.controllerFor('index.user.friends').set('isWaiter',true);
		$('ul.nav-tabs li').removeClass('active');
		$("#friends-tab").addClass('active');
		this.controllerFor('index.user.friends').set('model',[]);
		$.ajax({
			'url':restUrl+'getFriends',
			'type':'POST',
			'dataType':'json',
			'data':{
				'session_id':sessionId,
				'id':userId
			},
			success:function(data){
				self.controllerFor('index.user.friends').set('model',data);
				self.controllerFor('index.user.friends').set('isWaiter',false);
			}
		});
	}
});

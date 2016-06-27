import Ember from 'ember';

export default Ember.Route.extend({
	model:function(){
		var self=this;
		var restUrl=this.controllerFor('index').get('restUrl');
		$.ajax({
			'url':'session.php',
			'dataType':'json',
			success:function(session){
				self.controllerFor('index').set('sessionId',session.session_id);
				$.ajax({
					'url':restUrl+'getMenu',
					'type':'POST',
					'dataType':'json',
					success:function(data){
						self.controllerFor('index').set('leftMenu',data);
						self.controllerFor('index').set('isLoad',true);
						$.ajax({
							'url':restUrl+'getCurUser',
							'type':'POST',
							'dataType':'json',
							'data':{
								'session_id':self.controllerFor('index').get('sessionId')
							},
							success:function(data){
								self.controllerFor('index').set('curUser',data[0]);
								self.transitionTo('index');
							},
							error:function(){
								self.transitionTo('index');
							}
						})
					}
				});
			}
		})
	}
});

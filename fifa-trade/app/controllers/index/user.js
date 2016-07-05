import Ember from 'ember';

export default Ember.Controller.extend({
	indexController: Ember.inject.controller('index'),
	curUser: Ember.computed.reads('indexController.curUser'),
	restUrl: Ember.computed.reads('indexController.restUrl'),
	sessionId: Ember.computed.reads('indexController.sessionId'),
	actions:{
		addToFriend:function(){
			var self=this;
			$.ajax({
	            'url':this.get('restUrl')+'addToFriend/',
	            'type':'POST',
	            'dataType':'json',
	            'data':{
	                'id':this.get('model').id,
	                'session_id':this.get('sessionId')
	            },
	            success:function(data){
	                self.set('model.is_friend',0);
	                self.set('model.friend_request',true);
	            }
	        });
		},
		showFriends:function(){
			
		}
	}
});

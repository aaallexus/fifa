import Ember from 'ember';

export default Ember.Route.extend({
	model:function(arg){
		var restUrl=this.controllerFor('index').get('restUrl');
		var sessionId=this.controllerFor('index').get('sessionId');
		return $.ajax({
			'url':restUrl+'getUser',
			'type':'POST',
			'dataType':'json',
			'data':{
				'session_id':sessionId,
				'id':arg.id
			},
			success:function(data){
				var curDate=new Date();
				var date=data.birthday.split('-');
				var birthday=new Date(date[0],date[1]-1,date[2]);
				var age=curDate.getFullYear() - birthday.getFullYear();
				age=curDate.setFullYear(1972) < birthday.setFullYear(1972) ? age - 1 : age;
				data.age=age;
				if(data.is_friend===0)
					data.friend_request=true;
				return data;
			}
		});
	}
});

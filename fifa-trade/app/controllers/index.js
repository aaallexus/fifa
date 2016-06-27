export default  Ember.Controller.extend({
    restUrl:'http://rest.fifa-trade.com/',
    isLoad:false,
    facebookAuth:function(){
        window.location=this.get('restUrl')+'auth/fb.php';
    },
    vkAuth:function(){
        window.location=this.get('restUrl')+'auth/vk.php?session_id='+this.get('sessionId');
    },
    actions:  {
        showMenu: function(){
            var  menu=$('#rightMenu');
            	menu.show();
            	$('<div  class="dialog-background"></div>').insertBefore(menu).click(function(){
    			menu.hide();
    			$(this).remove();
    		});
    		menu.show();
        },
        goTo:function(router){
            this.transitionToRoute(router);
        },
        auth:function(typeAuth){
            switch(typeAuth)
            {
                case 'facebook':
                    this.facebookAuth();
                    break;
                case 'vk':
                    this.vkAuth();
                    break;
            }
        },
        goToCabinet: function(id_user){
            this.transitionToRoute('index.user',id_user);
        },
        logout: function(){
            var self=this;
            $.ajax({
                'url':this.get('restUrl')+'logout',
                'type':'POST',
                'dataType':'json',
                'data':{
                    'session_id':this.get('sessionId')
                },
                success:function(data){
                    self.transitionToRoute('index');
                    location.reload();       
                }
            });
        }
    }
});
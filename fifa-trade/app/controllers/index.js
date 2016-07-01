export default  Ember.Controller.extend({
    restUrl:'http://rest.fifa-trade.com/',
    isLoad:false,
    facebookAuth:function(){
        window.location=this.get('restUrl')+'auth/fb?session_id='+this.get('sessionId');
    },
    vkAuth:function(){
        window.location=this.get('restUrl')+'auth/vk?session_id='+this.get('sessionId');
    },
    siteAuth:function(){
        var self=this;
        var restUrl=this.get('restUrl');
        $.ajax({
            'url':restUrl+'auth/',
            'type':'POST',
            'dataType':'json',
            'data':{
                'login':$('#auth-tab input[name=login]').val(),
                'password':$('#auth-tab input[name=password]').val(),
                'session_id':this.get('sessionId')
            },
            success:function(data){
                self.set('curUser',data);
            }
        });
        return false;
    },
    registration: function(){
        var self=this;
        var restUrl=this.get('restUrl');
        if(this.validate())
        {
            $.ajax({
                'url':restUrl+'auth/reg',
                'type':'POST',
                'dataType':'json',
                'data':{
                    'login':$('#reg-tab input[name=login]').val(),
                    'password':$('#reg-tab input[name=password]').val(),
                    'email':$('#reg-tab input[name=email]').val(),
                    'session_id':this.get('sessionId')
                },
                success:function(data){
                    self.set('curUser',data);
                }
            });
        }
    },
    validate: function(){
        var login=$('#reg-tab input[name=login]');
        var password=$('#reg-tab input[name=password]');
        var passwordRepeat=$('#reg-tab input[name=repeat_password]');
        var email=$('#reg-tabinput[name=email]');
        var returnValue=true;
        $('#reg-tab .has-error').removeClass('has-error');
        $('#reg-tab input[type=text]').each(function(){
            if(this.value==='')
            {
                $(this).parent().addClass('has-error');
                returnValue=false;
            }
        });
        if(password.val()==='')
        {
            $(password).parent().addClass('has-error');
            return false;
        }
        if(password.val()!==passwordRepeat.val())
        {
            $(password).parent().addClass('has-error');
            $(passwordRepeat).aprent().addClass('has-error');
            return false;
        }
        return returnValue;
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
                case 'site':
                    this.siteAuth();
                    break;
                case 'reg':
                    this.registration();
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
                    //self.transitionToRoute('index');
                    self.set('curUser',{});
                    self.get('curUser');
                    //location.reload();       
                }
            });
        }
    }
});
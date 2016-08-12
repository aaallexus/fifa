App.IndexController = Ember.Controller.extend({
	isLoad:false,
    defaultSearchValues:{"nation_id":0, "league_id":0, "club_id":0,"user_id":0,"position_id":"Все","min_rait":1,"max_rait":99,"min_speed":1,"max_speed":99,"min_shotpower":1,"max_shotpower":99,"min_pass":1,"max_pass":99,"min_dribling":1,"max_dribling":99,"min_defense":1,"max_defense":99,"min_price":null,"max_price":null,"min_price_modificator":1000,"max_price_modificator":1000},
    priceModificatorArray:[{'value':1000, "caption":'k'},{'value':1000000,'caption':'m'}],
    facebookAuth:function(){
        window.location=restUrl+'auth/fb?session_id='+this.get('sessionId');
    },
    vkAuth:function(){
        window.location=restUrl+'auth/vk?session_id='+this.get('sessionId');
    },
    siteAuth:function(){
        var self=this;
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
                self.controllerFor('user').set('curUser',data);
                $.ajax({
                    'url':restUrl+'getCountUnreadMessages',
                    'type':'POST',
                    'dataType':'json',
                    'data':{
                        'session_id':self.get('sessionId')
                    },
                    success:function(data){
                        self.set('countUnreadMessages',data.count);
                    }
                });
            }
        });
        return false;
    },
    registration: function(){
        var self=this;
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
                    self.controllerFor('user').set('curUser',data);
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
    showMenu: function(){
        var  menu=$('#rightMenu');
        menu.show();
        $('<div class="dialog-background"></div>').insertBefore(menu).click(function(){
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
    checkLogin: function(){
        var curUser=this.get('curUser');

        if(curUser && curUser.login==null)
        {
            $('#modalChangeLogin').addClass('in show');
            this.transitionToRoute('index');
        }
    },
    saveLogin:function(){
        var self=this;
        $.ajax({
            'url':restUrl+'changeLogin',
                'type':'POST',
                'dataType':'json',
                'data':{
                    'login':this.get('newLogin'),
                    'session_id':this.get('sessionId')
                },
                success:function(data){
                    if(data.result=='ok')
                    {
                        var curUser=$.extend({},self.get('curUser'));
                        curUser.login=self.get('newLogin');
                        self.set('curUser',curUser);
                        $('#modalChangeLogin').removeClass('in show');
                    }
                }
        });
    },
    goToCabinet: function(id_user){
        this.transitionToRoute('index.user',id_user);
    },
    search:function(){
        this.controllerFor('players').search();
    },
    clearSearch:function(){
        var select=$('.dropdown-menu .modal-bl-body select');
        this.controllerFor('index').set('model',this.get('defaultSearchValues'));
        select.select2('destroy');
        this.search();
        setTimeout(function(){
            select.select2();
        },100);

    },
    logout: function(){
        var self=this;
        $.ajax({
            'url':restUrl+'logout',
            'type':'POST',
            'dataType':'json',
            'data':{
                'session_id':this.get('sessionId')
            },
            success:function(data){
                //self.transitionToRoute('index');
                self.set('curUser',{});
                self.controllerFor('user').set('curUser',{});
                //self.get('curUser');
                //location.reload();       
            }
        });
    },
    sendMessageToUser:function(){
        $.ajax({
            'url':restUrl+'sendMessageToUser',
            'type':'POST',
            'dataType':'json',
            'data':{
                'session_id':this.get('sessionId'),
                'user_id':$('#message-window').attr('data-user-id'),
                'message':$('#message-window #message').val()
            },
            success:function(data){

            }
        });
        $('.message-window').hide();
        $('#message-window #message').val('');
    },
    closeModalWindow:function(){
        $('.message-window').hide();
    }
});
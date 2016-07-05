var global_timezone_offset=0;
App.LoginController = Ember.Controller.extend({
    userLogin:'',
    userPassword:'',
    login: function(){
        var self=this;
        var password='';
        App.validateInit();
        if(App.checkValidate())
        {
            Ember.$.ajax({
                url: url+"login",
                type: 'POST',
                dataType: 'json',
                data:{'username':this.get('userLogin'),'password':this.get('userPassword')},
                success: function (data) {
                    self.set('userLogin','');
                    self.set('userPassword','');
                    var mainController=self.controllerFor('main');
                    var date=new Date();
                    mainController.set("calendar_setting",{
                        dateFormat:'dd.mm.yy',
                        firstDay:1
                    });
                    global_timezone_offset=date.getTimezoneOffset()*60000+data.utc_value;
                    mainController.set('timezone_offset',global_timezone_offset);
                    mainController.set('applicationVersion',data.applicationVersion);
                    mainController.set('dbVersion',data.dbVersion);
                    mainController.set('session_id',data.session_id);
                    mainController.set('user_id',data.id);
                    mainController.set('user_name',data.name);
                    mainController.set('is_blocked',data.is_blocked);
                    mainController.set('isAuth',true).goToModule('customers');
                },
                error: function(mess) {
                    Alert(mess.responseText);
                }
            });
        }
    }
});
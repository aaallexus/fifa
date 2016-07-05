App.dateInputBox = Ember.Component.extend({
    templateName : "TimeInputBox",
    attributeBindings:['value','class_bind','name','style'],
    keyUp : function(){
        var time=this.get("time");
        if(time==='')
           this.set("value",0);
        time=time.split('.');
        if(time.length===3)
        {
            var cur_timezone_offset=new Date().getTimezoneOffset();
            var date=new Date(time[2],time[1]-1,time[0],0,0,0);
            date.setTime(date.getTime()-global_timezone_offset);
            date.setTime(date.getTime()+(cur_timezone_offset-date.getTimezoneOffset())*60000);
            this.set("value",date.getTime());
        }
    },
    change : function(){
            this.keyUp();
    },
    classname:function(){
        return this.class_bind;
    }.property(),
    time:function()
    {
        if(this.get("value")!==undefined)
        {
            if(this.get("value")!=="" && this.get("value")!==null)
            {
                var date=new Date(this.get("value")*1);
                var cur_timezone_offset=new Date().getTimezoneOffset();
                date.setTime(date.getTime()+global_timezone_offset);
                date.setTime(date.getTime()-(cur_timezone_offset-date.getTimezoneOffset())*60000);
                return date.format('dd.mm.yyyy');
            }
        }
        else
        {
            this.set("value",0);
            return '';
        }
    }.property()
});
App.dateToStr = Ember.Component.extend({
    templateName: 'dateToStr',
    classNameBindings:":date-to-str-component",
    dateFormat:'dd.mm.yyyy',
    date: function(){
        if(this.value===undefined || this.value*1===0)
            return '';
        else
        {
            var cur_timezone_offset=new Date().getTimezoneOffset();
            var date=new Date(this.value*1);
            date.setTime(date.getTime()+global_timezone_offset);
            date.setTime(date.getTime()-(cur_timezone_offset-date.getTimezoneOffset())*60000);
            return date.format(this.dateFormat);
        }
    }.property()
});
App.datetimeToStr = App.dateToStr.extend({
    dateFormat:'dd.mm.yyyy HH:MM:ss',
    classNameBindings:""
});
Em.Handlebars.helper('dateToStr',App.dateToStr);
Em.Handlebars.helper('datetimeToStr',App.datetimeToStr);
Em.Handlebars.helper('DateInputBox',App.dateInputBox);
App.validateInit=function(){
    $('input.date').each(function(){
        if(!$(this).prop('disabled'))
        {
            $('input.date').attr('readonly','readonly').css({'background':'#fff','cursor':'pointer'});
        }
    });
    $('.e3').off('change');

    $('input').off('.validate');
    $('textarea').off('.validate');
    $('select').off('.validate');
    $('.time-num').on("change.validate", function(){
        if(this.value!=='')
        {
            var time = this.value.split(':');
            if(time.length===1)
            {
                if (time[0] * 1 > 24) {
                    this.value='24:00';
                }
                else
                    this.value=time[0]+':00';
            }
            if(time.length===2)
            {
                if(time[0]==='')
                {
                        time[0]='0';
                }
                if(time[1]*1<10)
                {
                    time[1]='0'+time[1]*1;
                }
                this.value=time[0]+':'+time[1];
            }
        }
    });
    $('.time-num').on("keyup.validate input.validate click.validate", function(){
        this.value = this.value.replace(/[^\d\:]/g, '');
        var time=this.value.split(':');
        if(time.length===1 && this.value.length>2)
        {
            time[0]=this.value.slice(0,2);
            time[1]=this.value.slice(2,this.value.length);
        }
        if(time[0]==='')
            time[0]='0';
        if(time[0]*1>24){
            time[0]=24;
        }
        if(time.length>1){
            if (time[1] * 1 > 59) {
                time[1] = 59;
            }
            this.value = time[0] + ':' + time[1];
        }
        if(time[0]*1===24 && time[1]*1>0)
        {
            this.value="24:00";
        }
    });
    $('.numbers').on("input.validate click.validate", function() {
        if (this.value.match(/[^\d\.]/g)) {
            this.value = this.value.replace(/[^\d\.]/g, '');
        }
        if($(this).attr('max') && this.value*1>$(this).attr('max')*1 && this.value!=='')
        {
                this.value=$(this).attr('max');
        }
        if($(this).attr('min') && this.value*1<$(this).attr('min')*1 && this.value!=='')
        {
                this.value=$(this).attr('min');
        }
    });
    $('.num-phone').on("change.validate keyup.validate input.validate click.validate", function(){
    if (this.value.match(/[^\d\.\+\(\)\ \-]/g)){
        this.value = this.value.replace(/[^\d\.\+\(\)\ \-]/g, '');
    }
    });
    $('.not-null').on('change.validate',function(){
        var label=$('label',$(this).parents('.row').eq(0));
        $(this).removeClass('has-error').removeClass('has-success');
        label.css('color','');
    });
    $('.no-quotes').on("change.validate keyup.validate", function() {
        this.value = this.value.replace('"','');
    });
};
App.checkValidate=function(){
    var isChecked=true;
    $('input.not-null:radio').each(function(){
        var isNull=true;
        var label=$('label',$(this).parents('.row').eq(0));
        $('input:radio[name='+$(this).prop('name')+']').each(function(){
            if($(this).prop('checked'))
                isNull=false;
        });
        if(isNull)
        {
            label.css({'color':'#d9534f'});
            $(this).addClass('has-error');
            isChecked=false;
        }
    });
    $('.not-null').each(function(){
        var label=$('>label',$(this).parents('.row').eq(0));
        var tagName=$(this).prop('tagName');
        if((($.inArray(tagName,['INPUT','TEXTAREA'])>=0 && $(this).is(":enabled") && ($(this).is(":visible") && !$(this).hasClass('validate-hidden') || $(this).hasClass('validate-hidden')) && $(this).prop('type')!=='radio') || tagName==='SELECT' && $(this).is(':enabled') && ($(this).prev('div.select2-container').is(':visible') && !$(this).hasClass('validate-hidden') || $(this).hasClass('validate-hidden'))) && ($(this).val()==='' || $(this).val()===null || $(this).val()===' '))
        {
            label.css({'color':'#d9534f'});
            $(this).addClass('has-error');
            isChecked=false;
        }
    });
    $('.email-validate').each(function(){
        var label=$('label',$(this).parents('.row').eq(0));
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(!pattern.test($(this).val())){
            label.css({'color':'#d9534f'});
            $(this).addClass('has-error');
            isChecked=false;
        }
    });
    $('.not-null').each(function(){
        if(!$(this).hasClass('has-error'))
        {
            $(this).addClass('has-success');
            $('label',$(this).parents('.row').eq(0)).css({'color':'#3c763d'});
        }
    });
    $('input.text').each(function(){
        if(!$(this).hasClass('has-error'))
        {
            $(this).addClass('has-success');
            $('label',$(this).parents('.row').eq(0)).css({'color':'#3c763d'});
        }
    });
    $('.email-validate').each(function(){
        if(!$(this).hasClass('has-error'))
        {
            $(this).addClass('has-success');
            $('label',$(this).parents('.row').eq(0)).css({'color':'#3c763d'});
        }
    });
    return isChecked;
};
(function( $ ){
    var variants=[
        {
            'caption':'<div style="height:20px;"></div>',
            'value':''
        },
        {
            'caption':'<i class="fa fa-check" style="color:#70a354; font-size:16px;"></i>',
            'value':'0'
        },
        {
            'caption':'<i class="fa fa-mail-forward" style="color:#67919d; font-size:16px;"></i>',
            'value':'1'
        },
        {
            'caption':'<i class="fa fa-times" style="color:#bd7e77; font-size:16px;"></i>',
            'value':'2'
        }
    ];
    $.fn.statusSelect = function(options) {
        var self=this;
        $(this).addClass('hidden').hide();
        $(this).attr('type','statusSelect');
        if(options===undefined)
            options=variants;
        var statusSelect=$('<div class="select2-container form-control"></div>');
        statusSelect.append('<a tabindex="-1" class="select2-choice" href="javascript:void(0)">'+
                            '<span class="select2-chosen"></span>'+
                            '<abbr class="select2-search-choice-close"></abbr>'+
                            '<span role="presentation" class="select2-arrow"><b role="presentation"></b></span></a>');
        statusSelect.insertAfter(this);
        var background=$('<div class="select2-drop-mask" style="display: none;"></div>');
        var list=$('<div class="select2-drop select2-display-none select2-with-searchbox select2-drop-active"></div>');
        list.append('<ul role="listbox" class="select2-results"></ul>');
        $.each(options,function(){
            $('ul',list).append('<li class="select2-results-dept-0 select2-result select2-result-selectable" role="presentation" value="'+this.value+'"><div class="select2-result-label" role="option">'+this.caption+'</div></li>');
        });
        $('body').append(list);
        $('body').append(background);
        statusSelect.on('click.statusSelect',function(){
            statusSelect.addClass('select2-dropdown-open');
            background.show();
            list.css({'top':$(this).offset().top+statusSelect.height()+'px','left':$(this).offset().left+'px','width':statusSelect.width()+2+'px'});
            list.show();
        });
        $(self).on('input.statusSelect change.statusSelect',function(){
            var value='';
            $.each(options,function(){
                if(this.value===true)
                    this.value='true';
                if(this.value===false)
                    this.value='false';
                if($(self).val()===this.value)
                {
                    value=this.caption;
                    return false;
                }
            });
            $('span.select2-chosen',statusSelect).html(value);
        });
        list.on('mouseover','li',function(){
            $('li',list).removeClass('select2-highlighted');
            $(this).addClass('select2-highlighted');
        });
        list.on('click','li',function(){
            $('.select2-chosen',statusSelect).html($('.select2-result-label',this).html());
            $(self).val($(this).attr('value')).trigger('input');
            background.click();
        });
        background.on('click',function(){
            statusSelect.removeClass('select2-dropdown-open');
            list.hide();
            background.hide();
        });
        $(window).on('scroll',function(){
            background.click();
        });
    };
})( jQuery );
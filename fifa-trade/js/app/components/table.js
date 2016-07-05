(function( $ ){
    var table;
    var fixHeader;
    var ajaxRequest;
    var itemPerPage=30;
    var isEndData=false;
    var options;
    var additionalFilters={};
    var default_exception_status_variants=[
        {
            'icon':'fa-check',
            'color':'#70a354',
            'value':'0'
        },
        {
            'icon':'fa-mail-forward',
            'color':'#67919d',
            'value':'1'
        },
        {
            'icon':'fa-times',
            'color':'#bd7e77',
            'value':'2'
        }
    ];
    var filters_id={};
    var elements=['#edit_button','#view_button','#del_button','#copy_button','#run_button','#preference_button'];
    var methods = {
        init : function(params){
            var data=$(this).data('table');
            if(!data)
            {
                var input;
                var variants;
                table=$(this);
                $('<div class="table-responsive"></div>').insertAfter(this).append(this);
                table.addClass('dataTable');
                $('tbody',table).empty();
                $('thead',table).append('<tr class="hidden"></tr>');
                $.each(params.fields,function(){
                    $('thead tr:last',table).append('<td></td>');
                    switch(this.type){
                        case 'exception_status':
                            input=$('<input type=text class="form-control-filter">');
                            $('thead tr:last td:last',table).append(input);
                            var exception_status_variants;
                            if(this.variants===undefined)
                                exception_status_variants=default_exception_status_variants;
                            else
                                exception_status_variants=this.variants;
                            variants=[{'caption':'<div style="height:20px;"></div>','value':''}];
                            $.each(exception_status_variants,function(){
                                variants.push({
                                    'caption':'<i class="fa '+this.icon+'" style="color:'+this.color+'; font-size:16px;"></i>',
                                    'value':this.value
                                });
                            });
                            input.statusSelect(variants);
                            break;
                        case 'status_bar':
                            input=$('<input type=text class="form-control-filter">');
                            $('thead tr:last td:last',table).append(input);
                            variants=[{'caption':'<div style="height:20px;"></div>','value':''}];
                            if(this.search_size===undefined)
                            {
                                for(var i=0;i<=this.length;i++)
                                    variants.push({'caption':+i,'value':''+i});
                            }
                            else
                            {
                                if(this.begin_search_from===undefined)
                                    this.begin_search_from=0;
                                for(var j=this.begin_search_from;j<=this.search_size;j++)
                                    variants.push({'caption':j,'value':''+j});
                            }
                            input.statusSelect(variants);
                            break;
                        default :
                            if(this.type!=='function' && this.type!=='status')
                                $('thead tr:last td:last',table).append('<input type=text class="form-control-filter">');
                    }
                    if(this.type==='int')
                    {
                        $('thead tr:last td:last input',table).addClass('numbers');
                    }
                });
                App.validateInit();
                $('#fixHeader').remove();
                options = {
                    'position':0,
                    'timezoneOffset':0,
                    'additionalRestArguments':null,
                    'additionalFilters':[],
                    'isOldRest':false,
                    'connectionType':'POST',
                    'parentDiv':'.btn-modal-group',
                    'recordsNotFoundCaption':'No data',
                    'arrayField':null,
                    afterLoadData:function(){}
                };
                options=$.extend(options, params);
                fixHeader=$('<div id="fixHeader" class="FixedHeader_Cloned container-inner"></div>');
                fixHeader.css({
                    'background-color':'#f7f7f7',
                    padding:'5px 0 0',
                    display:'none',
                    overflow:'hidden',
                    left:table.offset().left+'px',
                    'z-index':19,
                    position:'fixed',
                    top:'75px'
                });
                $('body').append(fixHeader);
                $('thead tr:eq(1) td',table).each( function ( colIdx ) {
                    var input=$('input',this);
                    input.on('input.table', function () {
                        $('#filters_button i').addClass('blue-bg');
                        $('#filters_button i').removeClass('yellow-bg');
                        $('thead tr:eq(1) td',table).each(function(){
                            if($('input',this).length>0 && $('input',this).val()!=='')
                            {
                                $('#filters_button i').addClass('yellow-bg');
                                $('#filters_button i').removeClass('blue-bg');
                                return false;
                            }
                        });
                        $('table thead tr:eq(1) td:eq('+colIdx+') input',fixHeader).val(this.value).change();
                        saveFilters();
                    });
                });
                $(window).bind('scroll.table',onScroll);
                $(window).bind('resize.table',onResize);
                $('.table-responsive').on('scroll',function(){
                    $(fixHeader).scrollLeft($(this).scrollLeft());
                });
                table.on('click','tbody tr',onClick);
                $('thead',table).on('click','th',function(){
                    if($(this).hasClass('sorting'))
                    {
                        $('thead tr:eq(0) th:not(:eq('+$(this).index()+'))').removeClass('sorting_asc sorting_desc');
                        if($(this).hasClass('sorting_asc') || $(this).hasClass('sorting_desc'))
                        {
                            $(this).toggleClass('sorting_asc sorting_desc');
                        }
                        else
                            $(this).addClass('sorting_asc');
                        saveFilters();
                    }
                });
                table.on('remove',function(){
                    methods.destroy.apply(this);
                });
            }
            else
            {
                initialization(this);
                options=$.extend(options, params);
            }
            $(this).data('table', {
                'table':table,
                'fixHeader':fixHeader,
                'ajaxRequest':ajaxRequest,
                'options':options,
                'filters_id':filters_id,
                'target':table
            });
            draw();
            loadFilters();
            loadData(true);
        },
        refresh : function(){
            initialization(this);
            reDraw();
        },
        update : function(params){
            initialization(this);
            options=$.extend(options, params);
            saveFilters();
        },
        showFilter : function(){
            initialization(this);
            var header=$('thead tr:eq(1)',table);
            var fixHeaderSearch=$('table thead tr:eq(1)',fixHeader);
            if(!$('input',header).is(':animated') && !$('td',header).is(':animated'))
            {
                if(header.hasClass('hidden'))
                {
                    header.removeClass('hidden');
                    fixHeaderSearch.removeClass('hidden');
                    $('input',header).css({'height':'0px','padding':'0px 12px'});
                    $('input',fixHeaderSearch).css({'height':'0px','padding':'0px 12px'});
                    $('a.select2-choice',this).css({'height':'0px'});
                    $('td',header).css({'padding':'0 8px'}).animate({'padding':'0 8px 8px'},50,function(){
                        var self=this;
                        $('a.select2-choice',this).animate({'height':'30px'},187);
                        $('input',this).animate({'height':'32px','padding':'6px 12px'},200,function(){
                            $(self).animate({'padding':'8px'},50);
                        });
                    });
                    $('td',fixHeaderSearch).css({'padding':'0 8px'}).animate({'padding':'0 8px 8px'},50,function(){
                        var self=this;
                        $('a.select2-choice',this).animate({'height':'30px'},187);
                        $('input',this).animate({'height':'32px','padding':'6px 12px'},200,function(){
                            $(self).animate({'padding':'8px'},50,function(){
                                reDraw();
                            });
                        });
                    });
                }
                else
                {
                    $('td',header).animate({'padding':'0 8px 8px'},50,function(){
                        var self=this;
                        $('a.select2-choice',this).animate({'height':'0px'},187);
                        $('input',this).animate({'height':'0px','padding':'0px 12px'},200,function(){
                            $(self).animate({'padding':'0 8px'},50,function(){
                                header.addClass('hidden');
                            });
                        });
                    });
                    $('td',fixHeaderSearch).animate({'padding':'0 8px 8px'},50,function(){
                        var self=this;
                        $('a.select2-choice',this).animate({'height':'0px'},187);
                        $('input',this).animate({'height':'0px','padding':'0px 12px'},200,function(){
                            $(self).animate({'padding':'0 8px'},50,function(){
                                fixHeaderSearch.addClass('hidden');
                                reDraw();
                            });
                        });
                    });
                }
            }
            reDraw();
        },
        destroy : function(){
            initialization(this);
            $(table).data('table',null);
            $('#fixHeader').remove();
            $(window).unbind('.table');
            $('.table-responsive').off('scroll');
            $('input').off('.table');
            if(table)
                table.off('click');
        }
    };
    $.fn.table = function(method,options) {
        if( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ),options);
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        }
    };
    function initialization(object){
        var data = $(object).data('table');
        if(data)
        {
            table=data.table;
            fixHeader=data.fixHeader;
            ajaxRequest=data.ajaxRequest;
            options=data.options;
            filters_id=data.filters_id;
        }
    }
    function formatDateTime(datetime){
        var curTimezoneOffset=new Date().getTimezoneOffset();
        datetime.setTime(datetime.getTime()+options.timezoneOffset);
        datetime.setTime(datetime.getTime()-(curTimezoneOffset-datetime.getTimezoneOffset())*60000);
        return datetime;
    }
    function draw(){
        fixHeader.empty();
        fixHeader.append($('.editbuttons').clone().css({'padding-bottom':'10px'}))
            .append($(table).clone())
            .width($('.table-responsive').width());
        $('table tbody',fixHeader).remove();
        $('table tfoot',fixHeader).remove();
        $('table thead th',fixHeader).css('width','1px');
        fixHeader.css({left:table.offset().left+'px'});
        $('table',fixHeader).removeAttr('id').css({'width':table.width()+'px'});
        $('input[type=statusSelect]',fixHeader).each(function(){
            $(this).next().remove();
            var index=$(this).parent().index();
            var variants;
            if(options.fields[index].type==='exception_status' && options.fields[index].variants!==undefined)
            {
                variants=[{'caption':'<div style="height:20px;"></div>','value':''}];
                $.each(options.fields[index].variants,function(){
                    variants.push({
                        'caption':'<i class="fa '+this.icon+'" style="color:'+this.color+'; font-size:16px;"></i>',
                        'value':this.value
                    });
                });
            }
            if(options.fields[index].type==='status_bar')
            {
                variants=[{'caption':'<div style="height:20px;"></div>','value':''}];
                if(options.fields[index].search_size===undefined)
                {
                    for(var i=0;i<=options.fields[index].length;i++)
                        variants.push({'caption':+i,'value':''+i});
                }
                else
                {
                    for(var j=0;j<=options.fields[index].search_size;j++)
                        variants.push({'caption':j,'value':''+j});
                }
            }
            $(this).statusSelect(variants);
        });
        $('thead tr:eq(0) th',table).each(function(index){
            $('table tr:eq(0) th:eq('+index+')',fixHeader).append('<div style="width:'+$(this).width()+'px"></div>');
        });
        $('input',fixHeader).on('input.table',function(){
            $('thead tr:eq(1) td:eq('+$(this).parent().index()+') input',table).val(this.value).trigger('input');
        });
        $('table thead tr:eq(0) th',fixHeader).on('click',function(){
            $('#navi-list thead tr:eq(0) th:eq('+$(this).index()+')').click();
            $('#navi-list thead tr:eq(0) th').each(function(index){
                $('table thead tr:eq(0) th:eq('+index+')',fixHeader).attr('class',$(this).attr('class'));
            });
        });
        $('#filters_button i').addClass('blue-bg');
        $('#filters_button i').removeClass('yellow-bg');
        $('thead tr:eq(1) td',table).each(function(){
            if($('input',this).length>0 && $('input',this).val()!=='')
            {
                $('#filters_button i').addClass('yellow-bg');
                $('#filters_button i').removeClass('blue-bg');
                return false;
            }
        });
    }
    function reDraw(){
        $('#fixHeader').css({'width':$('.table-responsive').width()+'px'});
        $('thead tr:eq(0) th',table).each(function(index){
            $('table tr:eq(0) th:eq('+index+') div',fixHeader).css('width',$(this).width()+'px');
        });
        if($('#fixHeader').length>0)
            fixHeader.css({'top':$('header').height()+'px'});
    }
    function loadFilters(isUpdateFilters){
        if(isUpdateFilters===undefined)
            isUpdateFilters=false;
        var fields_order={};
        $.each(options.fields,function(index){
            if(this.type===undefined)
                this.type='text';
            fields_order[this.name]={'index':index,'type':this.type,'format':this.format};
            filters_id[this.name]=null;
        });
        filters_id['field_sort']=null;
        filters_id['field_sort_type']=null;
        var filters={};
        Ember.$.ajax({
            url: url+'module_filters/all',
            type: options.connectionType,
            dataType: 'json',
            data: {"session_id":table.attr("session_id")*1,"t_module_id":table.attr("module_id")*1},
            success: function (param) {
                var field_sort;
                var field_sort_type;
                additionalFilters={};
                $.each(param,function(){
                    var self=this;
                    $.each(options.additionalFilters,function(){
                        if(self.name===this.name)
                        {
                            additionalFilters[this.name]=self;
                            return false;
                        }
                    });
                    if(fields_order[this.name]!==undefined)
                    {
                        var td=$('thead tr:eq(1) td:eq('+fields_order[this.name].index+')',table);
                        if(fields_order[this.name].type==='time' && fields_order[this.name].format==='h' && this.value!=='')
                        {
                            this.value=this.value/3600;
                        }
                        $('input',td).val(this.value).change();
                        $('thead tr:eq(1) td:eq('+fields_order[this.name].index+') input',fixHeader).val(this.value).change();
                    }
                    filters_id[this.name]=this.id;
                    if(this.name==='field_sort')
                    {
                        field_sort=$('thead tr:eq(0) th:eq('+fields_order[this.value].index+')',table);
                    }
                    if(this.name==='field_sort_type')
                    {
                        field_sort_type=this.value*1;
                    }
                });
                if(field_sort!==undefined && field_sort_type!==undefined)
                {
                    $('thead tr:eq(0) th').removeClass('sorting_asc sorting_desc');
                    if(field_sort_type===0)
                        field_sort.addClass('sorting_asc');
                    else
                        field_sort.addClass('sorting_desc');
                }
                else
                {
                    $('thead tr:eq(0) th').removeClass('sorting_asc sorting_desc');
                    $('thead tr:eq(0) th:eq(0)',table).addClass('sorting_asc');
                }
                $.each(options.fields,function(index){
                    if(this.sortable===false)
                        $('thead tr:eq(0) th:eq('+index+')').removeClass('sorting_asc sorting_desc sorting');
                    else
                        $('thead tr:eq(0) th:eq('+index+')').addClass('sorting');

                });
                if(isUpdateFilters)
                    $('thead tr:eq(1) input:eq(0)').trigger('input');
                draw();
            }
        });
        return filters;
    }
    function saveFilters(){
        if(table.attr("session_id")!==undefined)
        {
            var id_record=table.attr("id_record");
            if(id_record===undefined)
                id_record=null;
            else
                id_record=id_record*1;
            var data=[];
            var isReloadFilters=false;
            $.each(options.fields,function(index){
                var td=$('thead tr:eq(1) td:eq('+index+')');
                if($('input',td).length>0 && this.type!=='function')
                {
                    var id=filters_id[this.name];
                    if(id===null)
                        isReloadFilters=true;
                    var value=$('input',td).val();
                    if(this.type==='time' && this.format==='h' && value!=='')
                        value=value*3600;
                    data.push({"id":id,"name":this.name,"value":value,"t_module_id":table.attr("module_id")*1,"t_user_id":table.attr("user_id")*1});
                    var th=$('thead tr:eq(0) th:eq('+index+')');
                    if(th.hasClass('sorting_desc') || th.hasClass('sorting_asc'))
                    {
                        if(filters_id['field_sort']===null || filters_id['field_sort_type']===null)
                            isReloadFilters=true;
                        data.push({"id":filters_id['field_sort'],"name":'field_sort',"value": this.name ,"t_module_id":table.attr("module_id")*1,"t_user_id":table.attr("user_id")*1});
                        var sort_type=0;
                        if(th.hasClass('sorting_desc'))
                            sort_type=1;
                        data.push({"id":filters_id['field_sort_type'],"name":'field_sort_type',"value": sort_type ,"t_module_id":table.attr("module_id")*1,"t_user_id":table.attr("user_id")*1});
                    }
                }
            });
            $.each(options.additionalFilters,function(){
                if(this.value!==undefined)
                {
                    if(additionalFilters[this.name]!==undefined)
                    {
                        additionalFilters[this.name].value=this.value;
                    }
                    else
                    {
                        additionalFilters[this.name]={'id':null,'name':this.name,'value':this.value,"t_module_id":table.attr("module_id")*1,"t_user_id":table.attr("user_id")*1};
                        isReloadFilters=true;
                    }
                    data.push(additionalFilters[this.name]);
                }
            });
            Ember.$.ajax({
                url: url+'module_filters/update',
                type: options.connectionType,
                dataType: 'text',
                data: {"session_id":table.attr("session_id")*1,'lUserModuleFilters':data},
                success:function(){
                    if(isReloadFilters)
                        loadFilters(true);
                    loadData(true);
                }
            });
        }
    }
    function loadData(isClear){
        if(ajaxRequest)
        {
            ajaxRequest.abort('Abort');
            $('tbody tr.wait',table).remove();
        }
        if(isClear===undefined)
            isClear=false;
        if(!isClear)
            $('tbody',table).append("<tr class='wait'><td colspan='"+$('thead tr:eq(0) th',table).length+"' align='center'><img src='img/select2-spinner.gif'></td></tr>");
        else
        {
            isEndData=false;
            options.position=0;
        }
        var restArguments=$.extend({"session_id":table.attr("session_id")*1,'start_position':options.position}, options.additionalRestArguments);
        ajaxRequest=Ember.$.ajax({
            url: url+options.restUrl,
            type: options.connectionType,
            dataType: 'json',
            data: restArguments,
            success: function (param) {
                if(param.length===0)
                    isEndData=true;
                if(isClear)
                    $('tbody',table).empty();
                $('tbody tr.wait',table).remove();
                var array=param;
                if(options.arrayField!==null)
                    array=param[options.arrayField];
                $.each(array,function(){
                    var row=this;
                    $('tbody',table).append('<tr></tr>');
                    if(options.fields)
                    {
                        $.each(options.fields,function(){
                            if(row[this.name]===null)
                                row[this.name]='';
                            var out;
                            switch(this.type){
                                case 'date':
                                    if(row[this.name]*1===0)
                                        out='';
                                    else
                                    {
                                        out=new Date(row[this.name]*1);
                                        out=formatDateTime(out).format('dd.mm.yyyy');
                                    }
                                    break;
                                case 'time':
                                    var format='h:m';
                                    if(this.format)
                                        format=this.format;
                                    var h=Math.floor(row[this.name]/3600);
                                    var m=Math.floor((row[this.name]-h*3600)/60);
                                    var s=Math.floor(row[this.name]-h*3600-m*60);
                                    if(m<10)
                                        m='0'+m;
                                    if(s<10)
                                        s='0'+s;
                                    if(format==='h')
                                        out=h;
                                    if(format==='h:m')
                                        out=h+':'+m;
                                    if(format==='h:m:s')
                                        out=h+':'+m+':'+s;
                                    break;
                                case 'status_bar':
                                    var length=3;
                                    if(this.length)
                                    {
                                        if(typeof this.length === 'function')
                                            length=this.length(row);
                                        else
                                            length=this.length;
                                    }
                                    out='<div class="indicator" data-length='+length+'>';
                                    for(var i=0;i<length;i++)
                                    {
                                        if(i<row[this.name]*1)
                                            out=out+'<div class="full-field"></div>';
                                        else
                                            out=out+'<div class="empty-field"></div>';
                                    }
                                    out=out+'</div>';
                                    break;
                                case 'exception_status':
                                    var classStatus='';
                                    var color='';
                                    var exception_status_variants;
                                    if(this.variants===undefined)
                                        exception_status_variants=default_exception_status_variants;
                                    else
                                        exception_status_variants=this.variants;
                                    var val=row[this.name];
                                    $.each(exception_status_variants,function(){
                                        if(this.value*1===val*1)
                                        {
                                            classStatus=this.icon;
                                            color=this.color;
                                            return false;
                                        }
                                    });
                                    out='<i class="fa '+classStatus+'" style="color:'+color+'"></i>';
                                    break;
                                case 'datetime':
                                    if(row[this.name]*1===0)
                                        out='';
                                    else
                                    {
                                        out=new Date(row[this.name]*1);
                                        out=formatDateTime(out).format('dd.mm.yyyy<br>HH:MM:ss');
                                    }
                                    break;
                                case 'function':
                                    out=this.func(row);
                                    break;
                                default:
                                    out=row[this.name];
                            }
                            $('tbody tr:last',table).append('<td>'+out+'</td>');
                        });
                    }
                });
                if($('tbody tr',table).length===0)
                {
                    $('tbody',table).append('<tr class="table-empty"><td colspan="'+$('thead tr:eq(0) th').length+'"">'+options.recordsNotFoundCaption+'</td></tr>');
                }
                reDraw();
                options.position+=itemPerPage;
                options.afterLoadData(param);
            }
        });
    }
    function onScroll(){
        if($(fixHeader).length>0)
        {
            var Top=$(options.parentDiv).offset().top-$('header').height();
            var scrollTop=$(window).scrollTop();
            if(scrollTop>Top && table.is(':visible'))
            {
                if($(fixHeader).is(':hidden'))
                {
                    $('thead tr:eq(0) th',table).each(function(index){
                        $('table thead tr:eq(0) th:eq('+index+')',fixHeader).attr('class',$(this).attr('class'));
                    });
                    $(fixHeader).show();
                    if($('thead input:focus',table).length>0)
                    {
                        $('thead tr:eq(1) td:eq('+$('thead input:focus',table).parent().index()+') input:visible',fixHeader).focus();
                    }
                }
            }
            else
            {
                if($(fixHeader).is(':visible'))
                {
                    if($('input:focus',fixHeader).length>0)
                        $('thead tr:eq(1) td:eq('+$('input:focus',fixHeader).parent().index()+') input:visible',table).focus();
                    $(fixHeader).hide();
                }
            }
        }
        if(($(window).scrollTop()+$(window).height())>=$(document).height() && !isEndData)
        {
            loadData(options.isOldRest);
        }
    }
    function onResize(){
        reDraw();
    }
    function onClick(){
        if (!$(this).hasClass('selected') && !$(this).hasClass('table-empty'))
        {
            $('tr.selected',table).removeClass('selected');
            $(this).addClass('selected');
            $.each(elements,function(key,value){
                $(value).removeClass('disabled');
                $(value,fixHeader).removeClass('disabled');
            });
            $(table).attr('id_item',this.cells[0].innerHTML);
        }
    }
})( jQuery );
function Alert(message,controller,transitionTo){
    var alertBackground=$("<div class='alertMessage'></div>");
    var alertWindow=$("<div class='alertWindow'></div>");
    alertWindow.append("<div class='alertBody'><span>"+message+"</span></div>");
    alertWindow.append("<div class='alertFooter'><div class='navi-btn navi-btn-icon'>"+
                                         "<a><i class='fa fa-check blue-bg'></i><span class='navi-btn-text'>Ok</span></a></div></div>");
    alertBackground.append(alertWindow);
    $('body').append(alertBackground);
    alertWindow.on('click','.navi-btn',function(){
        if(transitionTo!==undefined && controller!==undefined)
        {
            controller.transitionTo(transitionTo);
        }
        alertBackground.remove();
    });
};
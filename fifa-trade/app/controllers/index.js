export default  Ember.Controller.extend({
    restUrl:'http://fifa-trade.com/',
    actions:  {
        showMenu()  {
        var  menu=$('#rightMenu');
        	menu.show();
        	$('<div  class="dialog-background"></div>').insertBefore(menu).click(function(){
			menu.hide();
			$(this).remove();
		});
		menu.show();
        }
    }
});